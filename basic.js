var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;

	GameComponent.create(function GravityComponent(){},{
		update: function(parent, delta) {
			if(typeof parent.velocity.y == "undefined")
				parent.velocity.y = 0;
			parent.velocity.y += 0.0001*delta;
		}
	});

	GameComponent.create(function PointGravityComponent (target) {
		this.target = target;
		this.vector = new Vector2();
	}, {
		update: function(parent, delta) {
			var vec = this.vector.set(this.target.position).subtract(parent.position),
				scalar = Math.min(this.target.mass*delta/vec.magnitude2(),0.1);
			vec.normalise();
			vec.scale(scalar);
			parent.velocity.add(vec);
		}
	});

	function MoveComponent () {
		this.delta = new Vector2();
	};
	GEC.MoveComponent = MoveComponent;
	MoveComponent.prototype = new GameComponent();
	MoveComponent.prototype.update = function(parent, delta) {
		this.delta.set(parent.velocity).scale(delta);
		parent.position.add(this.delta);
	};


	function RandomMotionComponent(){}
	GEC.RandomMotionComponent = RandomMotionComponent;
	RandomMotionComponent.prototype = new GameComponent();
	RandomMotionComponent.prototype.update = function(parent, delta) {
		if(Math.random()<0.001)
			parent.velocity.set(Math.random()-0.5, Math.random()-0.5);
	};


	function RotationComponent (dth) {
		this.rotationSpeed = dth;
	};
	GEC.RotationComponent = RotationComponent;
	RotationComponent.prototype = new GameComponent();
	RotationComponent.prototype.update = function(parent, delta) {
		parent.setRotation(parent.rotation + this.rotationSpeed * delta);
	};

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
			parent.position.set(this.target.position);
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
