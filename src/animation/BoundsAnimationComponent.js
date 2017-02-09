import PropertyAnimationComponent from './PropertyAnimationComponent';

const boundsFormatter = (parent, out) => { parent.setBounds(...out); };
export default class BoundsAnimationComponent extends PropertyAnimationComponent {
  constructor (start, end, duration=undefined, easing=undefined) {
    super(boundsFormatter, start, end, duration, easing);
  }
}
