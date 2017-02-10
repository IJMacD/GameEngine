import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';
import vec2 from 'gl-matrix/src/gl-matrix/vec2';
import BackgroundSystem from './BackgroundCollisionSystem';

const u = vec2.create();
const n = vec2.create();
const w = vec2.create();
const p = vec2.create();
const r = vec2.create();
const q = vec2.create();
const s = vec2.create();
const q_p = vec2.create();
const v = vec2.create();

/**
 * Component which interacts with the background system to bounce an object off surfaces.
 * @extends {GameComponent}
 * @param {BackgroundCollisionSystem} backgroundSystem - Where can I find surfaces to collide with.
 * @param {array} collisionBounds - Default bounds array for the parent object
 * @memberof Collision
 */
export default class BackgroundCollisionComponent extends GameComponent {

	static COEFFICIENT_FRICTION = 0.95;
	static COEFFICIENT_RESTITUTION = 0.4;

	background: BackgroundSystem;
	bounds: number[];
	coefficientFriction = BackgroundCollisionComponent.COEFFICIENT_FRICTION;
	coefficientRestitution = BackgroundCollisionComponent.COEFFICIENT_RESTITUTION;

	constructor (backgroundSystem, collisionBounds) {
		super();
		this.background = backgroundSystem;
		this.bounds = collisionBounds;
	}

	update (parent: GameObject, delta: number) {
		// This logic should probably be moved to BackgroundCollisionSystem
		var surfaces = this.background.surfaces,
			j = 0,
			m = surfaces.length,
			c, l,
			i,
			p_t,
			p_u,
			//theta,
			f = this.coefficientFriction,
			e = this.coefficientRestitution,
			parentX = parent.position[0],
			parentY = parent.position[1],
			lastPosition = this.position;
		if(lastPosition[0] &&
				Math.abs(lastPosition[0] - parentX) < 100 &&
				Math.abs(lastPosition[1] - parentY) < 100){
			for(;j<m;j++){
				c = surfaces[j],
				l = c.length;
				for(i=0; i<l-3;i+=2)
				{
					// http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
					vec2.set(p, c[i  ], c[i+1]);
					vec2.set(r, c[i+2], c[i+3]);
					vec2.subtract(r, r, p);
					vec2.copy(q, lastPosition);
					vec2.subtract(s, parent.position, q);
					//theta = s.angle();
					//s.add(0,this.bounds*Math.cos(theta));
					vec2.subtract(q_p, q, p);
					p_t = cross(q_p, s) / cross(r, s);
					p_u = cross(q_p, r) / cross(r, s);
					if(p_t >= 0 && p_t <= 1 && p_u >= 0 && p_u <= 1)
					{
						vec2.copy(parent.position, lastPosition)
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
		vec2.copy(parent.position, lastPosition);
	}
}

function cross(a, b){
    return a[0]*b[1] - a[1]*b[0];
}
