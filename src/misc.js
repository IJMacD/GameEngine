(function(){
	Array.prototype.remove = function(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};
	function drawCircle(ctx, x, y, r){
		ctx.beginPath();
		ctx.arc(x, y, r, 0, Math.PI * 2);
	};
	function drawEllipse(ctx, x, y, xr, yr){
	  var kappa = .5522848;
		  ox = xr * kappa, // control point offset horizontal
		  oy = yr * kappa, // control point offset vertical
		  xe = x + xr;       // x-end
		  ye = y + yr,       // y-end
		  xs = x - xr,       // x-start
		  ys = y - yr;       // y-start

	  ctx.beginPath();
	  ctx.moveTo(xs, y);
	  ctx.bezierCurveTo(xs, y - oy, x - ox, ys, x, ys);
	  ctx.bezierCurveTo(x + ox, ys, xe, y - oy, xe, y);
	  ctx.bezierCurveTo(xe, y + oy, x + ox, ye, x, ye);
	  ctx.bezierCurveTo(x - ox, ye, xs, y + oy, xs, y);
	  ctx.closePath();
	};
	CanvasRenderingContext2D.prototype.strokeCircle = function(x, y, radius){
		drawCircle(this, x, y, radius);
		this.stroke();
	};
	CanvasRenderingContext2D.prototype.fillCircle = function(x, y, radius){
		drawCircle(this, x, y, radius);
		this.fill();
	};
	CanvasRenderingContext2D.prototype.strokeEllipse = function(x, y, xr, yr) {
		drawEllipse(this, x, y, xr, yr);
		this.stroke();
	};
	CanvasRenderingContext2D.prototype.fillEllipse = function(x, y, xr, yr) {
		drawEllipse(this, x, y, xr, yr);
		this.fill();
	};
	Function.prototype.extend = function(name) {
		function Class() {
			if (!(this instanceof Class))
				throw('Constructor called without "new"');
			if ('_init' in this)
				this._init.apply(this, arguments);
			this.name = name;
		}
		Function.prototype.extend.nonconstructor.prototype = this.prototype;
		Class.prototype = new Function.prototype.extend.nonconstructor();
		return Class;
	};
	Function.prototype.extend.nonconstructor= function() {};
})();
// -----------------
// Define Components
// -----------------


var CanvasManager = GameObject.extend("CanvasManager");
CanvasManager.prototype._init = function(context){
	GameObject.prototype._init.call(this);
	this.context = context;
};
CanvasManager.prototype.update = function(delta){
	width = this.context.canvas.width = this.context.canvas.offsetWidth;
	height = this.context.canvas.height = this.context.canvas.offsetHeight;
}

var DrawBallComponent = GameComponent.extend("DrawBallComponent");
DrawBallComponent.prototype._init = function(size, colour){
	this.size = size;
	this.colour = colour;
};
DrawBallComponent.prototype.update = function(parent, delta) {
	GameObject.sRenderSystem.fillCircle(parent.position.x,parent.position.y,this.size,this.colour);
	GameObject.sRenderSystem.fillCircle(parent.position.x+this.size*0.33,parent.position.y-this.size*0.33,this.size*0.45,"rgba(255,255,255,0.7)");
};
var DrawPolygonComponent = GameComponent.extend("DrawPolygonComponent");
DrawPolygonComponent.prototype._init = function(coords, colour, fill){
	this.coords = coords;
	this.colour = colour;
	this.fill = fill;
	this.vec = new Vector2();
};
DrawPolygonComponent.prototype.update = function(parent, delta) {
	var i=0,
		l = this.coords.length-1,
		path = [];
	for(;i<l;i+=2){
		this.vec.set(this.coords[i],this.coords[i+1]);
		this.vec.leftMultiply(Matrix.rotationMatrix(parent.rotation));
		this.vec.add(parent.position);
		path.push(this.vec.x, this.vec.y);
	}
	GameObject.sRenderSystem.strokePath(path,this.colour);
};





