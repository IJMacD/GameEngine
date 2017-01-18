import { GameObject, GameComponent } from './core'
import { vec3 } from 'gl-matrix';

	const GRAVITATIONAL_CONSTANT = 0.0003;

	export class GravityComponent extends GameComponent {
		update (parent, delta) {
			if(typeof parent.velocity[1] == "undefined")
				parent.velocity[1] = 0;
			parent.velocity[1] += GRAVITATIONAL_CONSTANT * delta;
		}
	}

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

	export class MoveComponent extends GameComponent {
		update (parent, delta) {
			vec3.scaleAndAdd(parent.position, parent.position, parent.velocity, delta);
		}
	}

	export class PhysicsComponent extends GameComponent {
		update (parent, delta) {
			if(parent.impulse){
				vec2.add(parent.velocity, parent.velocity, parent.impulse);
				vec2.set(parent.impulse, 0, 0);
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
		constructor (duration, easing) {
			super();
	    this.duration = duration;
	    this.easing = easing || PositionInterpolatorComponent.linear;
	    this.elapsed = 0;
	    this.running = false;
	    this.starting = false;
	    this.start = vec3.create();
	    this.position = vec3.create();
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

    setPosition (x, y, z) {
      vec3.set(this.position, x, y, z);
      this.starting = true;
    }
  }
	let PIC = PositionInterpolatorComponent;
  PIC.linear = function (t) { return t };
  PIC.quadIn = function (t) { return t*t };
  PIC.quadOut = function (t) { return -t*(t-2) };
  PIC.circIn = function (t) { return 1-Math.sqrt(1-t*t) };
  PIC.circOut = function (t) { return Math.sqrt(1-(t-1)*(t-1)) };
  PIC.smooth = function (t) { return t*t*(3-2*t) };
  // Stolen from Dojo:
  // https://github.com/dojo/dwb/blob/master/src/main/webapp/js/build/amd_loader/fx/easing.js
  PIC.backIn = function (t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
  };
  PIC.backOut = function (t) {
    var s = 1.70158;
    t = t - 1;
    return t*t*((s+1)*t + s) + 1;
  };
  PIC.backInOut = function (t) {
    var s = 1.70158 * 1.525;
    t = t * 2;
    if(t < 1){ return (Math.pow(t, 2) * ((s + 1) * t - s)) / 2; }
    t-=2;
    return (Math.pow(t, 2) * ((s + 1) * t + s) + 2) / 2;
  };
  PIC.elasticIn = function(n){
    if(n == 0 || n == 1){ return n; }
    var p = .3;
    var s = p / 4;
    n = n - 1;
    return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
  };
  PIC.elasticOut = function(n){
    if(n==0 || n == 1){ return n; }
    var p = .3;
    var s = p / 4;
    return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
  };

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

	var addComponent = GameObject.prototype.addComponent;
	export class SwitchComponent extends GameComponent {
		constructor (switchObject, switchProperty) {
			super();
			this.positiveComponents = [];
			this.negativeComponents = [];
			this.active = true;
			this.object = switchObject;
			this.prop = switchProperty;
		}

		addComponent (component){
			this.components = this.positiveComponents;
			addComponent.call(this, component);
			this.components  = undefined;
		}

		addPositiveComponent (component){
			this.components = this.positiveComponents;
			addComponent.call(this, component);
			this.components  = undefined;
		}

		addNegativeComponent (component){
			this.components = this.negativeComponents;
			addComponent.call(this, component);
			this.components  = undefined;
		}

		addComponents (positiveComponents, negativeComponents){
			positiveComponents.forEach(this.addPositiveComponent.bind(this));
			negativeComponents.forEach(this.addNegativeComponent.bind(this));
		}

		flip (active) {
			this.setActive(!this.active);
		}

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