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

     // Consumers should use lastTouch and lastKey
     // These values will persist for exactly one frame

     // Need to create these as vec3 even if we only ever intend to populate
     // them wil 2D values as other parts of the system expect 3D positions
    this.nextClick = vec3.create();
    this.lastClick = vec3.fromValues(undefined, undefined); // One off consumers should use lastTouch
    this.currentTouch = vec3.create(); // Consumers should use lastTouch

    this.touches = [];

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
    TouchClick(inputSystem.screen,
      function(e) { // Touch Start
        var offset = inputSystem.screen.offset(),
            event = e.originalEvent,
            touch = event.touches && event.touches[0],
            x = (touch ? touch.pageX : e.pageX) - offset.left,
            y = (touch ? touch.pageY : e.pageY) - offset.top;
        vec2.copy(inputSystem.nextClick, screenToWorld(inputSystem, x, y));
        vec2.copy(inputSystem.currentTouch, inputSystem.nextClick);

        inputSystem.touches.push({position: inputSystem.currentTouch});
      },
      function (e) {  // Touch End
        inputSystem.touches.length = 0;
      },
      function (e) {  // Touch Move
        // TODO: Avoid duplication!
        var offset = inputSystem.screen.offset(),
            event = e.originalEvent,
            touch = event.touches && event.touches[0],
            x = (touch ? touch.pageX : e.pageX) - offset.left,
            y = (touch ? touch.pageY : e.pageY) - offset.top;

        vec2.copy(inputSystem.currentTouch, screenToWorld(inputSystem, x, y));
      }
    );

    $(inputSystem.keyboard).on("keydown", function(e) {
      inputSystem.nextKey = e.which;
    });
  };

  function TouchClick(sel, fncStart, fncEnd, fncMove) {
    [
      'touchstart mousedown',
      'touchend mouseup',
      'touchmove mousemove'
    ].forEach(function (ev, i) {
      $(sel).on(ev, function(event){
          var fnc = (i == 0) ? fncStart : ((i == 1) ? fncEnd: fncMove);
          event.stopPropagation();
          event.preventDefault();
          if(event.handled !== true) {
              fnc(event);
              event.handled = true;
          } else {
              return false;
          }
      });
    })
  }

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

  var s2WV = vec2.create(),
      s2WRotMat = mat2.create();

  function screenToWorld(inputSystem, screenX, screenY){
    var cam = inputSystem.cameraSystem,
        camWidth = cam.width,
        camHeight = cam.height,
        screen = inputSystem.screen,
        screenWidth = screen.width(),
        screenHeight = screen.height(),
        screenScale = camWidth / screenWidth;

    vec2.set(s2WV,
        screenX - screenWidth / 2,
        screenY - screenHeight / 2);

    vec2.scale(s2WV, s2WV, screenScale);

    vec2.set(s2WV, s2WV[0] / cam.scaleX, s2WV[1] / cam.scaleY);

    // Rotation in 2D only makes sense around the Z-axis so that is
    // all that is handled here.
    if(cam.rotationAxis[2] == 1){
      mat2.rotate(s2WRotMat, s2WRotMat, -cam.rotation);
      vec2.transformMat2(s2WV, s2WV, s2WRotMat);
    }

    vec2.add(s2WV, s2WV, cam.position);
    return s2WV;
  };
  // Exported as Static method
  InputSystem.screenToWorld = screenToWorld;

  InputSystem.Keys = {
    "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
    a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77,
    n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90
  };

  return GE;
}(GE || {}));
