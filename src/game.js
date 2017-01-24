import { GameObject, GameComponent, GameObjectManager } from './core';
import CameraSystem from './camera';
import CanvasRenderSystem from './render/canvas-render';
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
  export default class Game {
    constructor (options) {
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
      this.sounds = [];
      this.frame = 0;
      this.time = 0;
      this.score = 0;
      this.level = 0;

      // Number of resources currently pending
      this._toLoad = 0;
      this._lastTime = 0;
      this._events = {};
      this._loaded = 0;
    }

    setCanvas (canvas) {
      this.canvas = canvas;

      this.width = this.width || this.canvas.width;
      this.height = this.height || this.canvas.height;

      this.canvas.width = this.width;
      this.canvas.height = this.height;
    }

    loadTextures (texturePaths) {
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
    }

    loadAudio (audioPaths) {
      this._toLoad += audioPaths.length;
      var self = this;
      return audioPaths.map(function(path){
        var sound = {};
        sound.audio = new Audio();
        sound.audio.addEventListener("canplaythrough", () => {
          if(!sound.loaded){
            sound.length = sound.audio.duration;
            sound.loaded = true;
            _resourceLoaded(self, sound);
          }
        });
        sound.audio.onerror = function(){
          throw new Error("Failed to load a sound: " + path);
        };
        sound.audio.src = path;
        self.sounds.push(sound);
        return sound;
      });
    }

    start () {
      this.nextLevel();

      this.state = STATE_PLAYING;

      _loop(this);
    }

    stop () {
      this.state = STATE_STOPPED;
    }

    getDefaultCamera () {
      var width = this.canvas.width,
          height = this.canvas.height;
      this.cameraSystem = new CameraSystem(width, height);
      this.cameraSystem.setPosition(width / 2, height / 2);
      return this.cameraSystem;
    }

    /**
     * Must call getDefaultCamera before this method
     */
    getDefaultRenderer () {
      if (!this.cameraSystem) {
        throw new Error("getDefaultCamera() has not been called");
      }
      var context = this.canvas.getContext("2d");
      return new CanvasRenderSystem(context, this.cameraSystem);
    }

    /**
     * Create a default world system
     * @param {number} paddingX - (optional) Additional padding outside of canvas size. Default: 0
     * @param {number} paddingY - (optional) Additional padding outside of canvas size. Default: same as paddingX
     * @return {WorldSystem}
     */
    getDefaultWorld (paddingX = 0, paddingY = paddingX) {
      var bounds = [-paddingX, -paddingY, this.canvas.width + paddingX, this.canvas.height + paddingY];
      return new WorldSystem(bounds);
    }

    /**
     * Must call getDefaultCamera before this method
     */
    getDefaultInput (screen) {
      if (!this.cameraSystem) {
        throw new Error("getDefaultCamera() has not been called");
      }
      // params are: (screen, keyboard, camera)
      // Input system needs a screen it can call width() and height() on
      return new InputSystem(screen, document, this.cameraSystem);
    }

    nextLevel () {
      this.level++;
      fire(this, "loadLevel", this.level);
    }

    setLevel (level) {
      this.level = level;
      fire(this, "loadLevel", this.level);
    }

    completeLevel () {
      fire(this, "levelComplete", this.level);
    }

    setSize (width, height) {
      this.width = width;
      this.height = height;
      this.canvas.width = width;
      this.canvas.height = height;
    }

    on (event, callback) {
      if(!this._events[event]){
        this._events[event] = [];
      }
      this._events[event].push(callback);
      return this;
    }

    fire (event) {
      fire(this, event);
    }
  }

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
      if(time && self.time == time) {
        console.log("Multiple calls: " + time);
        return;
      }
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
    self._loaded++;
    fire(self, "resourcesProgress", self._loaded / self._toLoad);
    if(self._toLoad - self._loaded <= 0){
      fire(self, "resourcesLoaded");
    }
  };
