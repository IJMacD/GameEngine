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

let PIC = PositionInterpolatorComponent;
PIC.linear = function (t) { return t };
PIC.quadIn = function (t) { return t*t };
PIC.quadOut = function (t) { return -t*(t-2) };
PIC.circIn = function (t) { return 1-Math.sqrt(1-t*t) };
PIC.circOut = function (t) { return Math.sqrt(1-(t-1)*(t-1)) };
PIC.smooth = function (t) { return t*t*(3-2*t) };
// Stolen from Dojo:
// https://github.com/dojo/dwb/blob/master/src/main/webapp/js/build/amd_loader/fx/easing.js
PIC.backIn = function (t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s);
};
PIC.backOut = function (t) {
  var s = 1.70158;
  t = t - 1;
  return t*t*((s+1)*t + s) + 1;
};
PIC.backInOut = function (t) {
  var s = 1.70158 * 1.525;
  t = t * 2;
  if(t < 1){ return (Math.pow(t, 2) * ((s + 1) * t - s)) / 2; }
  t-=2;
  return (Math.pow(t, 2) * ((s + 1) * t + s) + 2) / 2;
};
PIC.elasticIn = function(n){
  if(n == 0 || n == 1){ return n; }
  var p = .3;
  var s = p / 4;
  n = n - 1;
  return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
};
PIC.elasticOut = function(n){
  if(n==0 || n == 1){ return n; }
  var p = .3;
  var s = p / 4;
  return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
};

export default PositionInterpolatorComponent;