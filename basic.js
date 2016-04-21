var GE = (function(GE){
	"GravityComponent:nomunge, PointGravityComponent: nomunge, PositionInterpolatorComponent: nomunge";

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;

	GE.GRAVITATIONAL_CONSTANT = 0.0003;

	GameComponent.create(function GravityComponent(){},{
		update: function(parent, delta) {
			if(typeof parent.velocity[1] == "undefined")
				parent.velocity[1] = 0;
			parent.velocity[1] += GE.GRAVITATIONAL_CONSTANT*delta;
		}
	});

	GameComponent.create(function PointGravityComponent (target) {
		this.target = target;
		this.vector = vec3.create();
	}, {
		update: function(parent, delta) {
			vec3.subtract(this.vector, this.target.position, parent.position);
			var scale = this.target.mass*delta/vec3.squaredLength(this.vector);
			vec3.normalize(this.vector, this.vector);
			vec3.scaleAndAdd(parent.velocity, parent.velocity, this.vector, scale);
		}
	});

	function MoveComponent () {};
	GEC.MoveComponent = MoveComponent;
	MoveComponent.prototype = new GameComponent();
	MoveComponent.prototype.update = function(parent, delta) {
		vec3.scaleAndAdd(parent.position, parent.position, parent.velocity, delta);
	};

	GE.GameComponent.create(function PhysicsComponent(){ }, {
		update: function(parent, delta) {
			if(parent.impulse){
				vec2.add(parent.velocity, parent.velocity, parent.impulse);
				vec2.set(parent.impulse, 0, 0);
			}
		}
	});

	function RandomMotionComponent(){}
	GEC.RandomMotionComponent = RandomMotionComponent;
	RandomMotionComponent.prototype = new GameComponent();
	RandomMotionComponent.prototype.update = function(parent, delta) {
		if(Math.random()<0.001)
			vec3.random(parent.velocity, Math.random());
	};


	function RotationComponent (dth) {
		this.rotationSpeed = dth;
	}
	GEC.RotationComponent = RotationComponent;
	RotationComponent.prototype = new GameComponent();
	RotationComponent.prototype.update = function(parent, delta) {
		parent.setRotation(parent.rotation + this.rotationSpeed * delta);
	};

	function RotateToHeadingComponent () {}
	GEC.RotateToHeadingComponent = RotateToHeadingComponent;
	RotateToHeadingComponent.prototype = new GameComponent();
	RotateToHeadingComponent.prototype.update = function(parent, delta) {
		parent.targetRotation = Math.atan2(parent.velocity[0], -parent.velocity[1]);
	};

  GE.GameComponent.create(function PositionInterpolatorComponent(duration, easing) {
    this.duration = duration;
    this.easing = (easing == undefined) ? GEC.PositionInterpolatorComponent.linear : easing;
    this.elapsed = 0;
    this.running = false;
    this.starting = false;
    this.start = vec3.create();
    this.target = vec3.create();
  }, {
    update: function(parent, delta) {
      // The first frame we run after being told to interpolate somewhere
      // we need to gather some information from our parent
      if(this.starting){

        // If any co-ordinate is NaN this means the consumer wants to
        // retain those values from the parent
        if(isNaN(this.target[0])) this.target[0] = parent.position[0];
        if(isNaN(this.target[1])) this.target[1] = parent.position[1];
        if(isNaN(this.target[2])) this.target[2] = parent.position[2];

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
          vec3.copy(parent.position, this.target);
          this.running = false;
        }
        else {
          vec3.lerp(parent.position, this.start, this.target, t);
          this.elapsed += delta;
        }
      }
    },
    setPosition: function(x, y, z) {
      vec3.set(this.target, x, y, z);
      this.starting = true;
    }
  });
  GEC.PositionInterpolatorComponent.linear = function (t) { return t };
  GEC.PositionInterpolatorComponent.quadIn = function (t) { return t*t };
  GEC.PositionInterpolatorComponent.quadOut = function (t) { return -t*(t-2) };
  GEC.PositionInterpolatorComponent.circIn = function (t) { return 1-Math.sqrt(1-t*t) };
  GEC.PositionInterpolatorComponent.circOut = function (t) { return Math.sqrt(1-(t-1)*(t-1)) };
  GEC.PositionInterpolatorComponent.smooth = function (t) { return t*t*(3-2*t) };
  // Stolen from Dojo:
  // https://github.com/dojo/dwb/blob/master/src/main/webapp/js/build/amd_loader/fx/easing.js
  GEC.PositionInterpolatorComponent.backIn = function (t) {
    var s = 1.70158;
    return t * t * ((s + 1) * t - s);
  };
  GEC.PositionInterpolatorComponent.backOut = function (t) {
    var s = 1.70158;
    t = t - 1;
    return t*t*((s+1)*t + s) + 1;
  };
  GEC.PositionInterpolatorComponent.backInOut = function (t) {
    var s = 1.70158 * 1.525;
    t = t * 2;
    if(t < 1){ return (Math.pow(t, 2) * ((s + 1) * t - s)) / 2; }
    t-=2;
    return (Math.pow(t, 2) * ((s + 1) * t + s) + 2) / 2;
  };
  GEC.PositionInterpolatorComponent.elasticIn = function(n){
    if(n == 0 || n == 1){ return n; }
    var p = .3;
    var s = p / 4;
    n = n - 1;
    return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
  };
  GEC.PositionInterpolatorComponent.elasticOut = function(n){
    if(n==0 || n == 1){ return n; }
    var p = .3;
    var s = p / 4;
    return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
  };

	GameComponent.create(function RotationInterpolatorComponent() {}, {
		update: function(parent, delta) {
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
	});

	GameComponent.create(function FollowComponent(object) {
		this.target = object;
	}, {
		update: function(parent, delta) {
			vec3.copy(parent.position, this.target.position);
		}
	});
	GameComponent.create(function FollowAtDistanceComponent(object, distance) {
		this.target = object;
		this.distance = distance;
	}, {
		update: function(parent, delta) {
			vec3.add(parent.position, this.target.position, this.distance);
		}
	});

	GameComponent.create(function TrackRotationComponent(object) {
		this.target = object;
	}, {
		update: function(parent, delta) {
			parent.rotation = this.target.rotation + Math.PI;
		}
	});

	GameComponent.create(function CounterRotationComponent(object) {
		this.target = object;
	}, {
		update: function(parent, delta) {
			parent.rotation = -this.target.rotation;
		}
	});

	GameComponent.create(function SwitchComponent(switchObject, switchProperty) {
		this.positiveComponents = [];
		this.negativeComponents = [];
		this.active = true;
		this.object = switchObject;
		this.prop = switchProperty;
	}, {
		addComponent: function(component){
			this.positiveComponents.push(component);
		},
		addPositiveComponent: function(component){
			this.positiveComponents.push(component);
		},
		addNegativeComponent: function(component){
			this.negativeComponents.push(component);
		},
		addComponents: function(positiveComponents, negativeComponents){
			this.positiveComponents.push.apply(this.positiveComponents, positiveComponents);
			this.negativeComponents.push.apply(this.negativeComponents, negativeComponents);
		},
		flip: function (active) {
			this.setActive(!this.active);
		},
		setActive: function (active) {
			this.active = active;

			if(this.object){
				this.object[this.prop] = this.active;
			}
		},
		update: function(parent, delta) {
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
	});

	return GE;
}(GE || {}));
