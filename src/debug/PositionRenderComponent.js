import GameComponent from '../core/GameComponent';

export default class PositionRenderComponent extends GameComponent {
  constructor (renderSystem, font = "10px sans-serif", color = "#000") {
    super();
    this.renderSystem = renderSystem;
    this.font = font;
    this.color = color;
    // Font should start with an integer we can use as a size for the crosshairs
    this.size = parseInt(font, 10);
  }
  update (parent, delta) {
    const p = parent.position;
    const size = this.size;

    this.renderSystem.push(ctx => {
      ctx.translate(p[0], p[1]);
      ctx.strokeStyle = "#888";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.fillText(`${p[0]|0}, ${p[1]|0}`, size/2, -size/2);
    });
  }
}
