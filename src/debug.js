import { GameComponent } from './core';

export function DebugDrawPathComponent (renderSystem, object){
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
		this.renderSystem.strokePath([px, py, px+vx*100, py+vy*100], "rgba(0,128,255,0.7)",0);

		// Draw Acceleration
		this.renderSystem.strokePath([px, py, px+ax*4e5, py+ay*4e5], "rgba(0,255,0,0.7)",0);
		this.lastVx = vx;
		this.lastVy = vy;
	}else{
		this.pathIndex = 0;
	}
};

export class DebugDrawBoundsComponent extends GameComponent {

	/**
	 * @param {CanvasRenderSystem} renderSystem - A target to draw to.
	 */
	constructor (renderSystem) {
		super();

		this.renderSystem = renderSystem;
	}

	update (parent, delta) {
		const bounds = parent.bounds;
		if(bounds){
			this.renderSystem.push(ctx => {
				ctx.translate(parent.position[0], parent.position[1]);
				ctx.beginPath();
				ctx.rect(parent.bounds[0], parent.bounds[1], parent.bounds[2] - parent.bounds[0], parent.bounds[3] - parent.bounds[1]);
				ctx.strokeStyle = "#000";
				ctx.stroke();
			});
		}
	}
}