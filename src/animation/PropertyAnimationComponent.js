import GameComponent from '../core/GameComponent';
import { Linear } from '../Easing';

/**
 * Animate arbritarty properties
 * @param {number} loop - 0: no loop, 1: loop animation, 2: loop reverse
 */
export default class PropertyAnimationComponent extends GameComponent {
  constructor (outputter, start, end, duration=1000, easing=Linear, loop=2) {
    super();

    if (!Array.isArray(start)) { start = [start] }
    if (!Array.isArray(end)) { end = [end] }
    start.length = 4;
    end.length = 4;

    this.outputter = outputter;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.easing = easing;
    this.loop = loop;

    this.elapsed = 0;
    this.direction = 1;
    this.out = Array(4);
  }

  reset () {
    this.elapsed = 0;
  }

  start () {
    this.direction = 1;
  }

  pause () {
    this.direction = 0;
  }

  stop () {
    this.pause();
    this.reset();
  }

  update (parent, delta) {
    const t = this.easing(this.elapsed / this.duration);
    const a0 = this.start[0];
    const a1 = this.start[1];
    const a2 = this.start[2];
    const a3 = this.start[3];

    this.out[0] = a0 + t * (this.end[0] - a0);
    this.out[1] = a1 + t * (this.end[1] - a1);
    this.out[2] = a2 + t * (this.end[2] - a2);
    this.out[3] = a3 + t * (this.end[3] - a3);

    this.outputter(parent, this.out);

    this.elapsed += delta * this.direction;

    if (this.elapsed > this.duration || this.elapsed < 0) {
      if (this.loop == 2) {
        this.direction *= -1;
      }
      else if (this.loop == 1) {
        this.elapsed = 0;
      }
      this.elapsed = Math.min(Math.max(this.elapsed, 0), this.duration);
    }
  }
}
