import GameObject from './GameObject';

/**
 * A subclass of {@link GameObject} which manages its own children
 * @extends {GameObject}
 */
class GameObjectManager extends GameObject {
    constructor() {
  		super();

  		this.objects = [];
  		this.objectsToBeRemoved = [];

  		this.objects.remove = arrayRemoveItem;
  	}

	/**
	 * Add an object to be updated as children of this manager
	 * @param {GameObject} object - Game object to be attached to this node in the tree
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
  	addObject (object){
  		if(object instanceof GameObject)
  			this.objects.push(object);
  		object.parent = this;
  		return this;
  	}

	/**
	 * Add an object to be updated as children of this manager at particular place
	 * in the list of children.
	 * @param {number} index - Position in the list
	 * @param {GameObject} object - Game object to be attached to this node in the tree
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
  	addObjectAt (index, object){
  		if(object instanceof GameObject)
  			this.objects.splice(index,0,object);
  		object.parent = this;
  		return this;
  	}

	/**
	 * Remove a previously added object from this manager.
	 * @param {GameObject} object - Game object to be removed
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
  	removeObject (object){
  		if(object instanceof GameObject)
  			this.objectsToBeRemoved.push(object);
  		if(object.parent == this) { object.parent = null; }
  		return this;
  	}

	/**
	 * Remove all previously added objects from this manager.
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
  	removeAll () {
  		this.objects.length = 0;
  	}

	/**
	 * This method is inherited from {@link GameObject}. It will first call update
	 * on each of its components like an ordinary {@link GameObject} but then it
	 * will start updating all of its child nodes.
	 * @param {number} delta - Time since last frame in milliseconds
	 */
  	update (delta) {
  		GameObject.prototype.update.call(this, delta);

  		var i = 0,
  			l = this.objects.length,
  			m,
  			j = 0;

  		for(i=0;i<l;i++){
				this.objects[i].update(delta);
  		}

  		m = this.objectsToBeRemoved.length;

  		for(;j<m;j++){
  			i = 0;
  			for(;i<l;i++){
  				if(this.objects[i] == this.objectsToBeRemoved[j]){
  					this.objects.remove(i);
  					l--;
  					break;
  				}
  			}
  		}
  		this.objectsToBeRemoved.length = 0;
  	}

	/**
	 * This method is used to produce a html representation of the manage for
	 * things such as debugging trees. It will include components as well as child
	 * objects in its rendering. Similar to the toString method.
	 * @return {string} Representation of this component in HTML
	 */
  	toHTML () {
  		var html = this.name,
  			i;
  		if(this.objects.length > 1)
  			html += " (" + this.objects.length + " items)";
  		if(this.components.length){
  			html += "<ul>";
  			for(i=0;i<this.components.length;i++)
  				html += "<li>"+this.components[i].toHTML();
  			html += "</ul>";
  		}
  		if(this.objects.length){
  			html += "<ul>";
  			for(i=0;i<this.objects.length;i++)
  				html += "<li>"+this.objects[i].toHTML();
  			html += "</ul>";
  		}
  		return html;
  	}
}

export default GameObjectManager;

function arrayRemoveItem(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}
