import GameComponent from '../core/GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

export class PositionInterpolatorComponent extends GameComponent {
  constructor (duration, easing) {
    super();
    this.duration = duration;
    this.easing = easing || PositionInterpolatorComponent.linear;
    this.elapsed = 0;
    this.running = false;
    this.starting = false;
    this.start = vec3.create();
    this.position = vec3.create();
  }

  update (parent, delta) {
    // The first frame we run after being told to interpolate somewhere
    // we need to gather some information from our parent
    if(this.starting){

      // If any co-ordinate is NaN this means the consumer wants to
      // retain those values from the parent
      if(isNaN(this.position[0])) this.position[0] = parent.position[0];
      if(isNaN(this.position[1])) this.position[1] = parent.position[1];
      if(isNaN(this.position[2])) this.position[2] = parent.position[2];

      // Linear interpolation requires that we remember where we started
      vec3.copy(this.start, parent.position);

      this.running = true;
      this.starting = false;
      this.elapsed = 0;
    }

    if(this.running){
      var x = this.elapsed / this.duration,
          t = this.easing(x);

      if(x > 1){
        vec3.copy(parent.position, this.position);
        this.running = false;
      }
      else {
        vec3.lerp(parent.position, this.start, this.position, t);
        this.elapsed += delta;
      }
    }
  }

  setPosition (x, y, z) {
    super.setPosition(x, y, z);
    this.starting = true;
  }
}

export default PositionInterpolatorComponent;
