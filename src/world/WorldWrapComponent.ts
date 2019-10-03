import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';
import WorldSystem from './WorldSystem';

/**
 * When parent goes outside of world bounds wrap to the opposite wall.
 * @param {WorldSystem} worldSystem - Which world is the parent in.
 * @memberof World
 */
class WorldWrapComponent extends GameComponent {
	worldSystem: WorldSystem;

	constructor (worldSystem) {
		super();

		this.worldSystem = worldSystem;
	}

	update (parent: GameObject, delta: number) {
		const worldBounds = this.worldSystem.bounds;
		const parentBounds = parent.bounds;

		const ax1 = worldBounds[0];
		const ay1 = worldBounds[1];
		const ax2 = worldBounds[2];
		const ay2 = worldBounds[3];
		const az1 = worldBounds[4];
		const az2 = worldBounds[5];

		const px = parent.position[0];
		const py = parent.position[1];
		const pz = parent.position[2];

		const vx = parent.velocity[0];
		const vy = parent.velocity[1];
		const vz = parent.velocity[2];

		const bx1 = parentBounds ? ax1 - parentBounds[2] : ax1;
		const bx2 = parentBounds ? ax2 - parentBounds[0] : ax2;
		const by1 = parentBounds ? ay1 - parentBounds[3] : ay1;
		const by2 = parentBounds ? ay2 - parentBounds[1] : ay2;
		const bz1 = parentBounds ? az1 - parentBounds[5] : az1;
		const bz2 = parentBounds ? az2 - parentBounds[4] : az2;

		if(px < bx1 && vx < 0){
			parent.position[0] = bx2;
			parent.fire("wrap", parent);	// [-1,0,0]
		}
		else if(px > bx2 && vx > 0){
			parent.position[0] = bx1;
			parent.fire("wrap", parent);	// [1,0,0]
		}

		if(py < by1 && vy < 0){
			parent.position[1] = by2;
			parent.fire("wrap", parent);	// [0,-1,0]
		}
		else if(py > by2 && vy > 0){
			parent.position[1] = by1;
			parent.fire("wrap", parent);	// [0,1,0]
		}

		if(pz < bz1 && vz < 0){
			parent.position[2] = bz2;
			parent.fire("wrap", parent);	// [0,0,-1]
		}
		else if(pz > bz2 && vz > 0){
			parent.position[2] = bz1;
			parent.fire("wrap", parent);	// [0,0,1]
		}
	}
}

export default WorldWrapComponent;
