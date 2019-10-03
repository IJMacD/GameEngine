import GameComponent from '../core/GameComponent';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';

export default class RandomVelocityComponent extends GameComponent {
    constructor (probability=0.001, maximumVelocity = 0.1) {
        super();

        this.probability = probability;
        this.maximumVelocity = maximumVelocity;
    }

    update (parent, delta) {
        if(Math.random()<this.probability)
            vec3.random(parent.velocity, Math.random() * this.maximumVelocity);
    }
}
