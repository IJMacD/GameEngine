import GameObject from '../core/GameObject';

/**
 * This system's purpose is to accept 'attack' and 'vulnerable' bounds to be submitted
 * then once per frame sweep these to find intersections. Any which are found are then
 * reported to the respective objects.
 * @class CollisionSystem
 * @extends {GameObject}
 */
export default class CollisionSystem extends GameObject {
	constructor () {
		super();

		this.attackObjects = [];
		this.vulnerableObjects = [];
	}

    /**
     * Add an object which can 'attack'
     * @param {GameObject} object
     */
	addAttackObject (object){
		this.attackObjects.push(object);
	}

    /**
     * Add an object which is 'vulnerable'
     * @param {GameObject} object
     */
	addVulnerableObject (object){
		this.vulnerableObjects.push(object);
	}

	update (delta) {
		const attackCount = this.attackObjects.length;
		const vulnerableCount = this.vulnerableObjects.length;


		for(let i = 0; i < attackCount; i++){
			const attack = this.attackObjects[i];
			const ax = attack.position[0];
			const ay = attack.position[1];
			const ab = attack.bounds;
			const attackBounds = [
				ax + ab[0],
				ay + ab[1],
				ax + ab[2],
				ay + ab[3]
			];

			for(let j = 0; j < vulnerableCount; j++){
				const vulnerable = this.vulnerableObjects[j];
				const vx = vulnerable.position[0];
				const vy = vulnerable.position[1];
				const vb = vulnerable.bounds;
				const vulnerableBounds = [
					vx + vb[0],
					vy + vb[1],
					vx + vb[2],
					vy + vb[3]
				];

				if(attack === vulnerable) {
					continue;
				}

				if(attackBounds[0] < vulnerableBounds[2] &&
					attackBounds[1] < vulnerableBounds[3] &&
					attackBounds[2] > vulnerableBounds[0] &&
					attackBounds[3] > vulnerableBounds[1] ) {

					attack.fire("attack", vulnerable);
					vulnerable.fire("attackedBy", attack);
				}
			}
		}
		this.attackObjects.length = 0;
		this.vulnerableObjects.length = 0;
	}
}
