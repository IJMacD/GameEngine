var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;


	function DebugDrawPathComponent (renderSystem, object){
		this.path = [];
		this.pathSize = 1000;
		this.pathIndex = 0;
		this.lastVx = 0;
		this.lastVy = 0;
		this.renderSystem = renderSystem;
		if(object instanceof GE.GameObject)
			this.relativeTo = object.position;
		else
			this.relativeTo = vec2.create();
	}
	GEC.DebugDrawPathComponent = DebugDrawPathComponent;
	DebugDrawPathComponent.prototype = new GameComponent();
	DebugDrawPathComponent.prototype.update = function(parent, delta) {
		if(GE.DEBUG){
			// Draw Path
			var skip = this.pathIndex % this.pathSize,
				path = [parent.position[0], parent.position[1]];
			if(this.pathIndex > this.pathSize){
				for(var i = this.pathSize-1;i>=0;i--){
					var index = (i + skip + this.pathSize) % this.pathSize;
					path.push(this.path[index][0]+this.relativeTo[0],this.path[index][1]+this.relativeTo[1]);
				}
			}else{
				for(var i = this.pathIndex-1;i>=0;i--){
					path.push(this.path[i][0]+this.relativeTo[0],this.path[i][1]+this.relativeTo[1]);
				}
			}
			if(this.relativeTo[0])
				this.renderSystem.strokePath(path,"#CCF",0);
			else
				this.renderSystem.strokePath(path,"#CCC",0);
			this.pathIndex++;
			this.path[skip] = [parent.position[0]-this.relativeTo[0],parent.position[1]-this.relativeTo[1]];

			// Draw Velocity
			this.renderSystem.strokePath([parent.position[0], parent.position[1],
				parent.position[0]+parent.velocity[0]*100, parent.position[1]+parent.velocity[1]*100],
				"rgba(0,128,255,0.7)",0);

			// Draw Acceleration
			var ax = (parent.velocity[0] - this.lastVx)/delta,
				ay = (parent.velocity[1] - this.lastVy)/delta;
			this.lastVx = parent.velocity[0];
			this.lastVy = parent.velocity[1];
			this.renderSystem.strokePath([parent.position[0], parent.position[1],
				parent.position.x+ax*4e5, parent.position[1]+ay*4e5],
				"rgba(0,255,0,0.7)",0);
		}else{
			this.pathIndex = 0;
		}
	};

	return GE;
}(GE || {}));
