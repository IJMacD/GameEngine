import GameComponent from '../core/GameComponent';

export default class TextRenderComponent extends GameComponent {
  constructor (renderSystem, text, x, y, font = "10px sans-serif", color = "#000") {
    super();
    this.renderSystem = renderSystem;
    this.text = text;
    this.font = font;
    this.color = color;
    this.setPosition(x, y);
  }
  update (parent, delta) {
    this.renderSystem.push(ctx => {
      ctx.translate(parent.position[0], parent.position[1]);
      ctx.translate(this.position[0], this.position[1]);
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.fillText(this.text, 0, 0);
    });
  }
}
