import { GameComponent } from './core';

  export class TileComponent extends GameComponent{
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
   * Sprite Object Definition
   * ------------------------
   *
   * let sprite = {
   *    t:  texture object (i.e. {image: new Image(), width: 0, height: 0, loaded: false})
   *    x:  X-offset of sprite in spritesheet
   *    y:  Y-offset of sprite in spritesheet
   *    w:  width of sprite
   *    h:  height of sprite
   *    ox: origin x-offset, so sprite can be centred on parent's position
   *    oy: origin y-offset, so sprite can be centred on parent's position
   *    d:  (optional) duration of sprite for animation
   * }
   */

  /**
   * Component renders a sprite for a parent object.
   *
   * Component can either contain its own sprite or use one provided on the parent.
   * In the case where both component and parent have sprites, the one on the parent
   * is prefered.
   */
  export class SpriteRenderingComponent extends GameComponent {
    constructor (renderSystem, layer, sprite){
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

  export class SpriteAnimationComponent extends GameComponent {
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

    play() {
      this.playing = true;
    }

    stop () {
      this.playing = false;
      this.spriteIndex = 0;
    }

    pause () {
      this.playing = false;
    }
  }

  export const Sprite = {};

  Sprite.generateSpriteSheet = function(sprite, rows, cols){
    var out = [],
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
  };

  /**
   * This component is not to be used any more. Use Sprite animation component instead
   * @deprecated
   */
  export function AnimatedSpriteComponent(images, speed){
    this.images = images;
    this.delay = 1000 / speed;
    this.lastChange = 0;
    this.imageIndex = 0;
  }
  AnimatedSpriteComponent.prototype = new GameComponent();
  AnimatedSpriteComponent.prototype.update = function(parent, delta) {
    if(this.lastChange > this.delay){
      this.imageIndex = (this.imageIndex + 1) % this.images.length;
      parent.sprite = this.images[this.imageIndex];
      this.lastChange = 0;
    } else {
      this.lastChange += delta;
    }
  };

  /**
   * This component is not to be used any more. Use other components instead
   * @deprecated
   */
  export function CanvasSpriteRenderingComponent(renderSystem){
    this.renderSystem = renderSystem;
  }
  CanvasSpriteRenderingComponent.prototype = new GameComponent();
  CanvasSpriteRenderingComponent.prototype.update = function(parent, delta) {
    this.renderSystem.push(function(context){
      var x = parent.position[0],
          y = parent.position[1],
          w = parent.sprite.width,
          h = parent.sprite.height;
      context.translate(x,y);
      context.rotate(parent.rotation);
      context.drawImage(parent.sprite,-w/2,-h/2);
    });
  };
