(function() {

  "use strict";

  var GEC = IGE.Components,

      /* Constants */
      GAME_WIDTH = 1280,
      GAME_HEIGHT = 960,
      DURATION = 3000,

      /* Bootstrap */
      canvas = document.getElementById("surface"),
      context = canvas.getContext("2d"),

      game = new IGE.Game({
        canvas: canvas,
        width: GAME_WIDTH,
        height: GAME_HEIGHT
      }),

      worldSystem = game.getDefaultWorld(),
      cameraSystem = game.getDefaultCamera(),
      renderSystem = game.getDefaultRenderer(),
      inputSystem = game.getDefaultInput(),

      // Shared Components
      particleRenderingComponent = new IGE.Components.DotRenderComponent(renderSystem),

      particle,
      particleCount = 200,
      particleManager = new IGE.GameObjectManager();

  function addParticleSet(easing, colour) {
    var particle,
        particleSet = new IGE.GameObjectManager(),
        piComponent,
        i, t, x, y;

    for(i = 0; i <= particleCount; i++){
      t = i / particleCount;
      x = t * GAME_WIDTH;
      y = easing(t) * GAME_HEIGHT;
      piComponent = new GEC.PositionInterpolatorComponent(DURATION, easing);

      particle = new IGE.GameObject();
      particle.setPosition(x, 0, 0);
      particle.colour = colour;
      particle.size = i == particleCount ? 20 : 4;

      piComponent.setPosition(x, y);

      particle.addComponent(piComponent);
      particle.addComponent(particleRenderingComponent);

      particleSet.addObject(particle);
    }

    particleManager.addObject(particleSet);
  }

  function reset () {
    particleManager.removeAll();

    addParticleSet(GEC.PositionInterpolatorComponent.linear, "#000000");
    addParticleSet(GEC.PositionInterpolatorComponent.quadOut, "#0000FF");
    addParticleSet(GEC.PositionInterpolatorComponent.backIn, "#0080FF");
    addParticleSet(GEC.PositionInterpolatorComponent.backOut, "#00FFFF");
    addParticleSet(GEC.PositionInterpolatorComponent.backInOut, "#FFFF00");
    addParticleSet(GEC.PositionInterpolatorComponent.elasticIn, "#FF8000");
    addParticleSet(GEC.PositionInterpolatorComponent.elasticOut, "#FF0000");
    addParticleSet(GEC.PositionInterpolatorComponent.backInOut, "#FFFF00");
  }

  reset();

  cameraSystem.setScale(0.8);

  game.root.addObject(inputSystem);

  game.root.addObject(particleManager);

  game.root.addObject(worldSystem);
  game.root.addObject(cameraSystem);
  game.root.addObject(renderSystem);

  game.start();

  canvas.addEventListener("click", () => {
    reset();
  });

}());
