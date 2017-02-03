$(function() {

  "use strict";

  function ParticleRenderingComponent(renderSystem){
    this.renderSystem = renderSystem;
  }
  ParticleRenderingComponent.prototype = new GE.GameComponent();
  ParticleRenderingComponent.prototype.update = function(parent, delta) {
    this.renderSystem.push(function(context){
      context.fillStyle = parent.colour || "#000000";
      context.beginPath();
      context.arc(parent.position[0],parent.position[1],2,0,Math.PI*2,false);
      context.fill();
    });
  };

  var GEC = GE.Comp,

      /* Constants */
      GAME_WIDTH = 1280,
      GAME_HEIGHT = 960,

      /* Bootstrap */
      canvas = $('#surface')[0],
      context = canvas.getContext("2d"),

      game = new GE.Game({
        canvas: canvas,
        width: GAME_WIDTH,
        height: GAME_HEIGHT
      }),

      worldSystem = game.getDefaultWorld(),
      cameraSystem = game.getDefaultCamera(),
      renderSystem = game.getDefaultRenderer(),
      inputSystem = game.getDefaultInput(),

      // Shared Components
      particleRenderingComponent = new ParticleRenderingComponent(renderSystem),

      particle,
      particleCount = 200,
      particleSep = GAME_WIDTH / particleCount,
      particleManager = new GE.GameObjectManager();

  function addParticleSet(easing, colour) {
    var particle,
        particleSet = new GE.GameObjectManager(),
        i, t, x, y;

    for(i = 0; i <= particleCount; i++){
      t = i / particleCount;
      x = t * GAME_WIDTH;
      y = easing(t) * GAME_HEIGHT;

      particle = new GE.GameObject();
      particle.setPosition(x,y,0);
      particle.colour = colour;

      particle.addComponent(particleRenderingComponent);

      particleSet.addObject(particle);
    }

    particleManager.addObject(particleSet);
  }

  addParticleSet(GEC.PositionInterpolatorComponent.linear, "#000000");
  addParticleSet(GEC.PositionInterpolatorComponent.quadOut, "#0000FF");
  addParticleSet(GEC.PositionInterpolatorComponent.backIn, "#0080FF");
  addParticleSet(GEC.PositionInterpolatorComponent.backOut, "#00FFFF");
  addParticleSet(GEC.PositionInterpolatorComponent.backInOut, "#FFFF00");
  addParticleSet(GEC.PositionInterpolatorComponent.elasticIn, "#FF8000");
  addParticleSet(GEC.PositionInterpolatorComponent.elasticOut, "#FF0000");
  addParticleSet(GEC.PositionInterpolatorComponent.backInOut, "#FFFF00");

  cameraSystem.setScale(0.8);

  game.root.addObject(inputSystem);

  game.root.addObject(particleManager);

  game.root.addObject(worldSystem);
  game.root.addObject(cameraSystem);
  game.root.addObject(renderSystem);

  game.start();

});
