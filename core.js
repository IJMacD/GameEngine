	/**
	 * The base object in the GameEngine. Most objects managed by the system
	 * will be based on this class.
	 * @constructor
	 */
	function GameObject(){
		/** @member {array} */
		this.components = [];
		/** @member {vec3} */
		this.position = vec3.create();
		/** @member {vec3} */
		this.velocity = vec3.create();
		/** @member {number} */
		this.rotation = 0;
		/** @member {number} */
		this.rotationSpeed = 0;
		/**
		 * @private
		 * @member {array}
		 */
		this.toBeRemoved = [];
		/** @member {number} */
		this.life = 1;
		/** @member {number} */
		this.team = 0;

		this.components.remove = arrayRemoveItem;
	};

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

	/**
	 * A subclass of {@link GameObject} which manages its own children
	 * @constructor
	 * @extends GameObject
	 */
	function GameObjectManager (){
		GameObject.call(this);

		this.objects = [];
		this.objectsToBeRemoved = [];

		this.objects.remove = arrayRemoveItem;
	};

	GameObjectManager.prototype = new GameObject();

	/**
	 * Add an object to be updated as children of this manager
	 * @param {GameObject} object - Game object to be attached to this node in the tree
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
	GameObjectManager.prototype.addObject = function(object){
		if(object instanceof GameObject)
			this.objects.push(object);
		object.parent = this;
		return this;
	};
	/**
	 * Add an object to be updated as children of this manager at particular place
	 * in the list of children.
	 * @param {number} index - Position in the list
	 * @param {GameObject} object - Game object to be attached to this node in the tree
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
	GameObjectManager.prototype.addObjectAt = function(index, object){
		if(object instanceof GameObject)
			this.objects.splice(index,0,object);
		object.parent = this;
		return this;
	};
	/**
	 * Remove a previously added object from this manager.
	 * @param {GameObject} object - Game object to be removed
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
	GameObjectManager.prototype.removeObject = function(object){
		if(object instanceof GameObject)
			this.objectsToBeRemoved.push(object);
		if(object.parent == this) { object.parent = null; }
		return this;
	};
	/**
	 * Remove all previously added objects from this manager.
	 * @return {GameObjectManager} Returns a reference to this for chainability
	 */
	GameObjectManager.prototype.removeAll = function() {
		this.objects.length = 0;
		return this;
	};
	/**
	 * This method is inherited from {@link GameObject}. It will first call update
	 * on each of its components like an ordinary {@link GameObject} but then it
	 * will start updating all of its child nodes.
	 * @param {number} delta - Time since last frame in milliseconds
	 */
	GameObjectManager.prototype.update = function(delta){
		GameObject.prototype.update.call(this, delta);

		var i = 0,
			l = this.objects.length,
			m,
			j = 0;

		for(i=0;i<l;i++){
			if(this.objects[i].life)
				this.objects[i].update(delta);
			else
				this.removeObject(this.objects[i]);
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
	};

	/**
	 * This method is used to produce a html representation of the manage for
	 * things such as debugging trees. It will include components as well as child
	 * objects in its rendering. Similar to the toString method.
	 * @return {string} Representation of this component in HTML
	 */
	GameObjectManager.prototype.toHTML = function() {
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
	};

	/**
	 * A GameComponent adds a particular behaviour to a GameObject. This class
	 * should be subclassed to implement desired behaviour. The `update` method
	 * is called once per frame for each GameObject it has been attached to. This
	 * is where most of the work will be done.
	 * @constructor
	 */
	function GameComponent(){};
	/**
	 * This method is called once per frame for each GameObject this component
	 * has been attached to
	 * @abstract
	 * @param {GameObject} parent - A reference to the {@link GameObject} on which
	 * this component is operating. This allows multiple GameObjects to share
	 * stateless components.
	 * @param {number} delta - Time since last frame in milliseconds
	 */
	GameComponent.prototype.update = function(parent, delta){};
	/**
	 * This method is used to produce a html representation of the component for
	 * things such as debugging trees. Similar to toString method.
	 * @return {string} Representation of this component in HTML
	 */
	GameComponent.prototype.toHTML = function() {
		return this.name;
	};
	/**
	 * This static helper method reduces the boiler plate of subclassing
	 * GameComponent.
	 * @static
	 * @param {function} constructor - The constructor of the subclass. This should
	 * be a named function expression or a reference to a function statement so that
	 * magic can happen using the function's name for component identification
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
		if(name){
			GEC[name] = constructor;
		}
		return constructor;
	};

	function arrayRemoveItem(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	}

	function isFunction(a) {
		return (a instanceof Function);
	}

	GE.GameObject = GameObject;
	GE.GameComponent = GameComponent;
	GE.GameObjectManager = GameObjectManager;
