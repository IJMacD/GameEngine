import GameComponent from '../core/GameComponent';
import vec2 from 'gl-matrix/src/gl-matrix/vec2';
import InputSystem from './InputSystem';

export default class MoveToClickComponent extends GameComponent {
  input: InputSystem;

  constructor (input) {
    super();
    this.input = input;
  }

  update (parent, delta) {
    if (this.input.hasClick) {
      vec2.copy(parent.position, this.input.lastClick);
    }
  }
}
