import GameComponent from '../core/GameComponent';

/**
 * When parent goes outside of world bounds wrap to the opposite wall.
 * @class WorldWrapComponent
 * @extends {GameComponent}
 * @param {WorldSystem} worldSystem - Which world is the parent in.
 */
export default class WorldWrapComponent extends GameComponent {
	constructor (worldSystem) {
		super();

		this.worldSystem = worldSystem;
	}

	update (parent, delta) {
		this.ax = this.worldSystem.bounds[0];
		this.ay = this.worldSystem.bounds[1];
		this.bx = this.worldSystem.bounds[2];
		this.by = this.worldSystem.bounds[3];
		this.az = this.worldSystem.bounds[4];
		this.bz = this.worldSystem.bounds[5];

		if(parent.position[0] < this.ax
			&& parent.velocity[0] < 0){
			parent.position[0] = this.bx;
			this.fire("wrap", parent);
		}
		else if(parent.position[0] > this.bx
			&& parent.velocity[0] > 0){
			parent.position[0] = this.ax;
			this.fire("wrap", parent);
		}
		if(parent.position[1] < this.ay
			&& parent.velocity[1] < 0){
			parent.position[1] = this.by;
			this.fire("wrap", parent);
		}
		else if(parent.position[1] > this.by
			&& parent.velocity[1] > 0){
			parent.position[1] = this.ay;
			this.fire("wrap", parent);
		}
		if(parent.position[2] < this.az
			&& parent.velocity[2] < 0){
			parent.position[2] = this.bz;
			this.fire("wrap", parent);
		}
		else if(parent.position[2] > this.bz
			&& parent.velocity[2] > 0){
			parent.position[2] = this.az;
			this.fire("wrap", parent);
		}
	}
}
