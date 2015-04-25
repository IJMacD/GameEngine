var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GEC = GE.Comp;

	function CameraSystem (initX,initY,width,height) {
		GE.GameObject.apply(this,arguments);
		this.width = width;
		this.height = height;
		this.watchObject = null;
		this.pruneList = [];
		this.suspendedObjects = [];
		this.skew = 0;
		this.skewX = this.skew;
		this.skeyY = this.skew;
		this.scale = 1;
		this.scaleX = this.scale;
		this.scaleY = this.scale;
		this.rotation = 0;
		// this.angle = 0;
		this.rotMat = Matrix.rotationMatrix(this.rotation);
		this.scaleMatrix = Matrix.scaleMatrix(this.scaleX, this.scaleY);
		this.shearMatrix = Matrix.shearMatrix(this.skewX, this.skewY);
		// this.worldVec = new Vector2();
		// this.screenVec = new Vector2();
		// this.pruneVec = new Vector2();
		this.rotationAxis = [0,0,1];
		this.transformMatrix = mat4.create();
	}
	GE.CameraSystem = CameraSystem;
	CameraSystem.prototype = new GE.GameObject();
	CameraSystem.prototype.setScreenSize = function(width, height){
		this.width = width;
		this.height = height;
	}
	CameraSystem.prototype.setScale = function(scaleX, scaleY){
		scaleY = scaleY || scaleX;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
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
		var v = this.screenVec.set(screenX, screenY);
		v.subtract(this.width / 2, this.height / 2);
		v.leftMultiply(this.rotMat.inverse());
		v.leftMultiply(this.scaleMatrix.inverse());
		v.leftMultiply(this.shearMatrix.inverse());
		v.add(this.position);
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
