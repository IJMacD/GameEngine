import GameComponent from '../core/GameComponent';

export default GravityComponent;

/**
 * Objects with this component will fall to the floor.
 * @extends {GameComponent}
 * @memberof Behaviour
 */
class GravityComponent extends GameComponent {
    update (parent, delta) {
        if(typeof parent.velocity[1] == "undefined")
            parent.velocity[1] = 0;
        parent.velocity[1] += GravityComponent.GRAVITATIONAL_CONSTANT * delta;
    }
}

/** Gravitational Constant is the acceleration object will head towards the ground with. */
GravityComponent.GRAVITATIONAL_CONSTANT = 0.0003;
