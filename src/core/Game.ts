import GameObject from './GameObject';
import GameObjectManager from './GameObjectManager';
import GameComponent from './GameComponent';
import CameraSystem from '../CameraSystem';
import CanvasRenderSystem from '../render/CanvasRenderSystem';
import WorldSystem from '../world/WorldSystem';
import InputSystem from '../input/InputSystem';
import { Events, applyMixin } from '../util';

enum State {
    STATE_PAUSED = 0,
    STATE_PLAYING = 1,
    STATE_STOPPED = 2,
    STATE_DEAD = 3,
}

let _lastTime = 0;
const _raf = (typeof window !== "undefined" && window.requestAnimationFrame) || function(callback, element?) {
        var currTime = new Date().getTime();
        var timeToCall = Math.max(0, 16 - (currTime - _lastTime));
        var id = setTimeout(function() { callback(currTime + timeToCall); }, timeToCall);
        _lastTime = currTime + timeToCall;
        return id;
    };

/**
 * Utility class for things such as bootstrapping.
 *
 * <p>Providing width and height in options object as well as a canvas will set
 * the intrinsic rendering size of the canvas.
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas - HTML5 <code>&lt;canvas></code> element
 * @param {number} options.width - Render width.
 * @param {number} options.height - Render height.
 * @param {boolean} options.autosize - Whether or not to resize the world with the canvas.
 * @param {number} options.score - Initial score
 * @param {number} options.level - Initial level
 * @param {number} options.lives - Initial lives
 */
export default class Game implements Events {

    static readonly State = State;

    canvas: HTMLCanvasElement;
    width: number;
    height: number;

    /**
     * The root {@link GameObject} from which the object tree grows. This is the
     * input point for the loop to inject the time delta. All objects wanting updated
     * need to be a child or grandchild of this object.
     */
    root: GameObjectManager = new GameObjectManager();

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

    /** Keeps track of an arbritary number of lives. */
    lives = 0;

    /** Tracks what level the game is running. Don't change this directly use {@link Game#setLevel} instead. */
    level = 0;

    originCentric = false;

    /** Number of resources currently pending. */
    private _toLoad = 0;

    private _lastTime = 0;
    private _loaded = 0;

    private _generalObjects: GameObjectManager = null;

    private _autosizeCallback = () => {

        if (!this.canvas) return;

        const width = this.canvas.offsetWidth;
        const height = this.canvas.offsetHeight;

        this.setSize(width, height);

        // Keep Camera centred
        if (this.cameraSystem) {
            this.cameraSystem.setPosition(width / 2, height / 2);
        }

        // Update bounds of the world
        // WARN: Does not retain previous world 'padding'
        if (this.worldSystem) {
            this.worldSystem.setBounds(0,0,width,height);
        }
    }

    /**
     * Events mixin
     */
    _events = {};
    on: (type: string, callback) => void;
    fire: (type: string, ...params) => void;

