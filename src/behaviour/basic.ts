import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * @namespace Behaviour
 */

	export class PointGravityComponent extends GameComponent {
		target: GameObject;
		vector: vec3;

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

	export class PositionInterpolatorComponent extends GameComponent {
		duration: number;
		easing;
		elapsed = 0;
		running = false;
		starting = false;
		start = vec3.create();

		constructor (duration: number, easing) {
			super();

	    this.duration = duration;
	    this.easing = easing || PositionInterpolatorComponent.linear;
	  }

    update (parent, delta) {
      // The first frame we run after being told to interpolate somewhere
      // we need to gather some information from our parent
      if(this.starting){

        // If any co-ordinate is NaN this means the consumer wants to
        // retain those values from the parent
        if(isNaN(this.position[0])) this.position[0] = parent.position[0];
        if(isNaN(this.position[1])) this.position[1] = parent.position[1];
        if(isNaN(this.position[2])) this.position[2] = parent.position[2];

        // Linear interpolation requires that we remember where we started
        vec3.copy(this.start, parent.position);

        this.running = true;
        this.starting = false;
        this.elapsed = 0;
      }

      if(this.running){
        var x = this.elapsed / this.duration,
            t = this.easing(x);

        if(x > 1){
          vec3.copy(parent.position, this.position);
          this.running = false;
        }
        else {
          vec3.lerp(parent.position, this.start, this.position, t);
          this.elapsed += delta;
        }
      }
    }

    setPosition (x?: number, y?: number, z?: number) {
      vec3.set(this.position, x, y, z);
      this.starting = true;
			return this;
    }

		static linear (t) { return t };
		static quadIn (t) { return t*t };
		static quadOut (t) { return -t*(t-2) };
		static circIn (t) { return 1-Math.sqrt(1-t*t) };
		static circOut (t) { return Math.sqrt(1-(t-1)*(t-1)) };
		static smooth (t) { return t*t*(3-2*t) };
		// Stolen from Dojo:
		// https://github.com/dojo/dwb/blob/master/src/main/webapp/js/build/amd_loader/fx/easing.js
		static backIn (t) {
			var s = 1.70158;
			return t * t * ((s + 1) * t - s);
		}
		static backOut (t) {
			var s = 1.70158;
			t = t - 1;
			return t*t*((s+1)*t + s) + 1;
		}
		static backInOut (t) {
			var s = 1.70158 * 1.525;
			t = t * 2;
			if(t < 1){ return (Math.pow(t, 2) * ((s + 1) * t - s)) / 2; }
			t-=2;
			return (Math.pow(t, 2) * ((s + 1) * t + s) + 2) / 2;
		}
		static elasticIn (n) {
			if(n == 0 || n == 1){ return n; }
			var p = .3;
			var s = p / 4;
			n = n - 1;
			return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
		}
		static elasticOut (n) {
			if(n==0 || n == 1){ return n; }
			var p = .3;
			var s = p / 4;
			return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
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
		target: GameObject;

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
		target: GameObject;
		distance: number;

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
		target: GameObject;

		constructor (object) {
			super();
			this.target = object;
		}

		update (parent, delta) {
			parent.rotation = this.target.rotation + Math.PI;
		}
	}

	export class CounterRotationComponent extends GameComponent {
		target: GameObject;

		constructor (object) {
			super();
			this.target = object;
		}

		update (parent, delta) {
			parent.rotation = -this.target.rotation;
		}
	}

	var addComponent = GameObject.prototype.addComponent;

	/**
	 * Component which conditionally activates child components.
   * @extends {GameComponent}
	 */
	export class SwitchComponent extends GameComponent {
		positiveComponents: GameComponent[] = [];
		negativeComponents: GameComponent[] = [];

		/** The switch for whether the positive components are active or the negative ones. Default: true */
		active = true;

		object: any;
		prop: string;

		constructor (switchObject: any, switchProperty: string) {
			super();

			this.object = switchObject;
			this.prop = switchProperty;
		}

		/**
		 * Add a positive component. Synonomous with {@link SwitchComponent#addPositiveComponent}
		 * @param {GameComponent} component - The component to add.
		 */
		addComponent (component){
			this.components = this.positiveComponents;
			addComponent.call(this, component);
			this.components  = undefined;
			return this;
		}

		/**
		 * Add a positive component
		 * @param {GameComponent} component - The component to add.
		 */
		addPositiveComponent (component){
			this.components = this.positiveComponents;
			addComponent.call(this, component);
			this.components  = undefined;
		}

		/**
		 * Add a negative component
		 * @param {GameComponent} component - The component to add.
		 */
		addNegativeComponent (component){
			this.components = this.negativeComponents;
			addComponent.call(this, component);
			this.components  = undefined;
		}

		/**
		 * Add an array of positive components and negativeComponents
		 * @param {GameComponent[]} positiveComponents - The components to add to the positive side.
		 * @param {GameComponent[]} negativeComponents - The components to add to the negative side.
		 */
		addComponents (positiveComponents, negativeComponents){
			positiveComponents.forEach(this.addPositiveComponent.bind(this));
			negativeComponents.forEach(this.addNegativeComponent.bind(this));
		}

		/**
		 * Swap the active state from positive to negative or vice-versa.
		 */
		flip () {
			this.setActive(!this.active);
		}

		/**
		 * Explicitly set the active state.
		 * @param {boolean} active - True means positive components will become active.
		 */
		setActive (active) {
			this.active = active;

			if(this.object){
				this.object[this.prop] = this.active;
			}
		}

		update (parent, delta) {
			var i = 0,
					l;

			if(this.object){
				this.active = this.object[this.prop];
			}

			if(this.active){
				l = this.positiveComponents.length;
				for(;i<l;i++){
					this.positiveComponents[i].update(parent, delta);
				}
			} else {
				l = this.negativeComponents.length;
				for(;i<l;i++){
					this.negativeComponents[i].update(parent, delta);
				}
			}
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

		this.velocity = velocity;
	}

	update (parent, delta) {
		const v = vec3.length(parent.velocity);

		if(v > this.velocity){
			const scale = this.velocity / v;
			vec3.scale(parent.velocity, parent.velocity, scale);
		}
	}
}