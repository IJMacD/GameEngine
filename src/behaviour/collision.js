import { GameObject, GameComponent } from '../core';
import { vec2, vec3 } from 'gl-matrix';

export class CollisionSystem extends GameObject {
	constructor () {
		super();

		this.attackObjects = [];
		this.vulnerableObjects = [];
	}

	addAttackObject (object){
		this.attackObjects.push(object);
	}

	addVulnerableObject (object){
		this.vulnerableObjects.push(object);
	}

	update (delta) {
		const attackCount = this.attackObjects.length;
		const vulnerableCount = this.vulnerableObjects.length;


		for(let i = 0; i < attackCount; i++){
			const attack = this.attackObjects[i];
			const ax = attack.position[0];
			const ay = attack.position[1];
			const ab = attack.bounds;
			const attackBounds = [
				ax + ab[0],
				ay + ab[1],
				ax + ab[2],
				ay + ab[3]
			];

			for(let j = 0; j < vulnerableCount; j++){
				const vulnerable = this.vulnerableObjects[j];
				const vx = vulnerable.position[0];
				const vy = vulnerable.position[1];
				const vb = vulnerable.bounds;
				const vulnerableBounds = [
					vx + vb[0],
					vy + vb[1],
					vx + vb[2],
					vy + vb[3]
				];

				if(attack === vulnerable) {
					continue;
				}

				if(attackBounds[0] < vulnerableBounds[2] &&
					attackBounds[1] < vulnerableBounds[3] &&
					attackBounds[2] > vulnerableBounds[0] &&
					attackBounds[3] > vulnerableBounds[1] ) {

					attack.fire("attack", vulnerable);
					vulnerable.fire("attackedBy", attack);
				}
			}
		}
		this.attackObjects.length = 0;
		this.vulnerableObjects.length = 0;
	};
}

/**
 * Component to interface with collision system. Handles both attack
 * and vulnerable configurations.
 * @class
 */
export class CollisionComponent extends GameComponent {

	/**
	 * @constructor
	 * @param {CollisionSystem} collisionSystem - Which CollisionSystem to report to
	 * @param {boolean} attack - Can this object attack?
	 * @param {boolean} vulnerable - Is this object vulnerable?
	 */
	constructor (collisionSystem, attack, vulnerable) {
		super();

		this.collisionSystem = collisionSystem;
		this.attack = attack;
		this.vulnerable = vulnerable;
	}
	update (parent, delta){
		if(this.attack)
			this.collisionSystem.addAttackObject(parent);

		if(this.vulnerable)
			this.collisionSystem.addVulnerableObject(parent);
	}
}

const sCBVdelta = vec3.create();
const sCBVmtd = vec3.create();
const sCBVv = vec3.create();
const sCBVmtdNorm = vec3.create();
const sCBVimpulse = vec3.create();
export class BounceComponent extends GameComponent {
	constructor () {
		super();
		this.cRestitution = 0.9;
	}

