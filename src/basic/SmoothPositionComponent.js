import GameComponent from '../core/GameComponent';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';

const diff = vec3.create();

export default class SmoothPositionComponent extends GameComponent {
    constructor () {
        super();
        this.speed = 0.01;
        this.lastPosition = vec3.create();
    }

    update (parent, delta) {
        super.update(this, delta);

        const target = this.position;
        const speed = this.speed;

        // If the object isn't where we left it then that's the new target
        if (!vec3.equals(this.lastPosition, parent.position)) {
            vec3.copy(target, parent.position);
        }

        if (!vec3.equals(this.lastPosition, target)) {
            vec3.subtract(diff, target, this.lastPosition);
            vec3.scaleAndAdd(parent.position, this.lastPosition, diff, delta * speed);

            vec3.copy(this.lastPosition, parent.position);
        }
    }
}
