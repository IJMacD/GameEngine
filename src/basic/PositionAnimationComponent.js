import PropertyAnimationComponent from './PropertyAnimationComponent';

const positionFormatter = (parent, out) => { parent.setPosition(...out); };
export default class PositionAnimationComponent extends PropertyAnimationComponent {
  constructor (start, end, duration=undefined, easing=undefined) {
    super(positionFormatter, start, end, duration, easing);
  }
}
