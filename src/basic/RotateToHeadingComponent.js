import GameComponent from '../core/GameComponent';

export default class RotateToHeadingComponent extends GameComponent {
    update (parent, delta) {
        parent.setRotation(Math.atan2(parent.velocity[0], -parent.velocity[1]));
    }
}
