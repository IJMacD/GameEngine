import GameObjectManager from 'GameObjectManager';
import CameraSystem from '../camera.js';
import CanvasRenderSystem from '../render/CanvasRenderSystem';
import WorldSystem from '../world/WorldSystem';
import InputSystem from '../input.js';

var STATE_PAUSED = 0,
    STATE_PLAYING = 1,
    STATE_DEAD = 2,

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
 * @constructor
 */
export default function Game(options) {
  this.canvas = options.canvas;

  /** Width of game canvas. Use {@link Game#setSize} to change.
   * @readonly
   */
  this.width = options.width || this.canvas.width;
  /** Height of game canvas. Use {@link Game#setSize} to change.
   * @readonly
   */
  this.height = options.height || this.canvas.height;

  this.canvas.width = this.width;
  this.canvas.height = this.height;

  // Init some properties
  /** The root {@link GameObject} from which the object tree grows. This is the
   * input point for the loop to inject the time delta. All objects wanting updated
   * need to be a child or grandchild of this object.
   * @type {GameObject}
   */
  this.root = new GE.GameObjectManager();
  this.textures = [];
  /** Counter of how many frames have been rendered so far. */
  this.frame = 0;
  /** Current game time in milliseconds */
  this.time = 0;
  /** Keeps track of an arbritary score. */
  this.score = 0;
  /** Tracks what level the game is running. Don't change this directly use
   * {@link Game#setLevel} instead.
   * @readonly
   */
  this.level = 0;

  // Number of resources currently pending
  this._toLoad = 0;
  this._lastTime = 0;
  this._events = {};
}

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

/** This method will start the game loop running */
Game.prototype.start = function () {

  this.nextLevel();

  this.state = STATE_PLAYING;

  _loop(this);
};

/**
 * Generate a default {@link CameraSystem} based on properties of this game
  * @return {CameraSystem}
 */
Game.prototype.getDefaultCamera = function () {
  var width = this.canvas.width,
      height = this.canvas.height;
  this.cameraSystem = new CameraSystem(width, height);
  this.cameraSystem.setPosition(width / 2, height / 2);
  return this.cameraSystem;
};

/**
 * <p>Generate a default {@link CanvasRenderSystem} based on properties set on
 * this game instance.
 * <p>You must call <code>getDefaultCamera()</code> before calling this method.
 * @return {CanvasRenderSystem}
 */
Game.prototype.getDefaultRenderer = function () {
  var context = this.canvas.getContext("2d");
  return new CanvasRenderSystem(context, this.cameraSystem);
};

/**
 * <p>Generate a default {@link WorldSystem} based on properties set on
 * this game instance.
 * @return {WorldSystem}
 */
Game.prototype.getDefaultWorld = function () {
  var bounds = [0, 0, this.canvas.width, this.canvas.height];
  return new WorldSystem(bounds);
};

/**
 * <p>Generate a default {@link InputSystem} based on properties set on
 * this game instance.
 * <p>You must call <code>getDefaultCamera()</code> before calling this method.
 * @return {InputSystem}
 */
Game.prototype.getDefaultInput = function () {
  // params are: (screen, keyboard, camera)
  // Input system needs a screen it can call width() and height() on
  return new InputSystem($(this.canvas), document, this.cameraSystem);
};

/** Move to the next level */
Game.prototype.nextLevel = function () {
  this.level++;
  fire(this, "loadLevel", this.level);
};

/** Specify a level to jump to.
 * @param {number} level - Level number to jump to.
 */
Game.prototype.setLevel = function (level) {
  this.level = level;
  fire(this, "loadLevel", this.level);
};

/**
 * <p>Send an event notifiying listeners that the level has been completed.
 * <p>This does not automatically move to the next level */
Game.prototype.completeLevel = function () {
  fire(this, "levelComplete", this.level);
};

/**
 * Set the size of the game. This will set the intrinsic size of the canvas.
 * @param {number} width - Size in pixels
 * @param {number} height - Size in pixels
 */
Game.prototype.setSize = function (width, height) {
  this.width = width;
  this.height = height;
  this.canvas.width = width;
  this.canvas.height = height;
};

/**
 * Attach an event listener for certain game events.
 * @param {string} event - Event name to attach to
 * @param {function} callback - Listener to be called on event
*/
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
