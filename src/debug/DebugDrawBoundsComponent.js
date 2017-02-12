import GameComponent from '../core/GameComponent.ts';

/**
 * It is sometimes useful to draw the bounds of an object or world for example.
 * @class DebugDrawBoundsComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where to draw the bounds
 */
export default class DebugDrawBoundsComponent extends GameComponent {

	constructor (renderSystem) {
		super();

		this.renderSystem = renderSystem;
	}

	update (parent, delta) {
		const bounds = parent.bounds;
		if(bounds){
			this.renderSystem.push(ctx => {
				ctx.translate(parent.position[0], parent.position[1]);
				// Don't rotate yet because collision components don't take rotation into account
				// ctx.rotate(parent.rotation);
				ctx.beginPath();
				ctx.rect(parent.bounds[0], parent.bounds[1], parent.bounds[2] - parent.bounds[0], parent.bounds[3] - parent.bounds[1]);
				ctx.strokeStyle = "#000";
				ctx.stroke();
			});
		}
	}
}
