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
			var px = parent.position[0],
				py = parent.position[1],
				vx = parent.velocity[0],
				vy = parent.velocity[1],
				ax = (vx - this.lastVx)/delta,
				ay = (vy - this.lastVy)/delta,
				rx = this.relativeTo[0],
				ry = this.relativeTo[1],
				skip = this.pathIndex % this.pathSize,
				path = [px, py],
				i,
				index;

			// Draw Path
			// TODO: 1. Check for jumps, don't show
			// TODO: 2. Don't use strokePath helper -- very inefficient
			if(this.pathIndex > this.pathSize){
				for(i = this.pathSize-1;i>=0;i--){
					index = (i + skip + this.pathSize) % this.pathSize;
					path.push(
						this.path[index][0]+rx,
						this.path[index][1]+ry
					);
				}
			}else{
				for(i = this.pathIndex-1;i>=0;i--){
					path.push(
						this.path[i][0]+rx,
						this.path[i][1]+ry
					);
				}
			}

			if(rx || ry)
				this.renderSystem.strokePath(path,"#CCF",0);
			else
				this.renderSystem.strokePath(path,"#CCC",0);

			this.pathIndex++;
			this.path[skip] = [px-rx,py-ry];

			// Draw Velocity
			this.renderSystem.strokePath([px, py, px+vx*500, py+vy*500], "rgba(0,128,255,0.7)",0);

			// Draw Acceleration
			this.renderSystem.strokePath([px, py, px+ax*1e6, py+ay*1e6], "rgba(0,255,0,0.7)",0);
			this.lastVx = vx;
			this.lastVy = vy;
		}else{
			this.pathIndex = 0;
		}
	};

	var DebugDrawDataComponentCount = 0;
	function DebugDrawDataComponent(renderSystem, desc) {
		this.renderSystem = renderSystem;
		this.desc = desc;
		this.xOffset = DebugDrawDataComponentCount * 70 + 10;
		DebugDrawDataComponentCount++;
		this.maxD = this.maxV = this.maxA = 0;
	}
	GEC.DebugDrawDataComponent = DebugDrawDataComponent;
	DebugDrawDataComponent.prototype = new GameComponent();
	DebugDrawDataComponent.prototype.update = function(parent, delta) {
		var self = this,
				ax = parent.acceleration[0].toFixed(6),
				ay = parent.acceleration[1].toFixed(6),
				a = vec3.length(parent.acceleration).toFixed(6);
		self.maxD = Math.max(self.maxD, vec3.length(parent.position));
		self.maxV = Math.max(self.maxV, vec3.length(parent.velocity));
		self.maxA = Math.max(self.maxA, vec3.length(parent.acceleration));
		if(GE.DEBUG){
			this.renderSystem.push(function (context) {
				context.fillStyle = "#999";
				context.font = "24px sans-serif";
				var y = 0,
						dy = 28;
				if(typeof self.desc == "string")
					context.fillText(self.desc, self.xOffset, y+=dy);
				context.fillText("x: " + parent.position[0].toFixed(), self.xOffset, y+=dy);
				context.fillText("y: " + parent.position[1].toFixed(), self.xOffset, y+=dy);
				context.fillText("d: " + vec3.length(parent.position).toFixed(), self.xOffset, y+=dy);
				context.fillText("vx: " + parent.velocity[0].toFixed(3), self.xOffset, y+=dy);
				context.fillText("vy: " + parent.velocity[1].toFixed(3), self.xOffset, y+=dy);
				context.fillText("v: " + vec3.length(parent.velocity).toFixed(3), self.xOffset, y+=dy);
				context.fillText("ax: " + ax, self.xOffset, y+=dy);
				context.fillText("ay: " + ay, self.xOffset, y+=dy);
				context.fillText("a: " + a, self.xOffset, y+=dy);
				context.fillText("max d: " + self.maxD.toFixed(), self.xOffset, y+=dy);
				context.fillText("max v: " + self.maxV.toFixed(3), self.xOffset, y+=dy);
				context.fillText("max a: " + self.maxA.toFixed(6), self.xOffset, y+=dy);
			}, -1);
		}
	};

	return GE;
}(GE || {}));
