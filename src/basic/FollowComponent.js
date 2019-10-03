import GameComponent from '../core/GameComponent';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * Track another object's position
 * Also works like old FollowAtDistnaceComponent by setting a position on this component
 * @param {GameObject} object - Target object to follow
 */
export default class FollowComponent extends GameComponent {
    constructor (object) {
        super();
        this.target = object;
    }

    update (parent, delta) {
        vec3.add(parent.position, this.target.position, this.position);
    }

    setTarget (object) {
        this.target = object;
    }
}
