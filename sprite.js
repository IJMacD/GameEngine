var GE = (function(GE){

  GE.Comp = GE.Comp || {};

  var GameObject = GE.GameObject,
      GameComponent = GE.GameComponent,
      GEC = GE.Comp;

  GE.GameComponent.create(function TileComponent(renderSystem, sprite, bounds) {
    this.renderSystem = renderSystem;
    this.sprite = sprite;
    this.bounds = bounds;
  }, {
    update: function(parent, delta){
      var renderSystem = this.renderSystem,
          sprite = this.sprite,
          bounds = this.bounds,
          dx = sprite.width,
          dy = sprite.height,
          startX = parent.position[0] % dx,
          startY = parent.position[1] % dy,
          x = bounds[0] + startX - dx,
          y = bounds[1],// + startY - dy,
          width = bounds[2],
          height = bounds[3],
          render = function(sprite, x, y){
            return function(context){
              context.drawImage(sprite, x, y);
            };
          };
      for(; y < height + dy; y += dy){
        for(; x < width + dx; x += dx){
          renderSystem.push(render(sprite, x, y));
        }
      }
    }
  });

  GE.GameComponent.create(function SpriteSheetRenderingComponent(renderSystem){
    this.renderSystem = renderSystem;
  }, {
    update: function(parent, delta) {
      var frame = parent.sprite[parent.spriteIndex%parent.sprite.length],
          image = frame && frame.i;
      this.renderSystem.push(function(context){
        var x = parent.position[0],
            y = parent.position[1],
            w = frame.w,
            h = frame.h;
        context.translate(x,y);
        context.rotate(parent.rotation);
        context.drawImage(image, frame.x, frame.y, w, h, -frame.ox, -frame.oy, w, h);
      });
    }
  });

  GE.GameComponent.create(function SpriteAnimationComponent(duration){
      this.duration = duration;
      this.countdown = duration;
  }, {
    update: function(parent, delta) {
      var spriteCount = parent.sprite.length;
      this.countdown -= delta;
      if(this.countdown < 0){
        parent.spriteIndex = (parent.spriteIndex + 1) % spriteCount;
        this.countdown = this.duration;
      }
    }
  });

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

  return GE;
}(GE || {}));
