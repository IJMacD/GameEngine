import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';

export default GravityComponent;

/**
 * Objects with this component will fall to the floor.
 */
class GravityComponent extends GameComponent {
    /** Gravitational Constant is the acceleration object will head towards the ground with. */
    static GRAVITATIONAL_CONSTANT: number = 0.0003;

    update (parent: GameObject, delta: number) {
        if(typeof parent.velocity[1] == "undefined")
            parent.velocity[1] = 0;
        parent.velocity[1] += GravityComponent.GRAVITATIONAL_CONSTANT * delta;
    }
}
