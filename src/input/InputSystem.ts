import GameObject from '../core/GameObject.ts';
import CameraSystem from '../CameraSystem.ts';
import vec2 from 'gl-matrix/src/gl-matrix/vec2';
import mat2 from 'gl-matrix/src/gl-matrix/mat2';

// Create some spare vectors for use in screenToWorld method
const v = vec2.create();
const rotMat = mat2.create();

export default InputSystem;
/**
 * InputSystem's job is to keep track of most recent user input to provide
 * filtering and rate-limiting etc. Inputs should be passed on the the rest
 * of game in World co-ordinates rather than screen co-ordinates so the
 * InputSystem is responsible for mapping between the two.
 *
 * @todo Right now this is very 2D orientated. Try to make more generic
 * @extends {GameObject}
 * @param {Element} screen - Should be a DOMElement to get size information from
 * @param {any} keyboard - Something to watch for keyboard events on e.g. document
 * @param {CameraSystem} cameraSystem - A camera to be used for mapping co-ordinates
 */
class InputSystem extends GameObject {
  screen: HTMLElement;
  keyboard: HTMLDocument;
  cameraSystem: CameraSystem;

  private _nextClick: vec2 = vec2.create();

  /** If {@link InputSystem#hasClick} is true, this property contains the world co-ordinates of the click. */
  lastClick: vec2 = vec2.create();

  /** Boolean to indicate if a click has been registered during the last frame. */
  hasClick: boolean = false;

  private _nextKey: number = null;

  /** The most recent key press if one occured during the previous frame. */
  lastKey:number = null;

  constructor (screen: HTMLElement, keyboard: HTMLDocument, cameraSystem: CameraSystem) {
    super();

    this.screen = screen;
    this.keyboard = keyboard;
    this.cameraSystem = cameraSystem;

    initScreen.call(this);
    initKeyboard.call(this);
  }

  update (delta) {
    super.update(delta);

    // Cycle the next event to last event property here so that
    // last event persists for exactly one frame.

    // Click
    vec2.copy(this.lastClick, this._nextClick);
    vec2.set(this._nextClick, NaN, NaN);
    this.hasClick = !isNaN(this.lastClick[0]);

    // Keypress
    this.lastKey = this._nextKey;
    // Consumers should interpret (null) as no keypress
    this._nextKey = null;
  }

  /**
   * Set a new screen object and initialse event listening on it.
   * @param {Element} screen - New screen
   */
  setScreen (screen: HTMLElement) {
    this.screen = screen;

    initScreen.call(this);
  }

  /**
   * Convert screen co-ordinates to world co-ordinates.
   * @param {number} screenX - X co-ordinate on screen.
   * @param {number} screenY - Y co-ordinate on screen.
   * @return {vec2} - Vector containing co-ordinates in the world taking into account camera position, rotation etc.
   */
  screenToWorld (screenX, screenY){
    const cam = this.cameraSystem,
        camWidth = cam.width,
        camHeight = cam.height,
        screen = this.screen,
        screenWidth = screen.offsetWidth,
        screenHeight = screen.offsetHeight,
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
  }

  /** Reference object to convert keys to keycodes */
  static Keys = {
    "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
    a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77,
    n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90
  }

}

/**
 * Private method to initialse touch events on screen.
 *
 * Should be invoked as initScreen.call(this);
 * @private
 */
function initScreen () {
  TouchClick(this.screen, e => {
    const offsetLeft = this.screen.offsetLeft,
        offsetTop = this.screen.offsetTop,
        touch = e.touches && e.touches[0],
        x = (touch ? touch.pageX : e.pageX) - offsetLeft,
        y = (touch ? touch.pageY : e.pageY) - offsetTop;

    vec2.copy(this._nextClick, this.screenToWorld(x, y));
  });
}

/**
 * Initialse keyboard events
 *
 * Should be invoked as initKeyboard.call(this);
 * @private
 */
function initKeyboard () {
  this.keyboard.addEventListener("keydown", e => {
    this._nextKey = e.which;
  });
}

/**
 * @callback TouchClickCallback
 * @param {object} event - Generic event object which will be relevant to event type.
 */

/**
 * Helper function to handle both touches and clicks consistently
 * @private
 * @param {Element} sel - Element on which we should look for input
 * @param {TouchClickCallback} fnc - Callback which will be called with event object only once per touch/click
 */
function TouchClick(sel, fnc) {
  const handle = function(event){
    event.stopPropagation();
    event.preventDefault();
    if(event.handled !== true) {
        fnc(event);
        event.handled = true;
    } else {
        return false;
    }
  };

  // Remove previous handler in case this is element being re-initialised
  sel.removeEventListener('touchstart', sel.touchClick);
  sel.removeEventListener('click', sel.touchClick);

  // Add new handler
  sel.addEventListener('touchstart', handle);
  sel.addEventListener('click', handle);

  // We need to keep track of this handler in order to be able to remove it later.
  sel.touchClick = handle;
}
