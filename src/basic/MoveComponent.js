import GameComponent from '../core/GameComponent';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * Objects cannot move without this component.
 * @extends {GameComponent}
 */
export default class MoveComponent extends GameComponent {
    update (parent, delta) {
        vec3.scaleAndAdd(parent.position, parent.position, parent.velocity, delta);
    }
}
