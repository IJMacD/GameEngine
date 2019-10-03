import GameComponent from '../core/GameComponent';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';

export default class RandomImpulseComponent extends GameComponent {
    constructor (probability=0.001, maximumImpulse = 0.1) {
        super();

        this.probability = probability;
        this.maximumImpulse = maximumImpulse;
    }

    init (parent) {
        parent.impulse = parent.impulse || vec3.create();
    }

    update (parent, delta) {
        if(Math.random()<this.probability) {
            vec3.random(parent.impulse, Math.random() * this.maximumImpulse);
            parent.fire("impulse");
        }
    }
}
