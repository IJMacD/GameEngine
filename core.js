import { vec3 } from 'gl-matrix';

	// Exported at end.

	export function GameObject(){
		this.components = [];
		this.position = vec3.create();
		this.velocity = vec3.create();
		this.rotation = 0;
		this.rotationSpeed = 0;
		this.toBeRemoved = [];
		this.life = 1;
		this.team = 0;

		this.components.remove = arrayRemoveItem;
	};

	GameObject.prototype = {
		addComponent: function(component){

			// Allow syntactic sugar of addComponent(function() {...}) which is a
			// shorthand for specifying a simple component with only an update method
			if(isFunction(component)){
				component = { update: component };
			}

			this.components.push(component);

			// If the component has an init method call it when added so that the
			// component can add properties to the parent object
			if(component.init){
				component.init(this);
			}

			return this;
		},
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
		 * Protective method to set position of the object.
		 *
		 * This method will preserve position on axes which you leave undefined
		 * in the call to this method.
		 *
		 * e.g. `gameObject.setPosition(undefined, 20)` will only set the y
		 * co-ordinate, leaving x and z at their original values.
		 */
		setPosition: function(x,y,z) {
			if(x == undefined) { x = this.position[0]; }
			if(y == undefined) { y = this.position[1]; }
			if(z == undefined) { z = this.position[2]; }
			vec3.set(this.position, x, y, z);
			return this;
		},
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

	export function GameObjectManager (){
		GameObject.call(this);

		this.objects = [];
		this.objectsToBeRemoved = [];

		this.objects.remove = arrayRemoveItem;
	};

	GameObjectManager.prototype = new GameObject();


	GameObjectManager.prototype.addObject = function(object){
		if(object instanceof GameObject)
			this.objects.push(object);
		object.parent = this;
		return this;
	};
	GameObjectManager.prototype.addObjectAt = function(index, object){
		if(object instanceof GameObject)
			this.objects.splice(index,0,object);
		object.parent = this;
		return this;
	};
	GameObjectManager.prototype.removeObject = function(object){
		if(object instanceof GameObject)
			this.objectsToBeRemoved.push(object);
		if(object.parent == this) { object.parent = null; }
		return this;
	};
	GameObjectManager.prototype.removeAll = function() {
		this.objects.length = 0;
	};
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

	export function GameComponent(){};
	GameComponent.prototype.update = function(parent, delta){};
	GameComponent.prototype.toHTML = function() {
		return this.name;
	};
	GameComponent.create = function(constructor, properties){
		constructor.prototype = new GameComponent();
		for(var prop in properties){
			constructor.prototype[prop] = properties[prop];
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
