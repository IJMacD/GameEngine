var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	function WorldSystem(bounds){
		this.bounds = bounds;
	}
	GE.WorldSystem = WorldSystem;
	WorldSystem.prototype = new GE.GameObject();

	var WorldBounceComponent = GE.Comp.WorldBounceComponent = function WorldBounceComponent (worldSystem, width, height) {
		this.worldSystem = worldSystem;
		this.ax = width / 2;
		this.ay = height / 2;
	};

	WorldBounceComponent.prototype = new GE.GameComponent();

	WorldBounceComponent.prototype.update = function(parent, delta) {
		var coef = 0.9,
				friction = 0.9;

		this.bx1 = this.worldSystem.bounds[0] + this.ax;
		this.by1 = this.worldSystem.bounds[1] + this.ay;
		this.bx2 = this.worldSystem.bounds[2] - this.ax;
		this.by2 = this.worldSystem.bounds[3] - this.ay;

		if(parent.position[0] < this.bx1){
			parent.position[0] = this.bx1;
			parent.velocity[0] = -parent.velocity[0]*coef;
			parent.velocity[1] = parent.velocity[1]*friction;
		}
		else if(parent.position[0] > this.bx2){
			parent.position[0] = this.bx2;
			parent.velocity[0] = -parent.velocity[0]*coef;
			parent.velocity[1] = parent.velocity[1]*friction;
		}
		if(parent.position[1] < this.by1){
			parent.position[1] = this.by1;
			parent.velocity[1] = -parent.velocity[1]*coef;
			parent.velocity[0] = parent.velocity[0]*friction;
		}
		else if(parent.position[1] > this.by2){
			parent.position[1] = this.by2;
			parent.velocity[1] = -parent.velocity[1]*coef;
			parent.velocity[0] = parent.velocity[0]*friction;
		}
	};

	var WorldWrapComponent = GE.Comp.WorldWrapComponent = function WorldWrapComponent (worldSystem) {
		this.worldSystem = worldSystem;
	};

	WorldWrapComponent.prototype = new GE.GameComponent();

	WorldWrapComponent.prototype.update = function(parent, delta) {
		this.ax = this.worldSystem.bounds[0];
		this.ay = this.worldSystem.bounds[1];
		this.bx = this.worldSystem.bounds[2];
		this.by = this.worldSystem.bounds[3];
		this.az = this.worldSystem.bounds[4];
		this.bz = this.worldSystem.bounds[5];

		if(parent.position[0] < this.ax){
			parent.position[0] = this.bx;
		}
		else if(parent.position[0] > this.bx){
			parent.position[0] = this.ax;
		}
		if(parent.position[1] < this.ay){
			parent.position[1] = this.by;
		}
		else if(parent.position[1] > this.by){
			parent.position[1] = this.ay;
		}
		if(parent.position[2] < this.az){
			parent.position[2] = this.bz;
		}
		else if(parent.position[2] > this.bz){
			parent.position[2] = this.az;
		}
	};

	return GE;
}(GE || {}));
