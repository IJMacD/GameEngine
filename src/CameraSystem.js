import GameObject from './core/GameObject';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * Render systems require a camera. Use this class to create one.
 * @extends {GameObject}
 * @param {number} width
 * @param {number} height
 */
class CameraSystem extends GameObject {
	constructor (width, height) {
		super();

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

	/**
	 * Set the scale to render at
	 * @param {number} scaleX
	 * @param {number} scaleY - Default: scaleX
	 */
	setScale (scaleX, scaleY){
		scaleY = scaleY || scaleX;
		this.scaleX = scaleX;
		this.scaleY = scaleY;
	}

	/**
	 * Set Camera rotation
	 * @param {number} rotation - Rotation in radians
	 */
	setRotation (rotation, rotationAxis){
		this.rotation = rotation;
		if(rotationAxis && rotationAxis.length == 3){
			vec3.normalize(this.rotationAxis, rotationAxis);
		}
	}

	/**
	 * Change the size of the camera
	 * @param {number} width
	 * @param {number} height
	 */
	setSize (width, height){
		this.width = width;
		this.height = height;
	}

	addManagerForPruning (objectManager) {
		if(objectManager instanceof GameObjectManager)
			this.pruneList.push(objectManager);
	}

	getTransformMatrix () {
		// var m = new Matrix(this.shearMatrix);
		// m.multiplyBy(this.scaleMatrix);
		// m.multiplyBy(this.rotMat);
		return this.transformMatrix;
	}

	update (delta) {
		super.update(delta);
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
	}
}

export default CameraSystem;