    constructor ({canvas, width, height, score, lives, level, autosize, originCentric} = {
        canvas: null,
        width: 0,
        height: 0,
        score: 0,
        lives: 0,
        level: 0,
        autosize: false,
        originCentric: false,
    }) {

        /**
         * Canvas this game will render to.
         */
        this.canvas = canvas;

        /**
         * Width of game canvas. Use {@link Game#setSize} to change.
         * Explicit width takes priority.
         * @readonly
         */
        this.width = width || (this.canvas && this.canvas.width) || 0;

        /**
         * Height of game canvas. Use {@link Game#setSize} to change.
         * Explicit height takes priority.
         * @readonly
         */
        this.height = height || (this.canvas && this.canvas.height) || 0;

        if(this.canvas){
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        this.score = score;

        this.lives = lives;

        this.level = level;

        this.originCentric = originCentric;

        if(autosize) {
            this.setAutosize(true);
        }
    }

    /**
     * Add an object to the game. The object is not directly added to the root
     * GameObjectManager but is instead added to a special 'general objects'
     * manager which is guarenteed to be before the 'System' objects (i.e. InputSystem,
     * CameraSystem, RenderSystem).
     * @param {GameObject} object - The object to add.
     */
    addObject (object: GameObject) {
        this._initialiseGeneralObjects();

        this._generalObjects.addObject(object);
    }

    /**
     * Replace the canvas of this game.
     *
     * <p>If there is a height and width set the new canvas will be intialised with them.
     *
     * <p>If height and width are unset they will be taken from the canvas size.
     * @param {HTMLCanvasElement} canvas - New canvas
     */
    setCanvas (canvas: HTMLCanvasElement) {
        this.canvas = canvas;

        if (this.canvas){
            this.width = this.width || this.canvas.width;
            this.height = this.height || this.canvas.height;

            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
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
            };
            texture.image.onload = () => {
                texture.width = texture.image.width;
                texture.height = texture.image.height;
                texture.loaded = true;
                this._resourceLoaded(texture);
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
                    this._resourceLoaded(sound);
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

        this._loop();
    }

    /**
     * Stop the loop after the current frame.
     */
    stop () {
        this.state = State.STATE_STOPPED;
    }

    /**
     * Generate a default {@link CameraSystem} based on properties of this game.
     *
     * Calling this method will also add it to the game root after general objects.
     * @return {CameraSystem}
     */
    getDefaultCamera () {
        if (!this.cameraSystem) {
            this.cameraSystem = new CameraSystem();

            if (!this.originCentric) {
                this.cameraSystem.setPosition(this.width / 2, this.height / 2);
            }

            this._initialiseGeneralObjects();
            this.root.addObject(this.cameraSystem);
        }
        return this.cameraSystem;
    }

    /**
     * <p>Generate a default {@link CanvasRenderSystem} based on properties set on
     * this game instance.
     *
     * Calling this method will also add it to the game root after general objects.
     * @return {CanvasRenderSystem}
     */
    getDefaultRenderer () {
        if (!this.renderSystem) {
            if (!this.cameraSystem) {
                this.getDefaultCamera();
            }

            let context;

            if (this.canvas)
                context = this.canvas.getContext("2d");

            this.renderSystem = new CanvasRenderSystem(context, this.cameraSystem);

            this._initialiseGeneralObjects();
            this.root.addObject(this.renderSystem);
        }
        return this.renderSystem;
    }

    /**
     * <p>Generate a default {@link WorldSystem} based on properties set on
     * this game instance.
     *
     * Calling this method will also add it to the game root after general objects.
     * @param {number} paddingX - (optional) Additional padding outside of canvas size. Default: 0
     * @param {number} paddingY - (optional) Additional padding outside of canvas size. Default: same as paddingX
     * @return {WorldSystem}
     */
    getDefaultWorld (paddingX = 0, paddingY = paddingX) {
        const bounds = [-paddingX, -paddingY, this.width + paddingX, this.height + paddingY];
        if (this.originCentric) {
            const halfWidth = this.width / 2;
            const halfHeight = this.height / 2;
            bounds[0] -= halfWidth;
            bounds[1] -= halfHeight;
            bounds[2] -= halfWidth;
            bounds[3] -= halfHeight;
        }
        if (!this.worldSystem) {
            this.worldSystem = new WorldSystem(bounds);

            this._initialiseGeneralObjects();
            this.root.addObject(this.worldSystem);
        }
        else {
            this.worldSystem.setBounds(...bounds);
        }
        return this.worldSystem;
    }

    /**
     * <p>Generate a default {@link InputSystem} based on properties set on
     * this game instance.
     *
     * Calling this method will also add it to the game root after general objects.
     * @return {InputSystem}
     */
    getDefaultInput () {
        if (!this.inputSystem) {
            if (!this.cameraSystem) {
                this.getDefaultCamera();
            }
            // params are: (screen, keyboard, camera)
            this.inputSystem = new InputSystem(this.canvas, typeof document !== "undefined" && document, this.cameraSystem);

            this._initialiseGeneralObjects();
            this.root.addObject(this.inputSystem);
        }
        return this.inputSystem;
    }

    /** Specify a new score
     * @param {number} score - New score.
     */
    setScore (score) {
        this.score = score;
        this.fire("score", this.score);
    }

    /** Move to the next level */
    nextLevel () {
        this.level++;
        this.fire("loadLevel", this.level);
    }

    /** Specify a level to jump to.
     * @param {number} level - Level number to jump to.
     */
    setLevel (level) {
        this.level = level;
        this.fire("loadLevel", this.level);
    }

    /**
     * <p>Send an event notifiying listeners that the level has been completed.
     * <p>This does not automatically move to the next level.
     */
    completeLevel () {
        this.fire("levelComplete", this.level);
    }

    /**
     * Set the size of the game. This will also set the canvas size.
     * @param {number} width - Size in pixels
     * @param {number} height - Size in pixels
     */
    setSize (width, height) {
        this.width = width;
        this.height = height;

        if(this.canvas){
            this.canvas.width = width;
            this.canvas.height = height;
        }
    }

    /**
     * Set whether or not to update the world dimensions with changes to the canvas dimensions.
     * @param {boolean} enable
     */
    setAutosize (enable) {
        if (typeof window !== "undefined") {
            if(enable) {
                window.addEventListener("resize", this._autosizeCallback);
            } else {
                window.removeEventListener("resize", this._autosizeCallback);
            }
        }
    }

    private _loop() {

        const loop = (time) => {
            if(time && this.time == time) {
                console.log("Multiple calls: " + time);
                return;
            }

            this.time = time;
            this.frame++;

            try {
                this.root.update(Math.min(time - this._lastTime,100));

                if(this.state == State.STATE_PLAYING){
                    _raf(loop);
                }

                this._lastTime = time;
            } catch (e){
                if(window.console){
                    console.error(e.stack || e);
                }
            }
        }

        loop(this._lastTime);
    }

    private _resourceLoaded(resource) {
        this._loaded++;
        this.fire("resourcesProgress", this._loaded / this._toLoad);
        if(this._toLoad - this._loaded <= 0){
            this.fire("resourcesLoaded");
        }
    }

    private _initialiseGeneralObjects () {
        if (!this._generalObjects) {
            this._generalObjects = new GameObjectManager();
            this.root.addObjectAt(this._generalObjects, 0);
        }
    }
}

applyMixin(Game, Events);

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
