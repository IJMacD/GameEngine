var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameObject = GE.GameObject,
		GameComponent = GE.GameComponent;

	function WorldSystem(bounds){
		this.bounds = bounds;
	}
	GE.WorldSystem = WorldSystem;
	WorldSystem.prototype = new GE.GameObject();

	function WorldBounceComponent (worldSystem, width, height) {
		this.worldSystem = worldSystem;
		this.ax = (width || 0) / 2;
		this.ay = (height || 0) / 2;
	}
	GE.Comp.WorldBounceComponent = WorldBounceComponent;

	WorldBounceComponent.prototype = new GE.GameComponent();

	WorldBounceComponent.prototype.update = function(parent, delta) {
		var coef = 0.4,
			friction = 0.9;
			
		if(parent.bounds){
			this.bx1 = this.worldSystem.bounds[0] + parent.bounds[0];
			this.by1 = this.worldSystem.bounds[1] + parent.bounds[1];
			this.bx2 = this.worldSystem.bounds[2] + parent.bounds[2];
			this.by2 = this.worldSystem.bounds[3] + parent.bounds[3];
		}
		else{
			this.bx1 = this.worldSystem.bounds[0] + this.ax;
			this.by1 = this.worldSystem.bounds[1] + this.ay;
			this.bx2 = this.worldSystem.bounds[2] - this.ax;
			this.by2 = this.worldSystem.bounds[3] - this.ay;
		}


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

	function WorldWrapComponent (worldSystem) {
		this.worldSystem = worldSystem;
	}
	GE.Comp.WorldWrapComponent = WorldWrapComponent;

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

	GameComponent.create(function DrawBoundsComponent(renderSystem){
		this.renderSystem = renderSystem;
	},{
		update: function(parent, delta){
			var b = parent.bounds,
				x = parent.position[0],
				y = parent.position[1];
			this.renderSystem.strokePath([
				b[0] + x, b[1] + y,
				b[0] + x, b[3] + y, 
				b[2] + x, b[3] + y, 
				b[2] + x, b[1] + y, 
				b[0] + x, b[1] + y
			]);
		}
	});

	return GE;
}(GE || {}));
