import GameComponent from '../core/GameComponent';

export default class RotationComponent extends GameComponent {
    constructor (dth) {
        super();
        this.rotationSpeed = dth;
    }

    update (parent, delta) {
        var w = parent.rotationSpeed || this.rotationSpeed || 0;
        parent.setRotation(parent.rotation + w * delta);
    }
}
