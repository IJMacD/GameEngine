import GameComponent from '../core/GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * Match a target object's rotation
 *
 * Rotation can bbe offset by setting this component's rotation as well
 * @param {GameObject} object - Target object
 */
export default class TrackRotationComponent extends GameComponent {
    constructor (object) {
        super();
        this.target = object;
    }

    update (parent, delta) {
        parent.rotation = this.target.rotation + this.rotation;
    }
}
