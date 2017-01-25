import GameObject from './GameObject';
import GameObjectManager from './GameObjectManager';
import GameComponent from './GameComponent';
import CameraSystem from '../camera';
import CanvasRenderSystem from '../render/canvas-render';
import WorldSystem from '../world';
import InputSystem from '../input';

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
 * @class
 */
export default class Game {
    constructor (options) {
        this.canvas = options.canvas;

        /** Width of game canvas. Use {@link Game#setSize} to change.
         * @readonly
         */
        this.width = options.width || (this.canvas && this.canvas.width);

        /** Height of game canvas. Use {@link Game#setSize} to change.
         * @readonly
         */
        this.height = options.height || (this.canvas && this.canvas.height);

        if(this.canvas){
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        // Init some properties

        /** The root {@link GameObject} from which the object tree grows. This is the
         * input point for the loop to inject the time delta. All objects wanting updated
         * need to be a child or grandchild of this object.
         * @type {GameObject}
         */
        this.root = new GameObjectManager();

        this.textures = [];
        this.sounds = [];

        /**
         * Counter of how many frames have been rendered so far.
         * @type {number}
         */
        this.frame = 0;

        /**
         * Current game time in milliseconds.
         * @type {number}
         */
        this.time = 0;

        /**
         * Keeps track of an arbritary score.
         * @type {number}
         */
        this.score = 0;

        /**
         * Tracks what level the game is running. Don't change this directly use
         * {@link Game#setLevel} instead.
         * @readonly
         * @type {number}
         */
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

    /**
     * Generate a default {@link CameraSystem} based on properties of this game
     * @return {CameraSystem}
     */
    getDefaultCamera () {
        var width = this.canvas.width,
            height = this.canvas.height;
        this.cameraSystem = new CameraSystem(width, height);
        this.cameraSystem.setPosition(width / 2, height / 2);
        return this.cameraSystem;
    }

    /**
     * <p>Generate a default {@link CanvasRenderSystem} based on properties set on
     * this game instance.
     * <p>You must call <code>getDefaultCamera()</code> before calling this method.
     * @return {CanvasRenderSystem}
     */
    getDefaultRenderer () {
        if (!this.cameraSystem) {
            throw new Error("getDefaultCamera() has not been called");
        }
        var context = this.canvas.getContext("2d");
        return new CanvasRenderSystem(context, this.cameraSystem);
    }

    /**
     * <p>Generate a default {@link WorldSystem} based on properties set on
     * this game instance.
     * @param {number} paddingX - (optional) Additional padding outside of canvas size. Default: 0
     * @param {number} paddingY - (optional) Additional padding outside of canvas size. Default: same as paddingX
     * @return {WorldSystem}
     */
    getDefaultWorld (paddingX = 0, paddingY = paddingX) {
        var bounds = [-paddingX, -paddingY, this.canvas.width + paddingX, this.canvas.height + paddingY];
        return new WorldSystem(bounds);
    }

    /**
     * <p>Generate a default {@link InputSystem} based on properties set on
     * this game instance.
     * <p>You must call <code>getDefaultCamera()</code> before calling this method.
     * @return {InputSystem}
     */
    getDefaultInput (screen) {
        if (!this.cameraSystem) {
            throw new Error("getDefaultCamera() has not been called");
        }
        // params are: (screen, keyboard, camera)
        // Input system needs a screen it can call width() and height() on
        return new InputSystem(screen, document, this.cameraSystem);
    }

    /** Move to the next level */
    nextLevel () {
        this.level++;
        fire(this, "loadLevel", this.level);
    }

    /** Specify a level to jump to.
     * @param {number} level - Level number to jump to.
     */
    setLevel (level) {
        this.level = level;
        fire(this, "loadLevel", this.level);
    }

    /**
     * <p>Send an event notifiying listeners that the level has been completed.
     * <p>This does not automatically move to the next level.
     */
    completeLevel () {
        fire(this, "levelComplete", this.level);
    }

    /**
     * Set the size of the game. This will set the intrinsic size of the canvas.
     * @param {number} width - Size in pixels
     * @param {number} height - Size in pixels
     */
    setSize (width, height) {
        this.width = width;
        this.height = height;
        this.canvas.width = width;
        this.canvas.height = height;
    }

    /**
     * Attach an event listener for certain game events.
     * @param {string} event - Event name to attach to
     * @param {function} callback - Listener to be called on event
     */
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
}

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
}

function _resourceLoaded(self, resource) {
  self._loaded++;
  fire(self, "resourcesProgress", self._loaded / self._toLoad);
  if(self._toLoad - self._loaded <= 0){
    fire(self, "resourcesLoaded");
  }
};
