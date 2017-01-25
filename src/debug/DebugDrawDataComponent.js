import GameComponent from '../core/GameComponent';

let DebugDrawDataComponentCount = 0;

/**
 * Component to draw object statistics on to the screen.
 * @class DebugDrawDataComponent
 * @extends {GameComponent}
 * @param {CanvasRenderingContext2D} context - A raw canvas 2d context
 * @param {string} desc - A description to show
 */
export default class DebugDrawDataComponent extends GameComponent {
    constructor (context, desc) {
        super();

        this.context = context;
        this.desc = desc;
        this.xOffset = DebugDrawDataComponentCount * 70 + 10;

        DebugDrawDataComponentCount++;

        this.maxX = this.maxY = this.maxVx = this.maxVy = this.maxV = 0;
    }

    update (parent, delta) {
        if(DEBUG){
            this.maxX = Math.max(this.maxX, parent.position.x);
            this.maxY = Math.max(this.maxY, parent.position.y);
            this.maxVx = Math.max(this.maxVx, parent.velocity.x);
            this.maxVy = Math.max(this.maxVy, parent.velocity.y);
            this.maxV = Math.max(this.maxV,parent.velocity.magnitude());
            this.context.fillStyle = "#999";
            var y = 0;
            if(typeof this.desc == "string")
                this.context.fillText(this.desc, this.xOffset, y+=15);
            this.context.fillText("x: " + parent.position.x.toFixed(), this.xOffset, y+=15);
            this.context.fillText("y: " + parent.position.y.toFixed(), this.xOffset, y+=15);
            this.context.fillText("vx: " + parent.velocity.x.toFixed(3), this.xOffset, y+=15);
            this.context.fillText("vy: " + parent.velocity.y.toFixed(3), this.xOffset, y+=15);
            this.context.fillText("v: " + parent.velocity.magnitude().toFixed(3), this.xOffset, y+=15);
            this.context.fillText("max x: " + this.maxX.toFixed(), this.xOffset, y+=15);
            this.context.fillText("max y: " + this.maxY.toFixed(), this.xOffset, y+=15);
            this.context.fillText("max vx: " + this.maxVx.toFixed(3), this.xOffset, y+=15);
            this.context.fillText("max vy: " + this.maxVy.toFixed(3), this.xOffset, y+=15);
            this.context.fillText("max v: " + this.maxV.toFixed(3), this.xOffset, y+=15);
        }
    }
}