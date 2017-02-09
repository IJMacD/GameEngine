import PropertyAnimationComponent from './PropertyAnimationComponent';

const rotationFormatter = (parent, out) => { parent.setRotation(out[0]); };
export default class RotationAnimationComponent extends PropertyAnimationComponent {
  constructor (start, end, duration=undefined, easing=undefined, loop=undefined) {
    super(rotationFormatter, start, end, duration, easing, loop);
  }

  update (parent, delta) {
    this.end[0] = this.rotation;

    super.update(parent, delta);
  }

  setRotation (rotation) {
    this.start[0] = this.rotation;
    this.end[0] = rotation;

    this.reset();

    super.setRotation(rotation);
  }
}
