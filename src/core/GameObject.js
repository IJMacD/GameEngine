import GameComponent from 'GameComponent';

/**
 * The base object in the GameEngine. Most objects managed by the system
 * will be based on this class.
 * @constructor
 */
export default function GameObject(){
  /** Array of components which update this GameObject.
   * @member {array} */
  this.components = [];
  /** Position of this object in the world.
  * @member {vec3} */
  this.position = vec3.create();
  /** Velocity of this object moving through the world.
  * @member {vec3} */
  this.velocity = vec3.create();
  /** Current rotation of this object.
  * @member {number} */
  this.rotation = 0;
  /** Current speed of rotation.
  * @member {number} */
  this.rotationSpeed = 0;
  /**
    * List of components which will be removed on next update.
    * @private
    * @member {array}
    */
  this.toBeRemoved = [];
  /** Integer representing the number of lives remaining for this object.
  * @member {number} */
  this.life = 1;
  /** Integer representing the team this object belongs to.
  * @member {number} */
  this.team = 0;

  this.components.remove = arrayRemoveItem;
}

GameObject.prototype = {
  /**
   * <p>This method is used to add a {@link GameComponent} to this object.
   *
   * <p>GameComponents give objects particular behaviours. This method ensures
   * that each component added will have a chance to update once per frame
   * for this object.
   * @param {GameComponent} component - The component to be added to this object
   * @return {GameObject} Returns a reference to this for chainability
   */
  addComponent: function(component){

    // Allow syntactic sugar of addComponent(function() {...}) which is a
    // shorthand for specifying a simple component with only an update method
    if(isFunction(component)){
      component = { update: component };
    }

    this.components.push(component);
    return this;
  },
  /**
   * Remove a particular {@link GameComponent} which had previously been added
   * to this object.
   * @param {GameComponent} component - The component to be removed from this object
   * @return {GameObject} Returns a reference to this for chainability
   */
  removeComponent: function(component){
    this.toBeRemoved.push(component);
    return this;
  },
  removeComponentByName: function(name){
    for(var i = 0; i < this.components.length; i++){
      if(this.components[i].name == name)
        this.toBeRemoved.push(this.components[i]);
    }
    return this;
  },
  removeComponentByTest: function(test){
    for(var i = 0; i < this.components.length; i++){
      if(test(this.components[i]))
        this.toBeRemoved.push(this.components[i]);
    }
    return this;
  },
  /**
   * <p>Protective method to set position of the object in world-units.
   *
   * <p>The native units are world-units. i.e. If a 2D camera is
   * used with the scale set to 1x and the canvas is not scaled in the webpage,
   * 1 unit in the world will equate to 1 pixel on the screen.
   *
   * <p>This method will preserve position on axes which you leave undefined
   * in the call to this method.
   *
   * @example <caption>This will only affect the y co-ordinate, leaving x and
   * z at their original values.</caption>
   * // Set y = 20
   * gameObject.setPosition(undefined, 20);
   * @param {number} x - x component of position vector
   * @param {number} y - y component of position vector
   * @param {number} z - z component of position vector
   * @return {GameObject} Returns a reference to this for chainability
   */
  setPosition: function(x,y,z) {
    if(x == undefined) { x = this.position[0]; }
    if(y == undefined) { y = this.position[1]; }
    if(z == undefined) { z = this.position[2]; }
    vec3.set(this.position, x, y, z);
    return this;
  },
  /**
   * <p>Protective method to set velocity of the object.
   *
   * <p>The native units are world-units per millisecond. i.e. If a 2D camera
   * is used with the scale set to 1x and the canvas is not scaled in the webpage,
   * 1 unit in the world will equate to 1 pixel on the screen. In this common
   * case the units of velocity will be equivelant to pixels-per-millisecond.
   *
   * <p>This method will preserve position on axes which you leave undefined
   * in the call to this method.
   *
   * @example <caption>This will only affect the velocity parallel to the y-axis
   * co-ordinate, leaving vx and vz unaffected.</caption>
   * // Set vy = 20px per second
   * gameObject.setVelocity(undefined, 0.02);
   * @param {number} x - x component of velocity vector
   * @param {number} y - y component of velocity vector
   * @param {number} z - z component of velocity vector
   * @return {GameObject} Returns a reference to this for chainability
   */
  setVelocity: function(vx,vy,vz) {
    if(vx == undefined) { vx = this.velocity[0]; }
    if(vy == undefined) { vy = this.velocity[1]; }
    if(vz == undefined) { vz = this.velocity[2]; }
    vec3.set(this.velocity, vx, vy, vz);
    return this;
  },
  setRotation: function(th) {
    this.rotation = th;
    return this;
  },
  hit: function(victim) {
    if(this.hitVictim == null)
      this.hitVictim = victim;
  },
  hitBy: function(attacker) {
    if(this.attackerHit == null)
      this.attackerHit = attacker;
  },
  /**
   * This method is called once per frame. GameObjects will usually only need
   * to call update on each of its components in this method passing a reference
   * to itself.
   * @param {number} delta - Time since last frame in milliseconds
   */
  update: function(delta){
    var i = 0,
        l = this.components.length,
        j = 0,
        m = this.toBeRemoved.length;
    for(;j<m;j++){
      for(i=0;i<l;i++){
        if(this.components[i] == this.toBeRemoved[j]){
          this.components.remove(i);
          break;
        }
      }
    }
    this.toBeRemoved.length = 0;

    l = this.components.length;
    for(i=0;i<l;i++){
      this.components[i].update(this, delta);
    }
  },
  /**
   * This method is used to produce a html representation of the object for
   * things such as debugging trees. It will include components in its rendering.
   * Similar to the toString method.
   * @return {string} Representation of this component in HTML
   */
  toHTML: function() {
    var html = this.name,
        i;
    if(typeof this.position.x == "number")
      html += " " + this.position;
    if(this.components.length){
      html += "<ul>";
      for(i=0;i<this.components.length;i++)
        html += "<li>"+this.components[i].toHTML();
      html += "</ul>";
    }
    return html;
  }
};

function arrayRemoveItem(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

function isFunction(a) {
  return (a instanceof Function);
}
