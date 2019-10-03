import GameComponent from '../core/GameComponent';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * This component allows objects to respond to impulses.
 *
 * @example <caption>If parent has an impulse vector its contents will be added to the velocity.</caption>
 * // Apply impulse of 0.05 pixels per second in direction of x-axis
 * vec3.set(gameObject.impulse, 0.05, 0, 0);
 * @extends {GameComponent}
 */
export default class PhysicsComponent extends GameComponent {
    init (parent) {
        parent.impulse = vec3.create();
    }

    update (parent, delta) {
        vec3.add(parent.velocity, parent.velocity, parent.impulse);
        vec3.set(parent.impulse, 0, 0, 0);
    }
}
