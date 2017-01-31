import GameObject from './GameObject';
import GameObjectManager from './GameObjectManager';
import GameComponent from './GameComponent';
import CameraSystem from '../CameraSystem';
import CanvasRenderSystem from '../render/CanvasRenderSystem';
import WorldSystem from '../world/WorldSystem';
import InputSystem from '../input/InputSystem';

enum State {
    STATE_PAUSED = 0,
    STATE_PLAYING = 1,
    STATE_STOPPED = 2,
    STATE_DEAD = 3,
}

let _lastTime = 0;
const _raf = window.requestAnimationFrame || function(callback) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - _lastTime));
    var id = window.setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
    _lastTime = currTime + timeToCall;
    return id;
};

export default Game;

/**
 * Utility class for things such as bootstrapping.
 *
 * <p>Providing width and height in options object as well as a canvas will set
 * the intrinsic rendering size of the canvas.
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas - HTML5 <code>&lt;canvas></code> element
 * @param {number} options.width - Render width.
 * @param {number} options.height - Render height.
 */
class Game {
    canvas: HTMLCanvasElement;
    width: number;
    height: number;

    /**
     * The root {@link GameObject} from which the object tree grows. This is the
     * input point for the loop to inject the time delta. All objects wanting updated
     * need to be a child or grandchild of this object.
     */
    root: GameObject = new GameObjectManager();

    textures: Texture[] = [];
    sounds: AudioTexture[] = [];

    worldSystem: WorldSystem;
    inputSystem: InputSystem;
    cameraSystem: CameraSystem;
    renderSystem: CanvasRenderSystem;

    /** Counter of how many frames have been rendered so far. */
    frame = 0;

    /** Current game time in milliseconds. */
    time = 0;

    /** Arbitrary state e.g. Alive or dead */
    state: State;

    /** Keeps track of an arbritary score. */
    score = 0;

    /** Tracks what level the game is running. Don't change this directly use {@link Game#setLevel} instead. */
    level = 0;

    /** Number of resources currently pending. */
    private _toLoad = 0;

    private _lastTime = 0;
    private _events = {};
    private _loaded = 0;

    constructor (options) {
        /**
         * Canvas this game will rener to.
         */
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
    }

    /**
     * Replace the canvas of this game.
     *
     * <p>It will re-initialise width and height based on canvas size.
     * @param {HTMLCanvasElement} canvas - New canvas
     */
    setCanvas (canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        this.width = this.width || this.canvas.width;
        this.height = this.height || this.canvas.height;

        this.canvas.width = this.width;
        this.canvas.height = this.height;
    }

    /**
     * Provide an array of urls pointing to image resources and they will be loaded.
     *
     * <p>The return value of this method is a mapped array of texture objects.
     * @param {string[]} texturePaths - Array of urls
     * @return {Texture[]}
     */
    loadTextures (texturePaths: string[]) {
        this._toLoad += texturePaths.length;

        return texturePaths.map(path => {
            const texture: Texture = {
                image: new Image(),
                width: 0,
                height: 0,
                loaded: false
            }
            texture.image.onload = function() {
                texture.width = texture.image.width;
                texture.height = texture.image.height;
                texture.loaded = true;
                _resourceLoaded(this, texture);
            };
            texture.image.onerror = function(){
                throw new Error("Failed to load a texture: " + path);
            };
            texture.image.src = path;
            this.textures.push(texture);
            return texture;
        });
    }

    /**
     * Provide an array of urls pointing to audio resources and they will be loaded.
     *
     * <p>The return value of this method is a mapped array of 'audio texture' objects.
     * @param {string[]} texturePaths - Array of urls
     * @return {AudioTexture[]}
     */
    loadAudio (audioPaths) {
        this._toLoad += audioPaths.length;

        return audioPaths.map(path => {
            const sound: AudioTexture = {
                audio: new Audio(),
                length: 0,
                loaded: false
            };
            sound.audio.addEventListener("canplaythrough", () => {
                if(!sound.loaded){
                    sound.length = sound.audio.duration;
                    sound.loaded = true;
                    _resourceLoaded(this, sound);
                }
            });
            sound.audio.onerror = function(){
                throw new Error("Failed to load a sound: " + path);
            };
            sound.audio.src = path;
            this.sounds.push(sound);
            return sound;
        });
    }

