import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';

/**
 * <p>The default renderer for 2D canvas renderings. Jobs submitted each frame
 * will get rendered to the canvas.
 * <p>It supports render layers as well.
 * @class CanvasRenderSystem
 * @extends {GameObject}
 * @param {CanvasRenderingContext2D} context - A 2d context from the target canvas. Call <code>canvas.getContext('2d')</code>
 * @param {CameraSystem} cameraSystem - Viewport from which to render from. All drawing calls will be made realtive to the camera position.
 */
export default class CanvasRenderSystem extends GameObject {

	constructor (context, cameraSystem) {
		super();

		this.context = context;
		this.canvas = context && context.canvas;
		this.cameraSystem = cameraSystem;

		this.renderQueue = [];

		this.clearScreen = true;
	}

	/**
	 * @callback CanvasRenderable
	 * @param {CanvasRenderingContext2D} context
	 */

	/**
	 * Add a renderable to the draw queue
	 * @param {CanvasRenderable} renderable - Function which will receive drawing context
	 * @param {number} layer - Layer to add this drawable to. Default: 1
	 */
	push (renderable, layer) {
		layer = layer == undefined ? 1 : layer;
		if(!this.renderQueue[layer]) {
			this.renderQueue[layer] = [];
		}
		this.renderQueue[layer].push(renderable);
	}

	update (delta) {
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
			_renderQueue(this, i);
		}

		this.context.restore();

		// Special case layer renders on top independant of camera
		_renderQueue(this, -1);
	}

	drawPath (context, path){
		var i = 2,
				l = path.length;
		context.beginPath();
		context.moveTo(path[0],path[1]);
		for(;i<l-1;i+=2){
			context.lineTo(path[i],path[i+1]);
		}
	}

	/**
	 * Convenience method to stroke a path with the given style and to the given layer.
	 * @param {array} path - Array of path co-ordinates [x0, y0, x1, y1, ..., xn, yn]
	 * @param {string} style - Colour of line to draw. Default: #000
	 * @param {number} layer - Layer this should be drawn on. Default: 1
	 */
	strokePath (path, style, layer) {
		if(typeof style == "undefined")
			style = '#000';
	 	if(typeof layer == "undefined")
			layer = 1;
		this.push(function(context){
			context.strokeStyle = style;
			drawPath.call(this, context, path);
			context.stroke();
		}, layer);
	}
}

function _renderQueue (renderSystem, layer) {
	const { context, renderQueue } = renderSystem;
	const queue = renderQueue[layer];
	if(queue){
		for(let j = 0, n = queue.length; j < n; j++){
			context.save();
			queue[j].call(renderSystem, context);
			context.restore();
		}
		queue.length = 0;
	}
}

	/**
	 * Manages the task of distributing renderables to multiple RenderSystems
	 * @constructor
	 * @extends {CanvasRenderSystem}
	 */
	export function MultiRenderSystem(){
		this.renderSystems = [];
	}
	MultiRenderSystem.prototype = new CanvasRenderSystem();

	/**
	 * Add a child render system which will receive updates.
	 * @param {CanvasRenderSystem} renderSystem - RenderSystem to add
	 */
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
