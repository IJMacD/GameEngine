import GameComponent from '../core/GameComponent';

export default class RectangleRenderComponent extends GameComponent {
    constructor (renderSystem, color = "#000") {
        super();

        this.renderSystem = renderSystem;
        this.color = color;
    }

    update (parent, delta) {
        const b = parent.bounds;
        const p = parent.position;
        const s = parent.size;
        const r = parent.rotation;
        const c = parent.color || parent.colour || this.color;

        this.renderSystem.push(ctx => {
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.translate(p[0], p[1]);
            ctx.rotate(r);
            if(b) ctx.rect(b[0], b[1], b[2] - b[0], b[3] - b[1]);
            else if(s) ctx.rect(-s/2, -s/2, s, s);
            ctx.fill();
        });
    }
}
