var GE = (function(GE){
  "use strict";

  GE.Comp = GE.Comp || {};

  var GameObject = GE.GameObject,
      GameComponent = GE.GameComponent,
      GEC = GE.Comp;

  /**
   * InputSystem's job is to keep track of most recent user input to provide
   * filtering and rate-limiting etc. Inputs should be passed on the the rest
   * of game in World co-ordinates rather than screen co-ordinates so the
   * InputSystem is responsible for mapping between the two.
   *
   * TODO: Right now this is very 2D orientated. Try to make more generic
   *
   * @param screen Should be something relevant with width()/height() methods
   * @param keyboard Something to watch for keyboard events on e.g. document
   * @param cameraSystem A camera to be used for mapping co-ordinates
   */
  function InputSystem(screen, keyboard, cameraSystem) {
    GameObject.call(this); // Remember parent constructor

    this.screen = screen;
    this.keyboard = keyboard;
    this.cameraSystem = cameraSystem;

     // Consumers should use lastClick and lastKey
     // These values will persist for exactly one frame

    this.nextClick = vec2.create();
    this.lastClick = vec2.fromValues(undefined, undefined); // Consumers should use lastClick

    this.nextKey = null;
    this.lastKey = null; // Consumers should use lastKey

    initScreen(this);
  }
  GE.InputSystem = InputSystem;
  InputSystem.prototype = new GE.GameObject();

  InputSystem.prototype.update = function(delta) {
    GE.GameObject.prototype.update.call(this, delta);

    // Cycle the next event to last event property here so that
    // last event persists for exactly one frame.

    // Click
    vec2.copy(this.lastClick, this.nextClick);
    // Consumers should interpret (NaN, NaN) as no click
    vec2.set(this.nextClick, undefined, undefined);

    // Keypress
    this.lastKey = this.nextKey;
    // Consumers should interpret (null) as no keypress
    this.nextKey = null;
  };

  function initScreen(inputSystem){
    $(inputSystem.screen).on("click", function(e) {
      var x = e.offsetX,
          y = e.offsetY;
      vec2.copy(inputSystem.nextClick, screenToWorld(inputSystem, x, y));
    });

    $(inputSystem.keyboard).on("keydown", function(e) {
      inputSystem.nextKey = e.which;
    });
  };

  function worldToScreen(inputSystem, worldX, worldY){
    // TODO: Check whether or not this code is outdated
    var cam = inputSystem.cameraSystem,
        screen = inputSystem.screen,
        v = cam.worldVec.set(worldX, worldY);
    v.subtract(cam.position);
    v.leftMultiply(cam.shearMatrix);
    v.leftMultiply(cam.scaleMatrix);
    v.leftMultiply(cam.rotMat);
    v.add(screen.width / 2, screen.height / 2);
    return v;
  };

  function screenToWorld(inputSystem, screenX, screenY){
    // Creating vectors in here *should* be OK as I assume this method
    // won't be called too often as it will usually be as a result of
    // user interaction
    var v = vec2.create(),
        rotMat = mat2.create(),
        cam = inputSystem.cameraSystem,
        camWidth = cam.width,
        camHeight = cam.height,
        screen = inputSystem.screen,
        screenWidth = screen.width(),
        screenHeight = screen.height(),
        screenScale = camWidth / screenWidth;

    vec2.set(v,
        screenX - screenWidth / 2,
        screenY - screenHeight / 2);

    vec2.scale(v, v, screenScale);

    vec2.set(v, v[0] / cam.scaleX, v[1] / cam.scaleY);

    // Rotation in 2D only makes sense around the Z-axis so that is
    // all that is handled here.
    if(cam.rotationAxis[2] == 1){
      mat2.rotate(rotMat, rotMat, -cam.rotation);
      vec2.transformMat2(v, v, rotMat);
    }

    vec2.add(v, v, cam.position);
    return v;
  };
  // Exported as Static method
  InputSystem.screenToWorld = screenToWorld;

  return GE;
}(GE || {}));
