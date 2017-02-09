import PropertyAnimationComponent from './PropertyAnimationComponent';
import { parseColor } from '../util';

function colorFormatter (parent, color) {
  parent.color = `rgba(${color[0]|0}, ${color[1]|0}, ${color[2]|0}, ${color[3]})`;
}

export default class ColorAnimationComponent extends PropertyAnimationComponent {
  constructor (start, end, duration=undefined, easing=undefined) {
    super(colorFormatter, parseColor(start), parseColor(end), duration, easing);
  }
}
