var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameObject = GE.GameObject;

	function CameraSystem (width, height) {
		GameObject.call(this);

		this.width = width;
		this.height = height;

		this.pruneList = [];
		this.suspendedObjects = [];
		this.skewX = this.skew;
		this.skeyY = this.skew;
		this.scaleX = 1;
		this.scaleY = 1;
		this.rotation = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 0, 0, 1);
	}
	GE.CameraSystem = CameraSystem;
	CameraSystem.prototype = new GE.GameObject();

	CameraSystem.prototype.setScale = function(scaleX, scaleY){
		scaleY = scaleY || scaleX;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
	};

	CameraSystem.prototype.setRotation = function(rotation, rotationAxis){
		this.rotation = rotation;
		if(rotationAxis && rotationAxis.length == 3){
			vec3.normalize(this.rotationAxis, rotationAxis);
		}
	};

	CameraSystem.prototype.addManagerForPruning = function(objectManager) {
		if(objectManager instanceof GE.GameObjectManager)
			this.pruneList.push(objectManager);
	};
	CameraSystem.prototype.getTransformMatrix = function(){
		// var m = new Matrix(this.shearMatrix);
		// m.multiplyBy(this.scaleMatrix);
		// m.multiplyBy(this.rotMat);
		return this.transformMatrix;
	};
	CameraSystem.prototype.update = function(delta) {
		GE.GameObject.prototype.update.call(this, delta);
		//this.rotation += 0.0001 * delta;
		//this.rotMat = Matrix.rotationMatrix(-Vector2.angleBetween(suns[0],pointMasses[0]));
		//this.angle += 0.0001 * delta;
		//this.scaleMatrix.values[0][0] = -(Math.sin(this.angle)+0.5)*3;
		//this.scaleMatrix.values[1][1] = (Math.sin(this.angle)+0.5)*3;
		//this.rotMat = Matrix.rotationMatrix(this.rotation);

		/*
		TODO: Pruning objeccts which are off screen could be a component's job?
		var i = 0,
			l = this.pruneList.length,
			mgr, objs, j;
		for(; i < l; i++){
			mgr = this.pruneList[i];
			if(mgr instanceof GE.GameObjectManager)
			{
				objs = mgr.objects;
				for(j=0;j<objs.length;j++){
					this.pruneVec.set(objs[j].position).subtract(this.position);
					if(Math.abs(this.pruneVec.x) > this.screen.width * 2 || Math.abs(this.pruneVec.y) > this.screen.height * 2)
					{
						mgr.removeObject(objs[j]);
						this.suspendedObjects.push({object: objs[j], parent: mgr, position: j});
					}
				}
			}
		}
		*/
	};

	return GE;
}(GE || {}));