var GeneralRelativityPointGravityComponent = GameComponent.extend("GeneralRelativityPointGravityComponent");
GeneralRelativityPointGravityComponent.prototype._init = function(target) {
	this.target = target;
	this.vectorA = new Vector2();
	this.vectorB = new Vector2();
};
GeneralRelativityPointGravityComponent.prototype.update = function(parent, delta) {
	var r = this.vectorA.set(parent.position).subtract(this.target.position),
		v = this.vectorB.set(parent.velocity),
		G = 1,
		M = this.target.mass,
		r2 = r.magnitude2(),
		r3 = Math.pow(r.magnitude(),3),
		v1 = v.magnitude(),
		c2 = 325334.92879081, // <- this number here actually ties all units to real world
		newtonian = - G*M / r2,
		relativity = - 3*G*M / (r3 * c2) * v.dot(r);
	// just re-use r here
	r.normalise();
	r.scale(newtonian);
	// This line is part of GR calculations
	v.scale(relativity);
	r.add(v);
	r.scale(delta);
	parent.velocity.add(r);
};
GeneralRelativityPointGravityComponent.referencesTest = function(object){
	return function(testComponent){
		return testComponent instanceof GeneralRelativityPointGravityComponent &&
			testComponent.target == object;
	};
};
var CollisionComponent = GameComponent.extend("CollisionComponent");
CollisionComponent.prototype._init = function(width, height) {
	this.halfWidth = width / 2;
	this.halfHeight = height / 2;
};
CollisionComponent.prototype.update = function(parent, delta) {
	var bounds = [
		parent.position.x - this.halfWidth,
		parent.position.y - this.halfHeight,
		parent.position.x + this.halfWidth,
		parent.position.y + this.halfHeight
	];
	GameObject.sCollisionSystem.addCollisionBounds(parent, bounds, bounds);
};
var CollisionSystem = GameObject.extend("CollisionSystem");
CollisionSystem.prototype._init = function() {
	GameObject.prototype._init.call(this);
	this.attackBounds = [];
	this.vulnerableBounds = [];
};
CollisionSystem.prototype.update = function(delta) {
	GameObject.prototype.update.call(this,delta);

	var i = 0,
		l = this.attackBounds.length,
		j,
		m = this.vulnerableBounds.length,
		collision = false,
		attack, vulnerable;
	for(; i < l; i++){
		attack = this.attackBounds[i];
		for(j=0; j < m; j++){
			vulnerable = this.vulnerableBounds[j];
			if(attack.object != vulnerable.object &&
				attack.bounds[2] >= vulnerable.bounds[0] &&
				attack.bounds[0] <= vulnerable.bounds[2] &&
				attack.bounds[3] >= vulnerable.bounds[1] &&
				attack.bounds[1] <= vulnerable.bounds[3])
			{
				attack.object.hit(vulnerable.object);
				vulnerable.object.hitBy(attack.object);
				// break; here?
			}
		}
	}
	this.attackBounds = [];
	this.vulnerableBounds = [];
};
CollisionSystem.prototype.addCollisionBounds = function(object, attackBounds, vulnerableBounds){
	// These should be added sorted!!
	if(attackBounds && attackBounds.length)
		this.attackBounds.push({object: object, bounds: attackBounds});
	if(vulnerableBounds && vulnerableBounds.length)
		this.vulnerableBounds.push({object: object, bounds: vulnerableBounds});
};


