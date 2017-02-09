import GameComponent from '../core/GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

export default class RandomPositionComponent extends GameComponent {
    constructor (world, probability=0.001) {
        super();

        this.world = world;
        this.probability = probability;
    }

    update (parent, delta) {
        if(Math.random() < this.probability) {
            const b = this.world.bounds;
            const x = Math.random() * (b[2] - b[0]);
            const y = Math.random() * (b[3] - b[1]);
            const z = Math.random() * (b[5] - b[4]);
            vec3.set(parent.position, x, y, z);
        }
    }
}
