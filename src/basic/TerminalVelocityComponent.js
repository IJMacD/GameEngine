import GameComponent from '../core/GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * Limit the velocity of an object.
 * @extends {GameComponent}
 * @param {number} velocity - Scalar maximum velocity.
 */
export default class TerminalVelocityComponent extends GameComponent {

	constructor (velocity) {
		super();

		this.velocityMagnitude = velocity;
	}

	update (parent, delta) {
		const v = vec3.length(parent.velocity);

		if(v > this.velocityMagnitude){
			const scale = this.velocityMagnitude / v;
			vec3.scale(parent.velocity, parent.velocity, scale);
		}
	}
}