var InputSystem = GameObject.extend("InputSystem");
InputSystem.prototype._init = function() {
	GameObject.prototype._init.call(this);
	this.hasInput = false;
	this.lastInput = null;
};
InputSystem.prototype.update = function(parent, delta) {
	//this.hasInput = false;
	this.hasKey = Math.max(--this.hasKey,0);
};
InputSystem.prototype.click = function(x,y){
	this.hasInput = true;
	this.lastInput = {x: x, y: y};
}
InputSystem.prototype.mouseDown = function(x,y){
	this.hasInput = true;
	this.lastInput = {x: x, y: y};
}
InputSystem.prototype.keyDown = function(keyCode){
	this.hasKey = 2;
	this.keyCode = keyCode;
}
var MoveToClickComponent = GameComponent.extend("MoveToClickComponent");
MoveToClickComponent.prototype.update = function(parent, delta) {
	if(sInputSystem.hasInput){
		parent.position.set(sInputSystem.lastInput);
		sInputSystem.hasInput = false;
	}
};
var AirResistanceComponent = GameComponent.extend("AirResistanceComponent");
AirResistanceComponent.prototype._init = function(csa,rho) {
	this.csa = csa;
	this.rho = typeof rho == "number" ? rho : 0.001;
};
AirResistanceComponent.prototype.update = function(parent,delta) {
	var mag2 = parent.velocity.magnitude2(),
		scalar = 1-mag2*this.rho*this.csa*delta;
	parent.velocity.scale(scalar);
	return;
	var	dvx = Math.abs(Math.sin(theta)*dv),
		dvy = Math.abs(Math.cos(theta)*dv);
		// Math.abs... Math.min....
	if(dvx > Math.abs(parent.vx))
		parent.vx = 0;
	else
		parent.vx = parent.vx + (parent.vx < 0 ? dvx : -dvx);
	if(dvy > Math.abs(parent.vy))
		parent.vy = 0;
	else
		parent.vy = parent.vy + (parent.vy < 0 ? dvy : -dvy);
};

var GravitateToClickComponent = GameComponent.extend("GravitateToClickComponent");
GravitateToClickComponent.prototype._init = function() {
	this.vector = new Vector2();
};
GravitateToClickComponent.prototype.update = function(parent, delta){
	if(sInputSystem.hasInput){
		var acc = this.vector;
		acc.set(sInputSystem.lastInput).set(parent.position);
		acc.normalise();
		acc.scale(0.001*delta);
		parent.velocity.add(acc);
	}
}







var RenderSystem = GameObject.extend("RenderSystem");
(function(){
	RenderSystem.prototype._init = function(context) {
		GameObject.prototype._init.call(this);
		this.context = context;
	};
	function drawPath(context, path){
		var i = 2,
			l = path.length,
			v;
		context.beginPath();
		v = GameObject.sCameraSystem.worldToScreen(path[0],path[1]);
		context.moveTo(v.x,v.y);
		for(;i<l-1;i+=2){
			v = GameObject.sCameraSystem.worldToScreen(path[i],path[i+1]);
			context.lineTo(v.x,v.y);
		}
	}
	RenderSystem.prototype.strokePath = function(path, style) {
		if(typeof style == "undefined")
			style = '#000';
		this.context.strokeStyle = style;
		drawPath(this.context, path);
		this.context.stroke();
	};
	RenderSystem.prototype.fillPath = function(path, style) {
		if(typeof style == "undefined")
			style = '#000';
		this.context.fillStyle = style;
		drawPath(this.context, path);
		this.context.fill();
	};
	RenderSystem.prototype.fillCircle = function(x,y,r, style){
		var v = GameObject.sCameraSystem.worldToScreen(x,y);
		this.context.fillStyle = style;
		this.context.fillCircle(v.x, v.y, r);
	};
	RenderSystem.prototype.strokeRect = function(x,y,w,h, style){
		var v = GameObject.sCameraSystem.worldToScreen(x,y);
		this.context.strokeStyle = style;
		this.context.strokeRect(v.x, v.y, w, h);
	};
	RenderSystem.prototype.drawSprite = function(x,y,sprite) {
		// body...
	};
})();
var FollowComponent = GameComponent.extend("FollowComponent");
FollowComponent.prototype._init = function(object) {
	this.target = object;
};
FollowComponent.prototype.update = function(parent, delta) {
	parent.position.set(this.target.position);
};




var DecayComponent = GameComponent.extend("DecayComponent");
DecayComponent.prototype._init = function(lifetime) {
	this.lifetime = lifetime;
	this.destroyOnTimeout = false;
	this.spawnOnTimeout = null;
};
DecayComponent.prototype.update = function(parent, delta) {
	this.lifetime -= delta;

	if(this.lifetime < 0){
		if(this.destroyOnTimeout)
			parent.life = 0;

		if(this.spawnOnTimeout != null){}
	}
};
