var GE = (function(GE){
	"GravityComponent:nomunge, PointGravityComponent: nomunge";

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

  GE.GameComponent.create(function PositionInterpolatorComponent(duration) {
    this.duration = duration;
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
        var t = this.elapsed / this.duration;
        if(t > 1){
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
		update: function(parent, delta) {
			var i = 0,
					l;
			if(this.object[this.prop]){
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
