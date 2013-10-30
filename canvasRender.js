var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;

	function RenderSystem(context, canvasWidth, canvasHeight, cameraSystem){
		this.context = context;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
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
			this.maxLayer = Math.max(this.maxLayer, layer);
		}
		this.renderQueue[layer].push(renderable);
	};
	RenderSystem.prototype.update = function(delta) {
		this.context.fillStyle = "#ffffff";
		this.context.fillRect(0,0,this.canvasWidth,this.canvasHeight);

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

		for(var i = 0, l = this.renderQueue.length; i < l; i++){
			for(var j = 0, n = this.renderQueue[i] && this.renderQueue[i].length; j < n; j++){
				this.context.save();
				this.renderQueue[i][j].call(this, this.context);
				this.context.restore();
			}
		}

		this.context.restore();

		this.renderQueue = [];
	};
	RenderSystem.prototype.setCanvasSize = function(width, height){
		this.canvasWidth = width;
		this.canvasHeight = height;
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


	function SpriteRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	GEC.SpriteRenderingComponent = SpriteRenderingComponent;
	SpriteRenderingComponent.prototype = new GameComponent();
	SpriteRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			var x = parent.position.x,
				y = parent.position.y,
				w = parent.sprite.width,
				h = parent.sprite.height;
			context.translate(x,y);
			context.rotate(parent.rotation);
			context.drawImage(parent.sprite,-w/2,-h/2);
		});
	};

	return GE;
}(GE || {}));
