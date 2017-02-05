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

  let row = 0;

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

    particleManager.addComponent(new GEC.TextRenderComponent(renderSystem, easing.name, -150, row * 32, "30px sans-serif", colour));
    row++;
  }

  function reset () {
    particleManager.removeAll();
    particleManager.removeComponentByName("TextRenderComponent");
    row = 0;

    addParticleSet(IGE.Easing.Linear, "#000000");
    addParticleSet(IGE.Easing.QuadIn, "#0080FF");
    addParticleSet(IGE.Easing.QuadOut, "#0000FF");
    addParticleSet(IGE.Easing.Smooth, "#8000FF");
    addParticleSet(IGE.Easing.BackIn, "#0080FF");
    addParticleSet(IGE.Easing.BackOut, "#00FFFF");
    addParticleSet(IGE.Easing.BackInOut, "#FFFF00");
    addParticleSet(IGE.Easing.ElasticIn, "#FF8000");
    addParticleSet(IGE.Easing.ElasticOut, "#FF0000");
    addParticleSet(IGE.Easing.ElasticInOut, "#80FF00");
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
