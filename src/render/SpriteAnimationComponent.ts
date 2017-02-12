import GameComponent from '../core/GameComponent';
import CanvasRenderSystem from './CanvasRenderSystem';
import Sprite from './Sprite';

/**
 * Animate through a sequence of sprites.
 * @extends {GameComponent}
 * @param {number} duration - Default duration if sprites do no contain their own intrinsic duration.
 * @param {Sprite[]} sprites - Array of sprite objects.
 * @memberof Sprite
 */
export default class SpriteAnimationComponent extends GameComponent {
  duration: number;
  spriteIndex: number;
  playing: boolean;
  sprites: Sprite[];

  constructor (duration, sprites?: Sprite[]) {
    super();
    this.duration = duration;
    this.spriteIndex = 0;
    this.playing = true;
    this.sprites = sprites;
  }

  init (parent) {
    if(this.sprites) {
      parent.sprites = this.sprites;
    }
    if(parent.sprites.length){
      parent.sprite = parent.sprites[0];
    }
    parent.spriteCountdown = (parent.sprite && parent.sprite.d) || this.duration;
  }

  update (parent, delta) {
    var spriteCount = parent.sprites.length,
        sprite,
        duration;

    if(this.playing){
      parent.spriteCountdown -= delta;
      if(parent.spriteCountdown <= 0){
        // TODO: Possible divide by zero
        this.spriteIndex = (this.spriteIndex + 1) % spriteCount;
        sprite = parent.sprites[this.spriteIndex];
        parent.sprite = sprite;
        duration = sprite.d || this.duration;
        parent.spriteCountdown = duration;
      }
    }
  }

  /**
   * Start the animation.
   */
  play() {
    this.playing = true;
  }

  /**
   * Stop the animation and reset the frame to the first sprite.
   */
  stop () {
    this.playing = false;
    this.spriteIndex = 0;
  }

  /**
   * Pause the animation.
   */
  pause () {
    this.playing = false;
  }
}
