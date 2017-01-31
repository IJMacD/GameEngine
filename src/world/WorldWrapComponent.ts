import GameComponent from '../core/GameComponent.ts';
import WorldSystem from './WorldSystem';

export default WorldWrapComponent;

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

	update (parent, delta) {
		const ax = this.worldSystem.bounds[0];
		const ay = this.worldSystem.bounds[1];
		const bx = this.worldSystem.bounds[2];
		const by = this.worldSystem.bounds[3];
		const az = this.worldSystem.bounds[4];
		const bz = this.worldSystem.bounds[5];

		if(parent.position[0] < ax
			&& parent.velocity[0] < 0){
			parent.position[0] = bx;
			this.fire("wrap", parent);
		}
		else if(parent.position[0] > bx
			&& parent.velocity[0] > 0){
			parent.position[0] = ax;
			this.fire("wrap", parent);
		}

		if(parent.position[1] < ay
			&& parent.velocity[1] < 0){
			parent.position[1] = by;
			this.fire("wrap", parent);
		}
		else if(parent.position[1] > by
			&& parent.velocity[1] > 0){
			parent.position[1] = ay;
			this.fire("wrap", parent);
		}

		if(parent.position[2] < az
			&& parent.velocity[2] < 0){
			parent.position[2] = bz;
			this.fire("wrap", parent);
		}
		else if(parent.position[2] > bz
			&& parent.velocity[2] > 0){
			parent.position[2] = az;
			this.fire("wrap", parent);
		}
	}
}
