import GameComponent from '../core/GameComponent';

export default class RotationInterpolatorComponent extends GameComponent {
    update (parent, delta) {
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
    }
}
