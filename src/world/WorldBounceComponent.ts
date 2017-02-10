import GameComponent from '../core/GameComponent.ts';
import WorldSystem from './WorldSystem';

/**
 * Bounce off the walls of a world.
 * @param {WorldSystem} worldSystem - The world the parent object is in.
 * @param {number} width - Default width if parent has no bounds
 * @param {number} height - Default height if parent has no bounds
 * @param {number} thickness - Default thickness if parent has no bounds
 * @memberof World
 */
class WorldBounceComponent extends GameComponent {
    worldSystem: WorldSystem;
    ax: number;
    ay: number;
    az: number;

    cRestitution = 1;
    cFriction = 1;

    constructor (worldSystem, width = 0, height = 0, thickness = 0) {
        super();

        this.worldSystem = worldSystem;
        this.ax = width / 2;
        this.ay = height / 2;
        this.az = thickness / 2;
    }

    update (parent, delta) {
        const coef = this.cRestitution;
        const friction = this.cFriction;
        const worldBounds = this.worldSystem.bounds;
        const parentBounds = parent.bounds;

        let bx1, by1, bx2, by2, bz1, bz2;

        if(parentBounds){
            bx1 = worldBounds[0] - parentBounds[0];
            by1 = worldBounds[1] - parentBounds[1];
            bx2 = worldBounds[2] - parentBounds[2];
            by2 = worldBounds[3] - parentBounds[3];
            bz1 = worldBounds[4] - parentBounds[4];
            bz2 = worldBounds[5] - parentBounds[5];
        }
        else{
            bx1 = worldBounds[0] + this.ax;
            by1 = worldBounds[1] + this.ay;
            bx2 = worldBounds[2] - this.ax;
            by2 = worldBounds[3] - this.ay;
            bz1 = worldBounds[4] + this.az;
            bz2 = worldBounds[5] - this.az;
        }

        // hasBounced: 1: x, 2: y, 3: z
        parent.hasBounced = false;

        if(parent.position[0] < bx1){
            parent.position[0] = bx1;
            parent.velocity[0] = -parent.velocity[0]*coef;
            parent.velocity[1] = parent.velocity[1]*friction;
            parent.velocity[2] = parent.velocity[2]*friction;

            parent.hasBounced = 1;
        }
        else if(parent.position[0] > bx2){
            parent.position[0] = bx2;
            parent.velocity[0] = -parent.velocity[0]*coef;
            parent.velocity[1] = parent.velocity[1]*friction;
            parent.velocity[2] = parent.velocity[2]*friction;

            parent.hasBounced = 1;
        }

        if(parent.position[1] < by1){
            parent.position[1] = by1;
            parent.velocity[1] = -parent.velocity[1]*coef;
            parent.velocity[0] = parent.velocity[0]*friction;
            parent.velocity[2] = parent.velocity[2]*friction;

            parent.hasBounced = 2;
        }
        else if(parent.position[1] > by2){
            parent.position[1] = by2;
            parent.velocity[1] = -parent.velocity[1]*coef;
            parent.velocity[0] = parent.velocity[0]*friction;
            parent.velocity[2] = parent.velocity[2]*friction;

            parent.hasBounced = 2;
        }

        if(parent.position[2] < bz1){
            parent.position[2] = bz1;
            parent.velocity[2] = -parent.velocity[2]*coef;
            parent.velocity[0] = parent.velocity[0]*friction;
            parent.velocity[1] = parent.velocity[1]*friction;

            parent.hasBounced = 3;
        }
        else if(parent.position[2] > bz2){
            parent.position[2] = bz2;
            parent.velocity[2] = -parent.velocity[2]*coef;
            parent.velocity[0] = parent.velocity[0]*friction;
            parent.velocity[1] = parent.velocity[1]*friction;

            parent.hasBounced = 3;
        }
    }
}

export default WorldBounceComponent;
