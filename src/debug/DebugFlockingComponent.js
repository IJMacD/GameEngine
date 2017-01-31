import GameComponent from '../core/GameComponent.ts';
import FlockingComponent from '../behaviour/FlockingComponent';

/**
 * Class to draw NEIGHBOUR_RADIUS and SEPARATION_RADIUS around objects
 * @class DebugFlockingComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where should this be drawn
 */
export default class DebugFlockingComponent extends GameComponent {

    constructor (renderSystem) {
        super();

        this.renderSystem = renderSystem;
    }

    update (parent, delta) {
        this.renderSystem.push(ctx => {
            ctx.translate(parent.position[0], parent.position[1]);
            ctx.beginPath();
            ctx.arc(0, 0, FlockingComponent.NEIGHBOUR_RADIUS, 0, Math.PI * 2, false);
            ctx.strokeStyle = "#008";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, FlockingComponent.SEPARATION_RADIUS, 0, Math.PI * 2, false);
            ctx.strokeStyle = "#800";
            ctx.stroke();
        });
    }
}
