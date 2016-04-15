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
		parent.targetRotation = Math.atan2(parent.velocity[1], parent.velocity[0]) + Math.PI / 2;
	};

	GameComponent.create(function RotationInterpolatorComponent() {}, {
		update: function(parent, delta) {
			var rotation = parent.rotation,
					target = parent.targetRotation,
					diff = target - rotation,
					speed = 0.01;
			if(diff > Math.PI){
				diff -= Math.PI * 2;
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
