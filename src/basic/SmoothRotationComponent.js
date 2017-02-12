import GameComponent from '../core/GameComponent';

export default class SmoothRotationComponent extends GameComponent {
    update (parent, delta) {
        if(this.lastRotation != parent.rotation)
            this.rotation = parent.rotation;

        if(this.rotation != parent.rotation) {
            var rotation = parent.rotation,
                target = this.rotation,
                diff = target - rotation,
                speed = 0.01;
            if(diff > Math.PI){
                diff -= Math.PI * 2;
            } else if (diff < -Math.PI){
                diff += Math.PI * 2;
            }
            parent.rotation = rotation + diff * delta * speed;
            this.lastRotation = parent.rotation;
        }
    }
}
