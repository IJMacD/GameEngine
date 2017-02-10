import GameComponent from '../core/GameComponent.ts';

/**
 * This component registers the parent object with collision system.
 * It can handle configurations where the parent is both attack and vulnerable.
 * @extends {GameComponent}
 * @param {CollisionSystem} collisionSystem - Which CollisionSystem to report to
 * @param {boolean} attack - Can this object attack?
 * @param {boolean} vulnerable - Is this object vulnerable?
 * @memberof Collision
 */
class CollisionComponent extends GameComponent {

	constructor (collisionSystem, attack, vulnerable) {
		super();

		this.collisionSystem = collisionSystem;
		this.attack = attack;
		this.vulnerable = vulnerable;
	}

	update (parent, delta){
		if(this.attack)
			this.collisionSystem.addAttackObject(parent);

		if(this.vulnerable)
			this.collisionSystem.addVulnerableObject(parent);
	}
}

export default CollisionComponent;
