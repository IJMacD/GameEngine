import GameObject from '../core/GameObject.ts';
import GameComponent from '../core/GameComponent.ts';
import vec3 from 'gl-matrix/src/gl-matrix/vec3';

// Working Vectors
const vecSeparation = vec3.create();
const vecAlign = vec3.create();
const vecCohesion = vec3.create();
const vecSpare = vec3.create();

/**
 * <p>Objects with this component will try to 'flock' together. There are three effects Working
 * together to produce flocking behaviour.
 * <p>The parent object will be attracted to the average position of objects within the
 * {@link FlockingComponent.NEIGHBOUR_RADIUS}, this is called cohesion.
 * <p>The parent object wil try to move in the average direction of all the other objects within
 * the neighbourhood, this is called alignment.
 * <p>The parent object will try to move away from object with the
 * {@link FlockingComponent.SEPARATION_RADIUS}, this is called separation.
 * @param {array} flock - An array of game objects which are considered to be in the same flock.
 */
export default class FlockingComponent extends GameComponent {

    flock: GameObject[];

    /** Size of sphere of influence. */
    static NEIGHBOUR_RADIUS = 200;
    /** Size of replulsion sphere. */
    static SEPARATION_RADIUS = 150;
    /** Lock speed to maximum magnitude. */
    static MAX_SPEED = 0.1;
    /** Coefficient controlling desire to move to same position. */
    static COHESION_WEIGHT = 0.1 * FlockingComponent.MAX_SPEED / FlockingComponent.NEIGHBOUR_RADIUS;
    /** Coefficient controlling desire to match velocity. */
    static ALIGN_WEIGHT = 30 * FlockingComponent.MAX_SPEED / FlockingComponent.NEIGHBOUR_RADIUS;
    /** Coefficient controlling desire to move away from others. */
    static SEPARATION_WEIGHT = 100 / FlockingComponent.SEPARATION_RADIUS;

    constructor (flock: GameObject[]) {
        super();
        this.flock = flock;
    }

    update (parent, delta) {
        vec3.set(vecCohesion, 0, 0, 0);
        vec3.set(vecAlign, 0, 0, 0);
        vec3.set(vecSeparation, 0, 0, 0);
        vec3.set(vecSpare, 0, 0, 0);

        let count = 0;
        const length = this.flock.length;

        for(let i = 0; i < length; i++){
            const other = this.flock[i];
            const dist = vec3.dist(other.position, parent.position);

            if(dist > 0 && dist < FlockingComponent.NEIGHBOUR_RADIUS){
                vec3.add(vecCohesion, vecCohesion, other.position);
                vec3.add(vecAlign, vecAlign, other.velocity);

                if(dist < FlockingComponent.SEPARATION_RADIUS){
                    vec3.subtract(vecSpare, parent.position, other.position);
                    vec3.normalize(vecSpare, vecSpare);
                    vec3.scaleAndAdd(vecSeparation, vecSeparation, vecSpare, 1 / dist);
                }

                count++;
            }
        }

        if(count > 0){
            vec3.scale(vecCohesion, vecCohesion, 1 / count);
            vec3.subtract(vecCohesion, vecCohesion, parent.position);
            vec3.scaleAndAdd(parent.velocity, parent.velocity, vecCohesion, FlockingComponent.COHESION_WEIGHT);

            vec3.scaleAndAdd(parent.velocity, parent.velocity, vecAlign, FlockingComponent.ALIGN_WEIGHT / count);

            vec3.scaleAndAdd(parent.velocity, parent.velocity, vecSeparation, FlockingComponent.SEPARATION_WEIGHT / count);

            var mag = vec3.length(parent.velocity);

            if(mag > FlockingComponent.MAX_SPEED){
                vec3.scale(parent.velocity, parent.velocity, FlockingComponent.MAX_SPEED / mag);
            }
        }
    }
}
