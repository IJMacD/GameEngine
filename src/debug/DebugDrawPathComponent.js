import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';
import vec2 from 'gl-matrix/src/gl-matrix/vec2';

const PATH_SIZE = 1000;

/**
 * Component which traces out the path of an object
 * @class DebugDrawPathComponent
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Where to draw the path
 */
export default class DebugDrawPathComponent extends GameComponent {
    constructor (renderSystem){
        super();

        this.path = [];
        this.currIndex = 0;
        this.lastVx = 0;
        this.lastVy = 0;
        this.renderSystem = renderSystem;

        this.path.length = PATH_SIZE;
    }

    update (parent, delta) {

        const px = parent.position[0],
            py = parent.position[1],
            vx = parent.velocity[0],
            vy = parent.velocity[1],
            ax = (vx - this.lastVx)/delta,
            ay = (vy - this.lastVy)/delta,
            p = this.path,
            prevIndex = (this.currIndex - 2 + PATH_SIZE) % PATH_SIZE,
            dx = Math.abs(p[prevIndex] - px),
            dy = Math.abs(p[prevIndex+1] - py);

        if(dx > 100 || dy > 100){
            p[this.currIndex] = NaN;
            p[this.currIndex+1] = NaN;
            this.currIndex = (this.currIndex + 2) % PATH_SIZE;
        }

        p[this.currIndex] = px;
        p[this.currIndex + 1] = py;

        // Draw Path

        this.renderSystem.push(ctx => {
            ctx.beginPath();

            ctx.moveTo(p[this.currIndex], p[this.currIndex+1]);

            for(let i = 2; i < PATH_SIZE; i += 2){
                let index = (this.currIndex + i) % PATH_SIZE;
                if(p[index]) {
                    ctx.lineTo(p[index], p[index+1]);
                }
                else {
                    i += 2;
                    index = (this.currIndex + i) % PATH_SIZE;
                    ctx.moveTo(p[index], p[index+1]);
                }
            }

            ctx.strokeStyle = "#CCC";
            ctx.stroke();
        });

        this.currIndex = (this.currIndex + 2) % PATH_SIZE;

        // Draw Velocity
        this.renderSystem.strokePath([px, py, px+vx*100, py+vy*100], "rgba(0,128,255,0.7)",0);

        // Draw Acceleration
        this.renderSystem.strokePath([px, py, px+ax*4e5, py+ay*4e5], "rgba(0,255,0,0.7)",0);
        this.lastVx = vx;
        this.lastVy = vy;
    }
}