	init (parent) {
		parent.on("attack", other => {

			const aWidth = parent.bounds[2] - parent.bounds[0];
			const aHeight = parent.bounds[3] - parent.bounds[1];
			const bWidth = other.bounds[2] - other.bounds[0];
			const bHeight = other.bounds[3] - other.bounds[1];
			const aRad = (aWidth + aHeight) / 2;
			const bRad = (bWidth + bHeight) / 2;

			const minDist = (aRad + bRad) / 2;
            const curDist = vec3.dist(parent.position, other.position);

			if(curDist < minDist){
				// http://stackoverflow.com/q/345838
				// get the mtd
				vec3.subtract(sCBVdelta, parent.position, other.position);

				// minimum translation distance to push balls apart after intersecting
				vec3.scale(sCBVmtd, sCBVdelta, (minDist - curDist) / curDist);

				// resolve intersection --
				// inverse mass quantities
				const im1 = 1 / (parent.mass || 1);
				const im2 = 1 / (other.mass || 1);

				// push-pull them apart based off their mass
				vec3.scaleAndAdd(parent.position, parent.position, sCBVmtd, im1 / (im1 + im2));
				vec3.scaleAndAdd(other.position, other.position, sCBVmtd, -im2 / (im1 + im2));

				// impact speed
				vec3.subtract(sCBVv, parent.velocity, other.velocity);
				vec3.normalize(sCBVmtdNorm, sCBVmtd);
				const vn = vec3.dot(sCBVv, sCBVmtdNorm)

				// sphere intersecting but moving away from each other already
				if (vn > 0) return;

				// collision impulse
				const i = (-(1 + this.cRestitution) * vn) / (im1 + im2);
				vec3.scale(sCBVimpulse, sCBVmtdNorm, i);

				// change in momentum
				vec3.scaleAndAdd(parent.velocity, parent.velocity, sCBVimpulse, im1);
				vec3.scaleAndAdd(other.velocity, other.velocity, sCBVimpulse, -im2);
			}
		});
	}
}

	export function BackgroundCollisionSystem() {
		GameObject.call(this); // Remember parent constructor
		this.surfaces = [];
	}
	BackgroundCollisionSystem.prototype = new GameObject();
	BackgroundCollisionSystem.prototype.addSurface = function(surface) {
		this.surfaces.push(surface);
	};
	BackgroundCollisionSystem.prototype.addSurfaces = function(surfaces) {
		for(var i = 0; i < surfaces.length; i++){
			this.surfaces.push(surfaces[i]);
		}
	};
	BackgroundCollisionSystem.prototype.clearSurfaces = function(){
		this.surfaces.length = 0;
	};
	BackgroundCollisionSystem.prototype.update = function(delta) {
		// Background System updates
		GameObject.prototype.update.call(this, delta);
	};

	var u = vec2.create(),
			n = vec2.create(),
			w = vec2.create(),
			p = vec2.create(),
			r = vec2.create(),
			q = vec2.create(),
			s = vec2.create(),
			q_p = vec2.create(),
			v = vec2.create();

	export function BackgroundCollisionComponent(backgroundSystem, collisionBounds) {
		this.backgroundSystem = backgroundSystem;
		this.bounds = collisionBounds;
	}
	BackgroundCollisionComponent.prototype = new GameComponent();
	BackgroundCollisionComponent.prototype.update = function(parent, delta)
	{
		// This logic should probably be moved to BackgroundCollisionSystem
		var surfaces = this.backgroundSystem.surfaces,
			j = 0,
			m = surfaces.length,
			c, l,
			i,
			p_t,
			p_u,
			//theta,
			f = 0.95,
			e = 0.4,
			parentX = parent.position[0],
			parentY = parent.position[1];
		if(this.lastX &&
				Math.abs(this.lastX - parentX) < 100 &&
				Math.abs(this.lastY - parentY) < 100){
			for(;j<m;j++){
				c = surfaces[j],
				l = c.length;
				for(i=0; i<l-3;i+=2)
				{
					// http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
					vec2.set(p, c[i  ], c[i+1]);
					vec2.set(r, c[i+2], c[i+3]);
					vec2.subtract(r, r, p);
					vec2.set(q, this.lastX, this.lastY);
					vec2.subtract(s, parent.position, q);
					//theta = s.angle();
					//s.add(0,this.bounds*Math.cos(theta));
					vec2.subtract(q_p, q, p);
					p_t = cross(q_p, s) / cross(r, s);
					p_u = cross(q_p, r) / cross(r, s);
					if(p_t >= 0 && p_t <= 1 && p_u >= 0 && p_u <= 1)
					{
						parent.position[0] = this.lastX;
						parent.position[1] = this.lastY;
						// http://stackoverflow.com/questions/573084/how-to-calculate-bounce-angle
						vec2.set(n, -r[1], r[0]); // this is the normal to the surface
						vec2.normalize(n, n);
						vec2.copy(v, parent.velocity);
						vec2.scale(u, n, vec2.dot(n, v));
						vec2.subtract(w, v, u);
						vec2.scale(w, w, f);
						vec2.scale(u, u, e);
						vec2.subtract(parent.velocity, w, u);
						break;
					}
				}
			}
		}
		this.lastX = parent.position[0];
		this.lastY = parent.position[1];
	};

	function cross(a, b){
		return a[0]*b[1] - a[1]*b[0];
	}

	export function DrawSurfacesComponent(renderSystem, colour){
		this.renderSystem = renderSystem;
		this.colour = colour || "#000";
	}
	GameComponent.create(DrawSurfacesComponent,{
		update: function(parent, delta){
			var s = parent.surfaces,
				j = 0,
				m = s.length,
				i, c, l;
			for(; j<m; j++){
				this.renderSystem.strokePath(s[j], parent.colour || this.colour);
			}

			// Draw Normals
			if(GE.DEBUG){
				for(j=0; j<m; j++){
					c = parent.surfaces[j];
					l = c.length;
					for(i=0;i<l-3;i+=2){
						var x1 = c[i],
							y1 = c[i+1],
							x2 = c[i+2],
							y2 = c[i+3],
							dx = x2 - x1,
							dy = y2 - y1,
							mx = x1 + dx * 0.5,
							my = y1 + dy * 0.5,
							nx = dy / Math.sqrt(dy * dy + dx * dx),
							ny = -dx / Math.sqrt(dy * dy + dx * dx);
						this.renderSystem.strokePath([mx,my,mx+nx*30,my+ny*30],'#08f');
					}
				}
			}
		}
	});
