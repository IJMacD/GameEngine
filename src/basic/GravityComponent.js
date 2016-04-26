import GameComponent from '../core/GameComponent';

var GRAVITATIONAL_CONSTANT = 0.0003;

export default GameComponent.create(
  /**
   * Objects with this component will fall to the floor.
   * @constructs GravityComponent
   */
  function GravityComponent(){},
  /** @lends GravityComponent */
  {
    update: function(parent, delta) {
      if(typeof parent.velocity[1] == "undefined")
        parent.velocity[1] = 0;
      parent.velocity[1] += GRAVITATIONAL_CONSTANT * delta;
    }
  }
);
