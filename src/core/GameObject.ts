import GameComponent from './GameComponent';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

export default GameObject;

/**
 * The base object in the GameEngine. Most objects managed by the system
 * will be based on this class.
 */
class GameObject {
    /** Array of components which update this GameObject. */
    components: GameComponent[] = [];

    /** Position of this object in the world. */
    position: vec3 = vec3.create();

    /** Velocity of this object moving through the world. */
    velocity: vec3 = vec3.create();

    /** Current rotation of this object. */
    rotation = 0;

    /** 3D rotations require a rotation axis */
    rotationAxis: vec3 = vec3.fromValues(0, 0, 1);

    /** Current speed of rotation. */
    rotationSpeed = 0;

    /** List of components which will be removed on next update. */
    private toBeRemoved: GameComponent[] = [];

    mass = 1;

    /** Integer representing the number of lives remaining for this object. */
    life = 1;

    /** Integer representing the team this object belongs to. */
    team = 0;

    private _events = {};

    name: string;

    /** Array of numbers describing bounds [minX, minY, maxX, maxY, minZ, maxZ] */
    bounds: number[];

    /**
     * <p>This method is used to add a {@link GameComponent} to this object.
     *
     * <p>GameComponents give objects particular behaviours. This method ensures
     * that each component added will have a chance to update once per frame
     * for this object.
     * @param {GameComponent} component - The component to be added to this object
     * @return {GameObject} Returns a reference to this for chainability
     */
    addComponent (component: GameComponent){

        this.components.push(component);

        // If the component has an init method call it when added so that the
        // component can add properties to the parent object
        if(component.init){
            component.init(this);
        }

        return this;
    }

    /**
     * Remove a particular {@link GameComponent} which had previously been added
     * to this object.
     * @param {GameComponent} component - The component to be removed from this object
     * @return {GameObject} Returns a reference to this for chainability
     */
    removeComponent (component: GameComponent){
        this.toBeRemoved.push(component);
        return this;
    }

    removeComponentByName (name: string){
        for(var i = 0; i < this.components.length; i++){
            if(this.components[i].name == name)
                this.toBeRemoved.push(this.components[i]);
        }
        return this;
    }

    removeComponentByTest (test){
        for(var i = 0; i < this.components.length; i++){
            if(test(this.components[i]))
                this.toBeRemoved.push(this.components[i]);
        }
        return this;
    }

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
    setPosition (x?:number, y?:number, z?:number) {
        if(x == undefined) { x = this.position[0]; }
        if(y == undefined) { y = this.position[1]; }
        if(z == undefined) { z = this.position[2]; }
        vec3.set(this.position, x, y, z);
        return this;
    }

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
    setVelocity (vx?: number, vy?: number, vz?: number) {
        if(vx == undefined) { vx = this.velocity[0]; }
        if(vy == undefined) { vy = this.velocity[1]; }
        if(vz == undefined) { vz = this.velocity[2]; }
        vec3.set(this.velocity, vx, vy, vz);
        return this;
    }

	/**
	 * Set rotation
	 * @param {number} rotation - Rotation in radians
	 * @param {vec3} rotationAxis - RotationAxis in radians
	 */
	setRotation (rotation: number, rotationAxis?: vec3){
		this.rotation = rotation;
		if(rotationAxis){
			vec3.normalize(this.rotationAxis, rotationAxis);
		}
	}

    /**
     * This method is called once per frame. GameObjects will usually only need
     * to call update on each of its components in this method passing a reference
     * to itself.
     * @param {number} delta - Time since last frame in milliseconds
     */
    update (delta){
        var i = 0,
            l = this.components.length,
            j = 0,
            m = this.toBeRemoved.length;
        for(;j<m;j++){
            for(i=0;i<l;i++){
                if(this.components[i] == this.toBeRemoved[j]){
                    arrayRemoveItem.call(this.components, i);
                    break;
                }
            }
        }
        this.toBeRemoved.length = 0;

        l = this.components.length;
        for(i=0;i<l;i++){
            this.components[i].update(this, delta);
        }
    }

    /**
     * This method is used to produce a html representation of the object for
     * things such as debugging trees. It will include components in its rendering.
     * Similar to the toString method.
     * @return {string} Representation of this component in HTML
     */
    toHTML () {
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

    on (eventType, fn) {
        // TODO: support multiple events
        if(this._events[eventType]) {
            console.warn("You are trying to add multiple events to the same object, which has not been implemented yet.");
        }
        this._events[eventType] = fn;
    }

    fire (eventType, ...rest) {
        if(this._events[eventType]) {
            this._events[eventType].apply(this, rest);
        }
    }
}

function arrayRemoveItem(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

function isFunction(a) {
  return (a instanceof Function);
}
