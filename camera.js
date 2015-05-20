var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameObject = GE.GameObject,
			GameComponent = GE.GameComponent,
			GEC = GE.Comp;

	function CameraSystem (screen) {
		GameObject.call(this);

		this.pruneList = [];
		this.suspendedObjects = [];
		this.skewX = this.skew;
		this.skeyY = this.skew;
		this.scaleX = this.scale;
		this.scaleY = this.scale;
		this.rotation = 0;
		this.rotationAxis = vec3.create();
		vec3.set(this.rotationAxis, 0, 0, 1);

		this.screen = screen;
	}
	GE.CameraSystem = CameraSystem;
	CameraSystem.prototype = new GE.GameObject();

	CameraSystem.prototype.setScale = function(scaleX, scaleY){
		scaleY = scaleY || scaleX;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
	}
	CameraSystem.prototype.setRotation = function(rotation, rotationAxis){
		this.rotation = rotation;
		if(rotationAxis && rotationAxis.length == 3){
			vec3.normalize(this.rotationAxis, rotationAxis);
		}
	}
	CameraSystem.prototype.addManagerForPruning = function(objectManager) {
		if(objectManager instanceof GE.GameObjectManager)
			this.pruneList.push(objectManager);
	};
	CameraSystem.prototype.worldToScreen = function(worldX,worldY){
		var v = this.worldVec.set(worldX, worldY);
		v.subtract(this.position);
		v.leftMultiply(this.shearMatrix);
		v.leftMultiply(this.scaleMatrix);
		v.leftMultiply(this.rotMat);
		v.add(this.width / 2, this.height / 2);
		return v;
	};
	CameraSystem.prototype.screenToWorld = function(screenX,screenY){
		var v = vec2.create(),
				rotMat = mat2.create();

		vec2.set(v,
				screenX - this.screen.width / 2,
				-screenY + this.screen.height / 2);

		vec2.set(v, v[0] / this.scaleX, v[1] / this.scaleY);

		if(this.rotationAxis[2] == 1){
			mat2.rotate(rotMat, rotMat, -this.rotation);
			vec2.transformMat2(v, v, rotMat);
		}

		vec2.add(v, v, this.position);
		return v;
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
		var i = 0,
			l = this.pruneList.length,
			mgr, objs, j,
			dx, dy;
		for(; i < l; i++){
			mgr = this.pruneList[i];
			if(mgr instanceof GE.GameObjectManager)
			{
				objs = mgr.objects;
				for(j=0;j<objs.length;j++){
					this.pruneVec.set(objs[j].position).subtract(this.position);
					if(Math.abs(this.pruneVec.x) > width * 2 || Math.abs(this.pruneVec.y) > height * 2)
					{
						mgr.removeObject(objs[j]);
						this.suspendedObjects.push({object: objs[j], parent: mgr, position: j});
					}
				}
			}
		}
	};

	return GE;
}(GE || {}));
