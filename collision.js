import { GameObject, GameComponent } from './core';
import { vec2 } from 'gl-matrix';

	export default function CollisionSystem(collisionCallback) {
		GameObject.call(this); // Remember parent constructor
		this.attackBounds = [];
		this.vulnerableBounds = [];
		this.callback = collisionCallback;
	}
	CollisionSystem.prototype = new GameObject();
	CollisionSystem.prototype.addAttackBounds = function(bounds){
		this.attackBounds.push(bounds);
	};
	CollisionSystem.prototype.addVulnerableBounds = function(bounds){
		this.vulnerableBounds.push(bounds);
	};
	CollisionSystem.prototype.update = function (delta) {
		var i = 0,
			l = this.attackBounds.length,
			j = 0,
			m = this.vulnerableBounds.length,
			attack,
			vulnerable;
		for(; i < l; i++){
			attack = this.attackBounds[i];
			for(j = 0; j < m; j++){
				vulnerable = this.vulnerableBounds[j];

				if(attack[0] < vulnerable[2] &&
					attack[1] < vulnerable[3] &&
					attack[2] > vulnerable[0] &&
					attack[3] > vulnerable[1] &&
					this.callback
				){
					// Would probably be more useful to be able to send a GameObject back
					this.callback(attack, vulnerable);
				}
			}
		}
		this.attackBounds.length = 0;
		this.vulnerableBounds.length = 0;
	};

	export function AttackCollisionComponent(collisionSystem) {
		this.collisionSystem = collisionSystem;
	}
	GameComponent.create(AttackCollisionComponent,
	{
		update: function(parent, delta){
			var x = parent.position[0],
				y = parent.position[1],
				bounds = parent.bounds;
			this.collisionSystem.addAttackBounds([
				x + bounds[0],
				y + bounds[1],
				x + bounds[2],
				y + bounds[3]
			]);
		}
	});

	export function VulnerableCollisionComponent(collisionSystem) {
		this.collisionSystem = collisionSystem;
	}
	GameComponent.create(VulnerableCollisionComponent,
	{
		update: function(parent, delta){
			var x = parent.position[0],
				y = parent.position[1],
				bounds = parent.bounds;
			this.collisionSystem.addVulnerableBounds([
				x + bounds[0],
				y + bounds[1],
				x + bounds[2],
				y + bounds[3]
			]);
		}
	});

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
