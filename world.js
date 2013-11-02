var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var WorldBounceComponent = GE.Comp.WorldBounceComponent = function WorldBounceComponent (width, height, bounds) {
		this.ax = width / 2;
		this.ay = height / 2;
		this.bx1 = bounds[0] + this.ax;
		this.by1 = bounds[1] + this.ay;
		this.bx2 = bounds[2] - this.ax;
		this.by2 = bounds[3] - this.ay;
	};

	WorldBounceComponent.prototype = new GE.GameComponent();

	WorldBounceComponent.prototype.update = function(parent, delta) {
		var coef = 0.3,
			friction = 0.3;
		if(parent.position.x < this.bx1){
			parent.position.x = this.bx1;
			parent.velocity.x = -parent.velocity.x*coef;
			parent.velocity.y = parent.velocity.y*friction;
		}
		else if(parent.position.x > this.bx2){
			parent.position.x = this.bx2;
			parent.velocity.x = -parent.velocity.x*coef;
			parent.velocity.y = parent.velocity.y*friction;
		}
		if(parent.position.y < this.by1){
			parent.position.y = this.by1;
			parent.velocity.y = -parent.velocity.y*coef;
			parent.velocity.x = parent.velocity.x*friction;
		}
		else if(parent.position.y > this.by2){
			parent.position.y = this.by2;
			parent.velocity.y = -parent.velocity.y*coef;
			parent.velocity.x = parent.velocity.x*friction;
		}
	};

	var WorldWrapComponent = GE.Comp.WorldWrapComponent = function WorldWrapComponent (bounds) {
		this.ax = bounds[0];
		this.ay = bounds[1];
		this.bx = bounds[2];
		this.by = bounds[3];
	};

	WorldWrapComponent.prototype = new GE.GameComponent();

	WorldWrapComponent.prototype.update = function(parent, delta) {
		if(parent.position.x < this.ax){
			parent.position.x = this.bx;
		}
		else if(parent.position.x > this.bx){
			parent.position.x = this.ax;
		}
		if(parent.position.y < this.ay){
			parent.position.y = this.by;
		}
		else if(parent.position.y > this.by){
			parent.position.y = this.ay;
		}
	};

	return GE;
}(GE || {}));