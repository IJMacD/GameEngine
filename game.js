import { GameObject, GameComponent, GameObjectManager } from './core';
import CameraSystem from './camera';
import CanvasRenderSystem from './canvas-render';
import WorldSystem from './world';
import InputSystem from './input';

  var STATE_PAUSED = 0,
      STATE_PLAYING = 1,
      STATE_STOPPED = 2,
      STATE_DEAD = 3,

      _lastTime = 0,
      _raf = window.requestAnimationFrame || function(callback, element) {
          var currTime = new Date().getTime();
          var timeToCall = Math.max(0, 16 - (currTime - _lastTime));
          var id = window.setTimeout(function() { callback(currTime + timeToCall); },
            timeToCall);
          _lastTime = currTime + timeToCall;
          return id;
      };

  /**
   * Utility class for things such as bootstrapping Game
   */
  export default function Game(options) {
    this.canvas = options.canvas;

    this.width = options.width || (this.canvas && this.canvas.width);
    this.height = options.height || (this.canvas && this.canvas.height);

    if(this.canvas){
      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    // Init some properties
    this.root = new GameObjectManager();
    this.textures = [];
    this.frame = 0;
    this.time = 0;
    this.score = 0;
    this.level = 0;

    // Number of resources currently pending
    this._toLoad = 0;
    this._lastTime = 0;
    this._events = {};
  }

  Game.prototype.setCanvas = function (canvas) {
    this.canvas = canvas;

    this.width = this.width || this.canvas.width;
    this.height = this.height || this.canvas.height;

    this.canvas.width = this.width;
    this.canvas.height = this.height;
  };

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
         _resourceLoaded(self, texture);
      };
      texture.image.onerror = function(){
        throw new Error("Failed to load a texture: " + path);
      }
      texture.image.src = path;
      self.textures.push(texture);
      return texture;
    });
  };

  Game.prototype.start = function () {

    this.nextLevel();

    this.state = STATE_PLAYING;

    _loop(this);
  };

  Game.prototype.stop = function () {

    this.state = STATE_STOPPED;
  };

  Game.prototype.getDefaultCamera = function () {
    var width = this.canvas.width,
        height = this.canvas.height;
    this.cameraSystem = new CameraSystem(width, height);
    this.cameraSystem.setPosition(width / 2, height / 2);
    return this.cameraSystem;
  };

  /**
   * Must call getDefaultCamera before this method
   */
  Game.prototype.getDefaultRenderer = function () {
    var context = this.canvas.getContext("2d");
    return new CanvasRenderSystem(context, this.cameraSystem);
  };

  Game.prototype.getDefaultWorld = function () {
    var bounds = [0, 0, this.canvas.width, this.canvas.height];
    return new WorldSystem(bounds);
  };

  /**
   * Must call getDefaultCamera before this method
   */
  Game.prototype.getDefaultInput = function (screen) {
    // params are: (screen, keyboard, camera)
    // Input system needs a screen it can call width() and height() on
    return new InputSystem(screen, document, this.cameraSystem);
  };

  Game.prototype.nextLevel = function () {
    this.level++;
    fire(this, "loadLevel", this.level);
  };

  Game.prototype.setLevel = function (level) {
    this.level = level;
    fire(this, "loadLevel", this.level);
  };

  Game.prototype.completeLevel = function () {
    fire(this, "levelComplete", this.level);
  };

  Game.prototype.setSize = function (width, height) {
    this.width = width;
    this.height = height;
    this.canvas.width = width;
    this.canvas.height = height;
  };

  Game.prototype.on = function (event, callback) {
    if(!this._events[event]){
      this._events[event] = [];
    }
    this._events[event].push(callback);
    return this;
  };

  function fire(self, event) {
    var callbacks = self._events[event],
        args = [].slice.call(arguments, 2);

    if(callbacks && callbacks.length){
      callbacks.forEach(function(callback){
        callback.apply(self, args);
      });
    }
  };

  function _loop(self) {

    loop(self._lastTime);

    function loop(time){
      self.time = time;
      self.frame++;
      try {
        self.root.update(Math.min(time - self._lastTime,100));

        if(self.state == STATE_PLAYING){
          _raf(loop);
        }
        self._lastTime = time;
      } catch (e){
        if(window.console){
          console.error(e.stack || e);
        }
      }
    }
  };

  function _resourceLoaded(self, resource) {
    self._toLoad--;
    if(self._toLoad == 0){
      fire(self, "resourcesLoaded");
    }
  };
