import GameComponent from '../core/GameComponent';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';

export default class PointGravityComponent extends GameComponent {
    constructor (target) {
        super();
        this.target = target;
        this.vector = vec3.create();
    }

    update (parent, delta) {
        vec3.subtract(this.vector, this.target.position, parent.position);
        var scale = this.target.mass * delta / vec3.squaredLength(this.vector);
        vec3.normalize(this.vector, this.vector);
        vec3.scaleAndAdd(parent.velocity, parent.velocity, this.vector, scale);
    }
}
