var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GEC = GE.Comp,
			instanceCount = 0;

	// Exported at end.

	function GameObject(){
		this.components = [];
		this.position = vec3.create();
		this.velocity = vec3.create();
		this.rotation = 0;
		this.toBeRemoved = [];
		this.life = 1;
		this.team = 0;

		this.components.remove = arrayRemoveItem;

		if(this.name == "[GameObject]"){
			this.name = "[GameObject #" + instanceCount + "]";
		}
		instanceCount++;
	};

	GameObject.prototype = {
		addComponent: function(component){
			//if(component instanceof GameComponent)
				this.components.push(component);
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
		setPosition: function(x,y,z) {
			vec3.set(this.position, x, y, z);
			return this;
		},
		setVelocity: function(vx,vy,vz) {
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
			var html = this.name;
			if(typeof this.position[0] == "number")
				html += " (" + this.position[0].toFixed(2) + "," + this.position[1].toFixed(2) + "," + this.position[2].toFixed(2) + ")";
			if(this.components.length){
				html += "<ul>";
				for(var i=0;i<this.components.length;i++)
					html += "<li>"+this.components[i].toHTML();
				html += "</ul>";
			}
			return html;
		},
		toString: function(){
			return this.name;
		},
		name: "[GameObject]"
	};

	function GameObjectManager (){
		GameObject.call(this);
		this.name = "[GameObjectManager]";

		this.objects = [];
		this.objectsToBeRemoved = [];

		this.objects.remove = arrayRemoveItem;
	};

	GameObjectManager.prototype = new GameObject();


	GameObjectManager.prototype.addObject = function(object){
		if(object instanceof GameObject)
			this.objects.push(object);
		return this;
	};
	GameObjectManager.prototype.addObjectAt = function(index, object){
		if(object instanceof GameObject)
			this.objects.splice(index,0,object);
		return this;
	};
	GameObjectManager.prototype.removeObject = function(object){
		if(object instanceof GameObject)
			this.objectsToBeRemoved.push(object);
		return this;
	};
	GameObjectManager.prototype.update = function(delta){
		var i = 0,
			l = this.objects.length,
			m = this.objectsToBeRemoved.length,
			j = 0;

		for(i=0;i<l;i++){
			if(this.objects[i].life)
				this.objects[i].update(delta);
			else
				this.removeObject(this.objects[i]);
		}

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
		var html = this.name;
		if(this.objects.length > 1)
			html += " (" + this.objects.length + " items)";
		if(this.components.length){
			html += "<ul>";
			for(var i=0;i<this.components.length;i++)
				html += "<li>"+this.components[i].toHTML();
			html += "</ul>";
		}
		if(this.objects.length){
			html += "<ul>";
			for(var i=0;i<this.objects.length;i++)
				html += "<li>"+this.objects[i].toHTML();
			html += "</ul>";
		}
		return html;
	};

	function GameComponent(){};
	GameComponent.prototype.update = function(parent, delta){};
	GameComponent.prototype.toHTML = function() {
		return this.name;
	};
	GameComponent.create = function(constructor, properties){
		constructor.prototype = new GameComponent();
		constructor.prototype.name = constructor.name;
		for(prop in properties){
			constructor.prototype[prop] = properties[prop];
		}
		GEC[constructor.name] = constructor;
		return constructor;
	}

	function arrayRemoveItem(from, to) {
		var rest = this.slice((to || from) + 1 || this.length);
		this.length = from < 0 ? this.length + from : from;
		return this.push.apply(this, rest);
	};

	GE.GameObject = GameObject;
	GE.GameComponent = GameComponent;
	GE.GameObjectManager = GameObjectManager;

	return GE;

}(GE || {}));
