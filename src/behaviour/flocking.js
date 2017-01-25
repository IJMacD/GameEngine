import GameComponent from '../core/GameComponent';
import { vec3 } from 'gl-matrix';

// Working Vectors
const vecSeparation = vec3.create();
const vecAlign = vec3.create();
const vecCohesion = vec3.create();
const vecSpare = vec3.create();

export class FlockingComponent extends GameComponent {
    constructor (flock) {
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

// FlockingComponent Constants
FlockingComponent.NEIGHBOUR_RADIUS = 200;
FlockingComponent.SEPARATION_RADIUS = 150;
FlockingComponent.MAX_SPEED = 0.1;
FlockingComponent.COHESION_WEIGHT = 0.1 * FlockingComponent.MAX_SPEED / FlockingComponent.NEIGHBOUR_RADIUS;
FlockingComponent.ALIGN_WEIGHT = 30 * FlockingComponent.MAX_SPEED / FlockingComponent.NEIGHBOUR_RADIUS;
FlockingComponent.SEPARATION_WEIGHT = 100 / FlockingComponent.SEPARATION_RADIUS;

export class DebugFlockingComponent extends GameComponent {
    constructor (renderSystem) {
        super();

        this.renderSystem = renderSystem;
    }

    update (parent, delta) {
        this.renderSystem.push(ctx => {
            ctx.translate(parent.position[0], parent.position[1]);
            ctx.beginPath();
            ctx.arc(0, 0, FlockingComponent.NEIGHBOUR_RADIUS, 0, Math.PI * 2, false);
            ctx.strokeStyle = "#008";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, FlockingComponent.SEPARATION_RADIUS, 0, Math.PI * 2, false);
            ctx.strokeStyle = "#800";
            ctx.stroke();
        });
    }
}
