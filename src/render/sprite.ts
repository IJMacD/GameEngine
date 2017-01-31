import GameComponent from '../core/GameComponent';
import CanvasRenderSystem from './CanvasRenderSystem';
import { Texture } from '../core/Game';

  /**
   * Component for rendering backgrounds for example.
   * @extends {GameComponent}
   * @param {RenderSystem} renderSystem - Where to draw.
   * @param {object} texture - A texture object i.e {image: new Image(), width: 0, height: 0}
   * @param {array} bounds - How far and wide to render the images. Guaranteed to cover bounds.
   * @memberof Sprite
   */
  export class TileComponent extends GameComponent{
    renderSystem: CanvasRenderSystem;
    texture: Texture;

    constructor (renderSystem, texture, bounds) {
      super();

      this.renderSystem = renderSystem;
      this.texture = texture;
      this.bounds = bounds;
    }

    update (parent, delta) {
      var renderSystem = this.renderSystem,
          texture = this.texture,
          bounds = this.bounds,
          dx = texture.width,
          dy = texture.height,
          startX = parent.position[0] % dx,
          startY = parent.position[1] % dy,
          x,
          y = bounds[1],// + startY - dy,
          width = bounds[2],
          height = bounds[3],
          render = function(texture, x, y){
            return function(context){
              context.drawImage(texture.image, x, y);
            };
          };
      for(; y < height + dy; y += dy){
        for(x = bounds[0] + startX - dx; x < width + dx; x += dx){
          renderSystem.push(render(texture, x, y));
        }
      }
    }
  }

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
  export class SpriteRenderingComponent extends GameComponent {
    renderSystem: CanvasRenderSystem;
    layer: number;
    sprite: Sprite;

    constructor (renderSystem: CanvasRenderSystem, layer: number, sprite: Sprite){
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

  /**
   * Animate through a sequence of sprites.
   * @extends {GameComponent}
   * @param {number} duration - Default duration if sprites do no contain their own intrinsic duration.
   * @param {Sprite[]} sprites - Array of sprite objects.
   * @memberof Sprite
   */
  export class SpriteAnimationComponent extends GameComponent {
    duration: number;
    spriteIndex: number;
    playing: boolean;
    sprites: Sprite[];

    constructor (duration, sprites) {
      super();
      this.duration = duration;
      this.spriteIndex = 0;
      this.playing = true;
      this.sprites = sprites;
    }

    init (parent) {
      if(this.sprites) {
        parent.sprites = this.sprites;
      }
      if(parent.sprites.length){
        parent.sprite = parent.sprites[0];
      }
      parent.spriteCountdown = (parent.sprite && parent.sprite.d) || this.duration;
    }

    update (parent, delta) {
      var spriteCount = parent.sprites.length,
          sprite,
          duration;

      if(this.playing){
        parent.spriteCountdown -= delta;
        if(parent.spriteCountdown <= 0){
          // TODO: Possible divide by zero
          this.spriteIndex = (this.spriteIndex + 1) % spriteCount;
          sprite = parent.sprites[this.spriteIndex];
          parent.sprite = sprite;
          duration = sprite.d || this.duration;
          parent.spriteCountdown = duration;
        }
      }
    }

    /**
     * Start the animation.
     */
    play() {
      this.playing = true;
    }

    /**
     * Stop the animation and reset the frame to the first sprite.
     */
    stop () {
      this.playing = false;
      this.spriteIndex = 0;
    }

    /**
     * Pause the animation.
     */
    pause () {
      this.playing = false;
    }
  }

export class Sprite {
  /** Texture object */
  t: Texture;
  /** X-offset of sprite in spritesheet */
  x: number;
  /** Y-offset of sprite in spritesheet */
  y: number;
  /** width - width of sprite */
  w: number;
  /** height - height of sprite */
  h: number;
  /** ox - origin x-offset, so sprite can be visually centred on parent's position */
  ox: number;
  /** oy - origin y-offset, so sprite can be visually centred on parent's position */
  oy: number;
  /** d - (optional) duration of sprite for animation */
  d?: number;

  /**
   * Convenience method to generate a set of sprite objects based on a template and a spritesheet.
   * @param {object} sprite - The sprite template.
   * @param {number} rows - Number of rows in the sprite sheet.
   * @param {number} cols - Number of columns in the sprite sheet.
   * @return {Sprite[]}
   */
  static generateSpriteSheet (sprite: Sprite, rows: number, cols: number){
    var out: Sprite[] = [],
        i,
        j;
    for(i=0; i<rows; i++){
      for(j=0; j<cols; j++){
        out.push({
          t: sprite.t,
          x: j*sprite.w,
          y: i*sprite.h,
          w: sprite.w,
          h: sprite.h,
          ox: sprite.ox,
          oy: sprite.oy,
          d: sprite.d
        });
      }
    }
    return out;
  }
}
