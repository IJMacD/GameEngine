import GameComponent from '../core/GameComponent';

export default class DotRenderComponent extends GameComponent {
    constructor (renderSystem, color = "#000") {
        super();

        this.renderSystem = renderSystem;
        this.color = color;
    }

    update (parent, delta) {
        const b = parent.bounds;
        const p = parent.position;
        const r = parent.rotation;
        const s = parent.size;
        const c = parent.color || parent.colour || this.color;

        this.renderSystem.push(ctx => {
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.translate(p[0], p[1]);
            ctx.rotate(r);
            if(b) ctx.scale(b[2] - b[0], b[3] - b[1]);
            else if(s) ctx.scale(s, s);
            ctx.arc(0, 0, 0.5, 0, Math.PI*2, false);
            ctx.fill();
        });
    }
}
