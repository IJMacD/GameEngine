import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';
import CameraSystem from '../CameraSystem';

/**
 * <p>The default renderer for 2D canvas renderings. Jobs submitted each frame
 * will get rendered to the canvas.
 * <p>It supports render layers as well.
 * @extends {GameObject}
 * @param {CanvasRenderingContext2D} context - A 2d context from the target canvas. Call <code>canvas.getContext('2d')</code>
 * @param {CameraSystem} cameraSystem - Viewport from which to render from. All drawing calls will be made realtive to the camera position.
 */
export default class CanvasRenderSystem extends GameObject {

	DEBUG_LAYER = 10;
	STATIC_LAYER = -1;

	context: CanvasRenderingContext2D;
	canvas: HTMLCanvasElement;
	camera: CameraSystem;

	renderQueue: ((ctx: CanvasRenderingContext2D) => void)[][] = [];

	/** Should the renderer clear the screen before drawing a frame or just overdraw. */
	clearScreen = true;

	constructor (context: CanvasRenderingContext2D, cameraSystem: CameraSystem) {
		super();

		this.context = context;
		this.canvas = context && context.canvas;
		this.camera = cameraSystem;
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
	push (renderable: (context: CanvasRenderingContext2D) => void, layer: number = 1) {
		if(!this.renderQueue[layer]) {
			this.renderQueue[layer] = [];
		}
		this.renderQueue[layer].push(renderable);
	}

	update (delta: number) {
		if(this.clearScreen){
			this.context.clearRect(0,0,this.canvas.width,this.canvas.height);
		}

		this.context.save();

		var p = this.camera.position,
			q = this.canvas.width / 2,
			r = this.canvas.height / 2,
			i,
			l,
			j,
			n;

		this.context.translate(q,r);
		// this.context.transform(this.camera.skewX,1,1,this.camera.skewY,0,0);
		this.context.scale(this.camera.scaleX, this.camera.scaleY);

		// Only rotation around the Z-axis makes sense for canvas rendering
		if(this.camera.rotationAxis[2] == 1){
			this.context.rotate(-this.camera.rotation);
		}

		this.context.translate(-p[0],-p[1]);

		for(i = 0, l = this.renderQueue.length; i < l; i++){
			this._renderQueue(i);
		}

		this.context.restore();

		// Special case layer renders on top independant of camera
		this._renderQueue(this.STATIC_LAYER);
	}

	drawPath (context: CanvasRenderingContext2D, path: number[]){
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
	strokePath (path: number[], style = "#000", layer = 1) {
		this.push(function(context){
			context.strokeStyle = style;
			this.drawPath(context, path);
			context.stroke();
		}, layer);
	}

	private _renderQueue (layer: number) {
		const { context, renderQueue } = this;
		const queue = renderQueue[layer];
		if(queue){
			for(let j = 0, n = queue.length; j < n; j++){
				context.save();
				queue[j].call(this, context);
				context.restore();
			}
			queue.length = 0;
		}
	}
}
