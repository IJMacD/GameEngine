import GameComponent from '../core/GameComponent';

const GRAVITATIONAL_CONSTANT = 0.0003;

/**
 * Objects with this component will fall to the floor.
 * @class GravityComponent
 */
export default class GravityComponent extends GameComponent {
    update (parent, delta) {
        if(typeof parent.velocity[1] == "undefined")
            parent.velocity[1] = 0;
        parent.velocity[1] += GRAVITATIONAL_CONSTANT * delta;
    }
}
