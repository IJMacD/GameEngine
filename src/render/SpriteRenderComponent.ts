import GameComponent from '../core/GameComponent';
import CanvasRenderSystem from './CanvasRenderSystem';
import Sprite from './Sprite';

/**
 * Component renders a sprite for a parent object.
 *
 * Component can either contain its own sprite or use one provided on the parent.
 * In the case where both component and parent have sprites, the one on the parent
 * is prefered.
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Target renderer
 * @param {number} layer - optional layer to render this sprite on to.
 * @param {Sprite} sprite - Sprite object
 * @memberof Sprite
 */
export default class SpriteRenderComponent extends GameComponent {
  renderSystem: CanvasRenderSystem;
  layer: number;
  sprite: Sprite;

  constructor (renderSystem: CanvasRenderSystem, sprite: Sprite, layer = 1){
    super();

    this.renderSystem = renderSystem;
    this.layer = layer;
    this.sprite = sprite;
  }

  update (parent, delta) {
    super.update(delta);

    var sprite = this.sprite || parent.sprite,
        image = sprite && sprite.t.image;

    if(sprite){
      this.renderSystem.push(function(context){
        var x = parent.position[0],
            y = parent.position[1],
            w = sprite.w,
            h = sprite.h;
        context.translate(x,y);
        context.rotate(parent.rotation);
        context.drawImage(image, sprite.x, sprite.y, w, h, -sprite.ox, -sprite.oy, w, h);
      }, this.layer);
    }
  }
}
