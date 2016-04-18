var GE = (function(GE){
  "use strict";

  GE.Comp = GE.Comp || {};

  var GameObject = GE.GameObject,
      GameComponent = GE.GameComponent,
      GEC = GE.Comp,

      STATE_PAUSED = 0,
      STATE_PLAYING = 1,
      STATE_DEAD = 2;

  /**
   * Utility class for things such as bootstrapping Game
   */
  function Game(options) {
    var width,
        height,
        self = this;

    this.canvas = options.canvas;

    width = options.width || this.canvas.width;
    height = options.height || this.canvas.height;

    this.canvas.width = width;
    this.canvas.height = height;

    // Init some properties
    this.root = new GE.GameObjectManager();
    this.textures = [];

    // Number of resources currently pending
    this._toLoad = 0;
    this._startPromise = new Promise(function(resolve, reject) {
      self._readyToStart = resolve;
      self._failedToStart = reject;
    });
    this._lastTime = 0;
  }
  GE.Game = Game;

  Game.prototype.loadTextures = function (texturePaths) {
    this._toLoad += texturePaths.length;
    var self = this;
    return texturePaths.map(function(path){
      var texture = {};
      texture.image = new Image();
      texture.image.onload = function() {
         texture.width = texture.image.width;
         texture.height = texture.image.height;
         texture.loaded = true;
         self._resourceLoaded(texture);
      };
      texture.image.onerror = function(){
        self._failedToStart(new Error());
      }
      texture.image.src = path;
      self.textures.push(texture);
      return texture;
    });
  };

  Game.prototype.start = function (resolve, reject) {
    this._startPromise.then(resolve, reject);

    this.state = STATE_PLAYING;

    this._loop();
  };

  Game.prototype.getDefaultCamera = function () {
    this.cameraSystem = new GE.CameraSystem();
    this.cameraSystem.setPosition(this.canvas.width / 2, this.canvas.height / 2);
    return this.cameraSystem;
  };

  /**
   * Must call getDefaultCamera before this method
   */
  Game.prototype.getDefaultRenderer = function () {
    var context = this.canvas.getContext("2d");
    return new GE.CanvasRenderSystem(context, this.cameraSystem);
  };

  Game.prototype.getDefaultWorld = function () {
    var bounds = [0, 0, this.canvas.width, this.canvas.height];
    return new GE.WorldSystem(bounds);
  };

  /**
   * Must call getDefaultCamera before this method
   */
  Game.prototype.getDefaultInput = function () {
    // params are: (screen, keyboard, camera)
    // Input system needs a screen it can call width() and height() on
    return new GE.InputSystem($(this.canvas), document, this.cameraSystem);
  };

  Game.prototype._loop = function () {
    var self = this;

    loop(self._lastTime);

    function loop(time){
      try {
        self.root.update(Math.min(time - self._lastTime,100));

        if(self.state == STATE_PLAYING){
          requestAnimationFrame(loop);
        }
        self._lastTime = time;
      } catch (e){
        console.error(e.stack);
      }
    }
  };

  Game.prototype._resourceLoaded = function (resource) {
    this._toLoad--;
    if(this._toLoad == 0){
      this._readyToStart();
    }
  };

  return GE;
}(GE || {}));
