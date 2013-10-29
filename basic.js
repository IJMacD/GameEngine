var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;

	function GravityComponent () {}
	GEC.GravityComponent = GravityComponent;
	GravityComponent.prototype = new GameComponent();
	GravityComponent.prototype.update = function(parent, delta) {
		if(typeof parent.velocity.y == "undefined")
			parent.velocity.y = 0;
		parent.velocity.y += 0.0001*delta;
	};

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

	function PointGravityComponent (target) {
		this.target = target;
		this.vector = new Vector2();
	}
	GEC.PointGravityComponent = PointGravityComponent;
	PointGravityComponent.prototype = new GameComponent();
	PointGravityComponent.prototype.update = function(parent, delta) {
		var vec = this.vector.set(this.target.position).subtract(parent.position),
			scalar = Math.min(this.target.mass*delta/vec.magnitude2(),0.1);
		vec.normalise();
		vec.scale(scalar);
		parent.velocity.add(vec);
	};


	function RotationComponent (dth) {
		this.rotationSpeed = dth;
	};
	GEC.RotationComponent = RotationComponent;
	RotationComponent.prototype = new GameComponent();
	RotationComponent.prototype.update = function(parent, delta) {
		parent.setRotation(parent.rotation + this.rotationSpeed * delta);
	};

	return GE;
}(GE || {}));
