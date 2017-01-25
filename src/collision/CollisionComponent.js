import GameComponent from '../core/GameComponent';

/**
 * Component to interface with collision system. Handles both attack
 * and vulnerable configurations.
 * @class CollisionComponent
 * @extends {GameComponent}
 * @param {CollisionSystem} collisionSystem - Which CollisionSystem to report to
 * @param {boolean} attack - Can this object attack?
 * @param {boolean} vulnerable - Is this object vulnerable?
 */
export default class CollisionComponent extends GameComponent {

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
