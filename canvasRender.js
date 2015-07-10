var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GameObjectManager = GE.GameObjectManager,
		GEC = GE.Comp;

	function CanvasRenderSystem(context, cameraSystem){
		this.context = context;
		this.canvas = context && context.canvas;
		this.cameraSystem = cameraSystem;
		this.renderQueue = [];
		this.clearScreen = true;
	}
	GE.CanvasRenderSystem = CanvasRenderSystem;
	CanvasRenderSystem.prototype = new GE.GameObject();
	CanvasRenderSystem.prototype.push = function(renderable, layer){
		layer = layer == undefined ? 1 : layer;
		if(!this.renderQueue[layer]) {
			this.renderQueue[layer] = [];
		}
		this.renderQueue[layer].push(renderable);
	};
	CanvasRenderSystem.prototype.update = function(delta) {
		if(this.clearScreen){
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		}

		this.context.save();

		var p = this.cameraSystem.position,
			q = this.canvas.width / 2,
			r = this.canvas.height / 2,
			i,
			l,
			queue,
			j,
			n;

		this.context.translate(q,r);
		// this.context.transform(this.cameraSystem.skewX,1,1,this.cameraSystem.skewY,0,0);
		this.context.scale(this.cameraSystem.scaleX, this.cameraSystem.scaleY);
		if(this.cameraSystem.rotationAxis[2] == 1){
			this.context.rotate(this.cameraSystem.rotation);
		}
		//this.context.scale(1, -1);
		this.context.translate(-p[0],-p[1]);

		for(i = 0, l = this.renderQueue.length; i < l; i++){
			queue = this.renderQueue[i];
			if(queue){
				for(j = 0, n = queue.length; j < n; j++){
					this.context.save();
					queue[j].call(this, this.context);
					this.context.restore();
				}
				queue.length = 0;
			}
		}

		this.context.restore();
	};

	function drawPath(context, path){
		var i = 2,
				l = path.length;
		context.beginPath();
		context.moveTo(path[0],path[1]);
		for(;i<l-1;i+=2){
			context.lineTo(path[i],path[i+1]);
		}
	}
	// Convenience
	CanvasRenderSystem.prototype.strokePath = function(path, style, layer) {
		if(typeof style == "undefined")
			style = '#000';
	 	if(typeof layer == "undefined")
			layer = 0;
		this.push(function(context){
			context.strokeStyle = style;
			drawPath.call(this, context, path);
			context.stroke();
		}, layer);
	};

	function MultiRenderSystem(){
		this.renderSystems = [];
	}
	GE.MultiRenderSystem = MultiRenderSystem;
	MultiRenderSystem.prototype = new CanvasRenderSystem();
	MultiRenderSystem.prototype.addRenderSystem = function(renderSystem){
		this.renderSystems.push(renderSystem);
	};
	MultiRenderSystem.prototype.push = function(renderable, layer){
		var renderSystems = this.renderSystems,
			i = 0,
			l = renderSystems.length;
		for(;i<l;i++){
			renderSystems[i].push(renderable, layer);
		}
	};
	MultiRenderSystem.prototype.update = function(delta){
		var renderSystems = this.renderSystems,
			i = 0,
			l = renderSystems.length;
		for(;i<l;i++){
			renderSystems[i].update(delta);
		}
	};


	function CanvasSpriteRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	GEC.CanvasSpriteRenderingComponent = CanvasSpriteRenderingComponent;
	CanvasSpriteRenderingComponent.prototype = new GameComponent();
	CanvasSpriteRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			var x = parent.position[0],
				y = parent.position[1],
				w = parent.sprite.width,
				h = parent.sprite.height;
			context.translate(x,y);
			context.rotate(parent.rotation);
			context.drawImage(parent.sprite,-w/2,-h/2);
		});
	};

	function CanvasRenderSystemManager(){}
	GE.CanvasRenderSystemManager = CanvasRenderSystemManager;
	CanvasRenderSystemManager.prototype = new GameObjectManager();
	CanvasRenderSystemManager.prototype.push = function(renderable, layer){
		for (var i = this.objects.length - 1; i >= 0; i--) {
			this.objects[i].push(renderable, layer);
		};
	};
	
	// Convenience
	CanvasRenderSystemManager.prototype.strokePath = function(path, style, layer) {
		if(typeof style == "undefined")
			style = '#000';
		this.push(function(context){
			context.strokeStyle = style;
			drawPath.call(this, context, path);
			context.stroke();
		}, layer);
	};

	return GE;
}(GE || {}));
