import GameComponent from '../core/GameComponent';
import { vec3 } from 'gl-matrix';

const sCBVdelta = vec3.create();
const sCBVmtd = vec3.create();
const sCBVv = vec3.create();
const sCBVmtdNorm = vec3.create();
const sCBVimpulse = vec3.create();

/**
 * Component which allows collided objects to bounce off one-another. Respects
 * conservation of momentum.
 * @class BounceComponent
 * @extends {GameComponent}
 */
export default class BounceComponent extends GameComponent {
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
