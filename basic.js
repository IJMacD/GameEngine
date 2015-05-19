var GE = (function(GE){
	"GravityComponent:nomunge, PointGravityComponent: nomunge";

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;

	GameComponent.create(function GravityComponent(){},{
		update: function(parent, delta) {
			if(typeof parent.velocity[1] == "undefined")
				parent.velocity[1] = 0;
			parent.velocity[1] -= 0.0001*delta;
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
		},
		toHTML: function(){
			return "PointGravityComponent(" + this.target + ")";
		}
	});

	GameComponent.create(
		function MoveComponent () {},
		{
			update: function(parent, delta) {
				vec3.scaleAndAdd(parent.position, parent.position, parent.velocity, delta);
			}
		}
	);


	function RandomMotionComponent(){}
	GEC.RandomMotionComponent = RandomMotionComponent;
	RandomMotionComponent.prototype = new GameComponent();
	RandomMotionComponent.prototype.update = function(parent, delta) {
		if(Math.random()<0.001)
			vec3.random(parent.velocity, Math.random());
	};


	GameComponent.create(
		function RotationComponent (dth) {
			this.rotationSpeed = dth;
		}, {
			update: function(parent, delta) {
				parent.setRotation(parent.rotation + this.rotationSpeed * delta);
			}
		}
	);

	function AnimatedSpriteComponent(images, speed){
		this.images = images;
		this.delay = 1000 / speed;
		this.lastChange = 0;
		this.imageIndex = 0;
	}
	GEC.AnimatedSpriteComponent = AnimatedSpriteComponent;
	AnimatedSpriteComponent.prototype = new GameComponent();
	AnimatedSpriteComponent.prototype.update = function(parent, delta) {
		if(this.lastChange > this.delay){
			this.imageIndex = (this.imageIndex + 1) % this.images.length;
			parent.sprite = this.images[this.imageIndex];
			this.lastChange = 0;
		}
		else {
			this.lastChange += delta;
		}
	};

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

	GameComponent.create(function CounterRotationComponent(object) {
		this.target = object;
	}, {
		update: function(parent, delta) {
			parent.rotation = -this.target.rotation;
		}
	});

	return GE;
}(GE || {}));
