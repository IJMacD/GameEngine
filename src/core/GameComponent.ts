import GameObject from './GameObject.ts';

export default GameComponent;

/**
 * A GameComponent adds a particular behaviour to a GameObject. This class
 * should be subclassed to implement desired behaviour. The `update` method
 * is called once per frame for each GameObject it has been attached to. This
 * is where most of the work will be done.
 * @abstract
 */
abstract class GameComponent extends GameObject {

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
	update (parent:(GameObject|number), delta?:number) {}

	/**
	 * This method is used to produce a html representation of the component for
	 * things such as debugging trees. Similar to toString method.
	 * @return {string} Representation of this component in HTML
	 */
	toHTML () {
		return this.name;
	}

}
