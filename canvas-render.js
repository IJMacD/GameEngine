import { GameObject, GameObjectManager } from './core';

	export default function CanvasRenderSystem(context, cameraSystem){
		this.context = context;
		this.canvas = context && context.canvas;
		this.cameraSystem = cameraSystem;
		this.renderQueue = [];
		this.clearScreen = true;
	}
	CanvasRenderSystem.prototype = new GameObject();

	/**
	 * @callback CanvasRenderable
	 * @param {CanvasRenderingContext2D} context
	 */

	/**
	 * Add a renderable to the draw queue
	 * @param {CanvasRenderable} renderable - Function which will receive drawing context
	 * @param {number} layer - Layer to add this drawable to. Default: 1
	 */
	CanvasRenderSystem.prototype.push = function(renderable, layer){
		layer = layer == undefined ? 1 : layer;
		if(!this.renderQueue[layer]) {
			this.renderQueue[layer] = [];
		}
		this.renderQueue[layer].push(renderable);
	};

	function _renderQueue(context, queue){
		if(queue){
			for(let j = 0, n = queue.length; j < n; j++){
				context.save();
				queue[j].call(this, context);
				context.restore();
			}
			queue.length = 0;
		}
	}
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
			j,
			n;

		this.context.translate(q,r);
		// this.context.transform(this.cameraSystem.skewX,1,1,this.cameraSystem.skewY,0,0);
		this.context.scale(this.cameraSystem.scaleX, this.cameraSystem.scaleY);

		// Only rotation around the Z-axis makes sense for canvas rendering
		if(this.cameraSystem.rotationAxis[2] == 1){
			this.context.rotate(-this.cameraSystem.rotation);
		}

		this.context.translate(-p[0],-p[1]);

		for(i = 0, l = this.renderQueue.length; i < l; i++){
			_renderQueue(this.context, this.renderQueue[i]);
		}

		this.context.restore();

		// Special case layer renders on top independant of camera
		_renderQueue(this.context, this.renderQueue[-1]);
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
			layer = 1;
		this.push(function(context){
			context.strokeStyle = style;
			drawPath.call(this, context, path);
			context.stroke();
		}, layer);
	};

	export function MultiRenderSystem(){
		this.renderSystems = [];
	}
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

	export function CanvasRenderSystemManager(){}
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