import GameComponent from '../core/GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

const diff = vec3.create();

export default class SmoothPositionComponent extends GameComponent {
    constructor () {
        super();
        this.speed = 0.01;
    }

    update (parent, delta) {
        super.update(this, delta);

        const position = parent.position;
        const target = this.position;
        const speed = this.speed;

        vec3.subtract(diff, target, position);
        vec3.scaleAndAdd(parent.position, position, diff, delta * speed);
    }
}
