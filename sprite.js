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
          x = bounds[0] + startX - dx,
          y = bounds[1],// + startY - dy,
          width = bounds[2],
          height = bounds[3],
          render = function(texture, x, y){
            return function(context){
              context.drawImage(texture.image, x, y);
            };
          };
      for(; y < height + dy; y += dy){
        for(; x < width + dx; x += dx){
          renderSystem.push(render(texture, x, y));
        }
      }
    }
  }

  export class SpriteRenderingComponent extends GameComponent {
    constructor (renderSystem, layer){
      super();

      this.renderSystem = renderSystem;
      this.layer = layer;
    }

    update (parent, delta) {
      var sprite = parent.sprite,
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
    constructor (duration) {
      super();
      this.duration = duration;
      this.spriteIndex = 0;
      this.playing = true;
    }

    init (parent) {
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
          oy: sprite.oy
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
