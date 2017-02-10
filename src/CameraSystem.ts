import GameObject from './core/GameObject';
import GameObjectManager from './core/GameObjectManager';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

/**
 * Render systems require a camera. Use this class to create one.
 * @param {number} width
 * @param {number} height
 */
class CameraSystem extends GameObject {

	pruneList: GameObjectManager[] = [];
	suspendedObjects: GameObject[] = [];

	skewX = 0;
	skeyY = 0;
	scaleX = 1;
	scaleY = 1;

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

	addManagerForPruning (objectManager: GameObjectManager) {
		this.pruneList.push(objectManager);
	}

	// getTransformMatrix () {
	// 	// var m = new Matrix(this.shearMatrix);
	// 	// m.multiplyBy(this.scaleMatrix);
	// 	// m.multiplyBy(this.rotMat);
	// 	return this.transformMatrix;
	// }

	// update (delta) {
	// 	super.update(delta);
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
	// }
}

export default CameraSystem;
