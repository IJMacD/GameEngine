import GameComponent from '../core/GameComponent';

export default class SmoothRotationComponent extends GameComponent {
    update (parent, delta) {
        if(this.rotation != parent.rotation) {
            var rotation = this.rotation,
                target = parent.rotation,
                diff = target - rotation,
                speed = 0.01;
            if(diff > Math.PI){
                diff -= Math.PI * 2;
            } else if (diff < -Math.PI){
                diff += Math.PI * 2;
            }
            parent.rotation = rotation + diff * delta * speed;
            this.rotation = parent.rotation;
        }
    }
}
