var GE = (function(GE){

  GE.Comp = GE.Comp || {};

  var GameObject = GE.GameObject,
      GameComponent = GE.GameComponent,
      GEC = GE.Comp;

  GE.GameComponent.create(function TileComponent(renderSystem, texture, bounds) {
    this.renderSystem = renderSystem;
    this.texture = texture;
    this.bounds = bounds;
  }, {
    update: function(parent, delta){
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
  });

  GE.GameComponent.create(function SpriteRenderingComponent(renderSystem, layer){
    this.renderSystem = renderSystem;
    this.layer = layer;
  }, {
    update: function(parent, delta) {
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
  });

  GE.GameComponent.create(function SpriteAnimationComponent(duration){
      this.duration = duration;
      this.spriteIndex = 0;
      this.playing = true;
  }, {
    init: function(parent){
      if(parent.sprites.length){
        parent.sprite = parent.sprites[0];
      }
      parent.spriteCountdown = (parent.sprite && parent.sprite.d) || this.duration;
    },
    update: function(parent, delta) {
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
    },
    play: function() {
      this.playing = true;
    },
    stop: function () {
      this.playing = false;
      this.spriteIndex = 0;
    },
    pause: function () {
      this.playing = false;
    }
  });

  GE.Sprite = GE.Sprite || {};

  GE.Sprite.generateSpriteSheet = function(sprite, rows, cols){
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
  function AnimatedSpriteComponent(images, speed){
    this.images = images;
    this.delay = 1000 / speed;
    this.lastChange = 0;
    this.imageIndex = 0;
  }
  GEC.AnimatedSpriteComponent = AnimatedSpriteComponent;
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
  function CanvasSpriteRenderingComponent(renderSystem){
    this.renderSystem = renderSystem;
  }
  GEC.CanvasSpriteRenderingComponent = CanvasSpriteRenderingComponent;
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

  return GE;
}(GE || {}));
