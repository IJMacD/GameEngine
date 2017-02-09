import GameObject from './GameObject';

/**
 * A GameComponent adds a particular behaviour to a GameObject. This class
 * should be subclassed to implement desired behaviour. The `update` method
 * is called once per frame for each GameObject it has been attached to. This
 * is where most of the work will be done.
 * @extends {GameObject}
 * @abstract
 */
class GameComponent extends GameObject {

	/**
	 * This method is called once when the component is first added to each parent.
	 * Use this to perform set-up and add any necessary properties to parent objects.
	 * @abstract
	 * @param {GameObject} parent - A reference to the {@link GameObject} on which
	 * this component is operating. This allows multiple GameObjects to share
	 * stateless components.
	 */
	init (parent) {}

	/**
	 * This method is called once per frame for each GameObject this component
	 * has been attached to.
	 * @abstract
	 * @param {GameObject} parent - A reference to the {@link GameObject} on which
	 * this component is operating. This allows multiple GameObjects to share
	 * stateless components.
	 * @param {number} delta - Time since last frame in milliseconds
	 */
	update (parent, delta) {}

	/**
	 * This method is used to produce a html representation of the component for
	 * things such as debugging trees. Similar to toString method.
	 * @return {string} Representation of this component in HTML
	 */
	toHTML () {
		return this.name;
	}
}

/**
 * This static helper method reduces the boiler plate of subclassing
 * GameComponent.
 * @static
 * @deprecated Use ES6 classes instead
 * @param {function} constructor - The constructor of the subclass. This should
 * be a named function expression or a reference to a function statement so that
 * magic can happen using the function's name for component identification.
 * @param {object} properties - A plain javascript object containing methods
 * and properties to be attached to the new prototype.
 * @return {GameComponent} The new 'class' which has been created.
 */
GameComponent.create = function(constructor, properties){
	constructor.prototype = new GameComponent();
	for(var prop in properties){
		constructor.prototype[prop] = properties[prop];
	}
	var name = constructor.name;
	if(!name){
		name = constructor.toString().match(/^function ([a-z_]+)/i)[1];
		constructor.name = name;
	}
	return constructor;
};

export default GameComponent;
