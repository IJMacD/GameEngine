import GameComponent from '../core/GameComponent';

/**
 * Commponent which checks the input system for clicks which occured with
 * its parents bounds then reports such click to the parent.
 * @class ClickComponent
 * @extends {GameComponent}
 * @param {InputSystem} inputSystem - Where to listen to for clicks
 */
export default class ClickComponent extends GameComponent {
  constructor (inputSystem) {
    super();

    this.inputSystem = inputSystem;
  }

  update (parent, delta) {
    if(parent.bounds && this.inputSystem.hasClick) {
      const click = this.inputSystem.lastClick;
      const pos = parent.position;
      const bounds = parent.bounds;

      if  (bounds[0] + pos[0] < click[0]
        && bounds[1] + pos[1] < click[1]
        && bounds[2] + pos[0] > click[0]
        && bounds[3] + pos[1] > click[1]) {
          this.fire('click', parent);
      }
    }
  }
}