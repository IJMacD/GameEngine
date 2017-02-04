import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

export { default as FlockingComponent } from './FlockingComponent';

export { default as GravityComponent } from './GravityComponent';

export { default as PositionInterpolatorComponent } from './PositionInterpolatorComponent';

export { default as SwitchComponent } from './SwitchComponent';

/**
 * @namespace Basic
 */

	export class PointGravityComponent extends GameComponent {
		constructor (target) {
			super();
			this.target = target;
			this.vector = vec3.create();
		}

		update (parent, delta) {
			vec3.subtract(this.vector, this.target.position, parent.position);
			var scale = this.target.mass*delta/vec3.squaredLength(this.vector);
			vec3.normalize(this.vector, this.vector);
			vec3.scaleAndAdd(parent.velocity, parent.velocity, this.vector, scale);
		}
	}

	/**
	 * Objects cannot move without this component.
 	 * @extends {GameComponent}
	 */
	export class MoveComponent extends GameComponent {
		update (parent, delta) {
			vec3.scaleAndAdd(parent.position, parent.position, parent.velocity, delta);
		}
	}

/**
 * This component allows objects to respond to impulses.
 *
	* @example <caption>If parent has an impulse vector its contents will be added to the velocity.</caption>
	* // Apply impulse of 0.05 pixels per second in direction of x-axis
	* vec3.set(gameObject.impulse, 0.05, 0, 0);
	* @extends {GameComponent}
	*/
	export class PhysicsComponent extends GameComponent {
		update (parent, delta) {
			if(parent.impulse){
				vec3.add(parent.velocity, parent.velocity, parent.impulse);
				vec3.set(parent.impulse, 0, 0, 0);
			}
		}
	}

	export class RandomMotionComponent extends GameComponent {
		update (parent, delta) {
			if(Math.random()<0.001)
				vec3.random(parent.velocity, Math.random());
		}
	}


	export class RotationComponent extends GameComponent {
		constructor (dth) {
			super();
			this.rotationSpeed = dth;
		}

		update (parent, delta) {
			var w = parent.rotationSpeed || this.rotationSpeed || 0;
			parent.setRotation(parent.rotation + w * delta);
		}
	}

	export class RotateToHeadingComponent extends GameComponent {
		update (parent, delta) {
			parent.targetRotation = Math.atan2(parent.velocity[0], -parent.velocity[1]);
		}
	}


	export class RotationInterpolatorComponent extends GameComponent {
		update (parent, delta) {
			var rotation = parent.rotation,
					target = parent.targetRotation,
					diff = target - rotation,
					speed = 0.01;
			if(diff > Math.PI){
				diff -= Math.PI * 2;
			} else if (diff < -Math.PI){
				diff += Math.PI * 2;
			}
			parent.rotation = rotation + diff * delta * speed;
		}
	}

	export class FollowComponent extends GameComponent {
		constructor (object) {
			super();
			this.target = object;
		}

		update (parent, delta) {
			if(this.target) vec3.copy(parent.position, this.target.position);
		}

		setTarget (object) {
			this.target = object;
		}
	}

	export class FollowAtDistanceComponent extends GameComponent {
		constructor(object, distance) {
			super();
			this.target = object;
			this.distance = distance;
		}

		update (parent, delta) {
			vec3.add(parent.position, this.target.position, this.distance);
		}
	}

	export class TrackRotationComponent extends GameComponent {
		constructor (object) {
			super();
			this.target = object;
		}

		update (parent, delta) {
			parent.rotation = this.target.rotation + Math.PI;
		}
	}

	export class CounterRotationComponent extends GameComponent {
		constructor (object) {
			super();
			this.target = object;
		}

		update (parent, delta) {
			parent.rotation = -this.target.rotation;
		}
	}


/**
 * Limit the velocity of an object.
 * @extends {GameComponent}
 * @param {number} velocity - Scalar maximum velocity.
 */
export class TerminalVelocityComponent extends GameComponent {

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