    /**
     * Start the loop.
     */
    start () {
        this.nextLevel();

        this.state = State.STATE_PLAYING;

        _loop(this);
    }

    /**
     * Stop the loop after the current frame.
     */
    stop () {
        this.state = State.STATE_STOPPED;
    }

    /**
     * Generate a default {@link CameraSystem} based on properties of this game
     * @return {CameraSystem}
     */
    getDefaultCamera () {
        if (!this.cameraSystem) {
            var width = this.canvas.width,
                height = this.canvas.height;
            this.cameraSystem = new CameraSystem(width, height);
            this.cameraSystem.setPosition(width / 2, height / 2);
        }
        return this.cameraSystem;
    }

    /**
     * <p>Generate a default {@link CanvasRenderSystem} based on properties set on
     * this game instance.
     * @return {CanvasRenderSystem}
     */
    getDefaultRenderer () {
        if (!this.renderSystem) {
            if (!this.cameraSystem) {
                this.getDefaultCamera();
            }

            var context = this.canvas.getContext("2d");
            this.renderSystem = new CanvasRenderSystem(context, this.cameraSystem);
        }
        return this.renderSystem;
    }

    /**
     * <p>Generate a default {@link WorldSystem} based on properties set on
     * this game instance.
     * @param {number} paddingX - (optional) Additional padding outside of canvas size. Default: 0
     * @param {number} paddingY - (optional) Additional padding outside of canvas size. Default: same as paddingX
     * @return {WorldSystem}
     */
    getDefaultWorld (paddingX = 0, paddingY = paddingX) {
        const bounds = [-paddingX, -paddingY, this.canvas.width + paddingX, this.canvas.height + paddingY];
        if (!this.worldSystem) {
            this.worldSystem = new WorldSystem(bounds);
        }
        else {
            this.worldSystem.setBounds(bounds);
        }
        return this.worldSystem;
    }

    /**
     * <p>Generate a default {@link InputSystem} based on properties set on
     * this game instance.
     * @return {InputSystem}
     */
    getDefaultInput (screen) {
        if (!this.inputSystem) {
            if (!this.cameraSystem) {
                this.getDefaultCamera();
            }
            // params are: (screen, keyboard, camera)
            this.inputSystem = new InputSystem(screen, document, this.cameraSystem);
        }
        return this.inputSystem;
    }

    /** Move to the next level */
    nextLevel () {
        this.level++;
        _fire(this, "loadLevel", this.level);
    }

    /** Specify a level to jump to.
     * @param {number} level - Level number to jump to.
     */
    setLevel (level) {
        this.level = level;
        _fire(this, "loadLevel", this.level);
    }

    /**
     * <p>Send an event notifiying listeners that the level has been completed.
     * <p>This does not automatically move to the next level.
     */
    completeLevel () {
        _fire(this, "levelComplete", this.level);
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

    /**
     * Fire an event on the game.
     */
    fire (event) {
        _fire(this, event);
    }
}

export interface Texture {
    /** HTML <code>&ltimage></code> Element */
    image: HTMLImageElement;
    /** Natural width of image */
    width: number;
    /** Natural height of image */
    height: number;
    /** If image has loaded width and height properties should be available. */
    loaded: boolean;
}

export interface AudioTexture {
    /** HTML <code>&lt;audio></code> element */
    audio: HTMLAudioElement;
    /** Total length of audio */
    length: number;
    /** If loaded is <code>true</code> length should be available. */
    loaded: boolean;
}

function _fire(self, event, ...rest) {
    var callbacks = self._events[event];

    if(callbacks && callbacks.length){
        callbacks.forEach(function(callback){
            callback.apply(self, rest);
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

            if(self.state == State.STATE_PLAYING){
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
  _fire(self, "resourcesProgress", self._loaded / self._toLoad);
  if(self._toLoad - self._loaded <= 0){
    _fire(self, "resourcesLoaded");
  }
};
