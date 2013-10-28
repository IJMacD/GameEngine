var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;


	function RenderSystem(context, bounds, cameraSystem){
		this.context = context;
		this.bounds = bounds;
		this.cameraSystem = cameraSystem;
		this.renderQueue = [];
		this.maxLayer = 1;
	}
	GE.RenderSystem = RenderSystem;
	RenderSystem.prototype = new GE.GameObject();
	RenderSystem.prototype.push = function(renderable, layer){
		layer = layer == undefined ? 1 : layer;
		if(!this.renderQueue[layer]) {
			this.renderQueue[layer] = [];
			this.maxLayer = Math.max(maxLayer, layer);
		}
		this.renderQueue[layer].push(renderable);
	};
	RenderSystem.prototype.update = function(delta) {
		this.context.clearRect(this.bounds[0],this.bounds[1],this.bounds[2],this.bounds[3]);

		this.context.save();

		var m = this.cameraSystem.getTransformMatrix().values,
			p = this.cameraSystem.position,
			q = this.cameraSystem.width / 2,
			r = this.cameraSystem.height / 2;
		// this.context.setTransform(m[0][0],m[1][0],m[0][1],m[1][1],-p.x,-p.y);

		this.context.translate(q,r);
		// this.context.transform(this.cameraSystem.skewX,1,1,this.cameraSystem.skewY,0,0);
		this.context.scale(this.cameraSystem.scaleX, this.cameraSystem.scaleY);
		this.context.rotate(this.cameraSystem.rotation);
		this.context.translate(-p.x,-p.y);

		this.context.strokeRect(-this.bounds[2]/2,-this.bounds[3]/2,this.bounds[2],this.bounds[3]);

		for(var i = 0, l = this.renderQueue.length; i < l; i++){
			for(var j = 0, n = this.renderQueue[i].length; j < n; j++){
				this.context.save();
				this.renderQueue[i][j].call(this, this.context);
				this.context.restore();
			}
		}

		this.context.restore();

		this.renderQueue = [];
	};
	RenderSystem.prototype.setBounds = function(bounds){
		this.bounds = bounds;
	}
	function drawPath(context, path){
		var i = 2,
			l = path.length,
			v;
		context.beginPath();
		// v = this.cameraSystem.worldToScreen(path[0],path[1]);
		// context.moveTo(v.x,v.y);
		context.moveTo(path[0],path[1]);
		for(;i<l-1;i+=2){
			// v = this.cameraSystem.worldToScreen(path[i],path[i+1]);
			// context.lineTo(v.x,v.y);
			context.lineTo(path[i],path[i+1]);
		}
	}
	// Convenience
	RenderSystem.prototype.strokePath = function(path, style, layer) {
		if(typeof style == "undefined")
			style = '#000';
		this.push(function(context){
			context.strokeStyle = style;
			drawPath.call(this, context, path);
			context.stroke();
		}, layer);
	};


	function CameraSystem (initX,initY,width,height) {
		GE.GameObject.apply(this,arguments);
		this.width = width;
		this.height = height;
		this.watchObject = null;
		this.pruneList = [];
		this.suspendedObjects = [];
		this.skew = 0;
		this.skewX = this.skew;
		this.skeyY = this.skew;
		this.scale = 1;
		this.scaleX = this.scale;
		this.scaleY = this.scale;
		this.rotation = 0;
		// this.angle = 0;
		this.rotMat = Matrix.rotationMatrix(this.rotation);
		this.scaleMatrix = Matrix.scaleMatrix(this.scaleX, this.scaleY);
		this.shearMatrix = Matrix.shearMatrix(this.skewX, this.skewY);
		this.worldVec = new Vector2();
		this.screenVec = new Vector2();
		this.pruneVec = new Vector2();
	}
	GE.CameraSystem = CameraSystem;
	CameraSystem.prototype = new GE.GameObject();
	CameraSystem.prototype.setScreenSize = function(width, height){
		this.width = width;
		this.height = height;
	}
	CameraSystem.prototype.addManagerForPruning = function(objectManager) {
		if(objectManager instanceof GE.GameObjectManager)
			this.pruneList.push(objectManager);
	};
	CameraSystem.prototype.worldToScreen = function(worldX,worldY){
		var v = this.worldVec.set(worldX, worldY);
		v.subtract(this.position);
		v.leftMultiply(this.shearMatrix);
		v.leftMultiply(this.scaleMatrix);
		v.leftMultiply(this.rotMat);
		v.add(this.width / 2, this.height / 2);
		return v;
	};
	CameraSystem.prototype.screenToWorld = function(screenX,screenY){
		var v = this.screenVec.set(screenX, screenY);
		v.subtract(this.width / 2, this.height / 2);
		v.leftMultiply(this.rotMat.inverse());
		v.leftMultiply(this.scaleMatrix.inverse());
		v.leftMultiply(this.shearMatrix.inverse());
		v.add(this.position);
		return v;
	};
	CameraSystem.prototype.getTransformMatrix = function(){
		var m = new Matrix(this.shearMatrix);
		m.multiplyBy(this.scaleMatrix);
		m.multiplyBy(this.rotMat);
		return m;
	};
	CameraSystem.prototype.update = function(delta) {
		GE.GameObject.prototype.update.call(this, delta);
		//this.rotation += 0.0001 * delta;
		//this.rotMat = Matrix.rotationMatrix(-Vector2.angleBetween(suns[0],pointMasses[0]));
		//this.angle += 0.0001 * delta;
		//this.scaleMatrix.values[0][0] = -(Math.sin(this.angle)+0.5)*3;
		//this.scaleMatrix.values[1][1] = (Math.sin(this.angle)+0.5)*3;
		//this.rotMat = Matrix.rotationMatrix(this.rotation);
		var i = 0,
			l = this.pruneList.length,
			mgr, objs, j,
			dx, dy;
		for(; i < l; i++){
			mgr = this.pruneList[i];
			if(mgr instanceof GE.GameObjectManager)
			{
				objs = mgr.objects;
				for(j=0;j<objs.length;j++){
					this.pruneVec.set(objs[j].position).subtract(this.position);
					if(Math.abs(this.pruneVec.x) > width * 2 || Math.abs(this.pruneVec.y) > height * 2)
					{
						mgr.removeObject(objs[j]);
						this.suspendedObjects.push({object: objs[j], parent: mgr, position: j});
					}
				}
			}
		}
	};

	function GravityComponent () {}
	GEC.GravityComponent = GravityComponent;
	GravityComponent.prototype = new GameComponent();
	GravityComponent.prototype.update = function(parent, delta) {
		if(typeof parent.velocity.y == "undefined")
			parent.velocity.y = 0;
		parent.velocity.y += 0.0001*delta;
	};

	function MoveComponent () {
		this.delta = new Vector2();
	};
	GEC.MoveComponent = MoveComponent;
	MoveComponent.prototype = new GameComponent();
	MoveComponent.prototype.update = function(parent, delta) {
		this.delta.set(parent.velocity).scale(delta);
		parent.position.add(this.delta);
	};


	function RandomMotionComponent(){}
	GEC.RandomMotionComponent = RandomMotionComponent;
	RandomMotionComponent.prototype = new GameComponent();
	RandomMotionComponent.prototype.update = function(parent, delta) {
		if(Math.random()<0.001)
			parent.velocity.set(Math.random()-0.5, Math.random()-0.5);
	};

	function PointGravityComponent (target) {
		this.target = target;
		this.vector = new Vector2();
	}
	GEC.PointGravityComponent = PointGravityComponent;
	PointGravityComponent.prototype = new GameComponent();
	PointGravityComponent.prototype.update = function(parent, delta) {
		var vec = this.vector.set(this.target.position).subtract(parent.position),
			scalar = Math.min(this.target.mass*delta/vec.magnitude2(),0.1);
		vec.normalise();
		vec.scale(scalar);
		parent.velocity.add(vec);
	};


	function RotationComponent (dth) {
		this.rotationSpeed = dth;
	};
	GEC.RotationComponent = RotationComponent;
	RotationComponent.prototype = new GameComponent();
	RotationComponent.prototype.update = function(parent, delta) {
		parent.setRotation(parent.rotation + this.rotationSpeed * delta);
	};

	return GE;
}(GE || {}));
