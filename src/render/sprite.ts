import Texture from './Texture';

export default class Sprite {
  /** Texture object */
  t: Texture;
  /** X-offset of sprite in spritesheet */
  x: number = 0;
  /** Y-offset of sprite in spritesheet */
  y: number = 0;
  /** width - width of sprite */
  w: number = 0;
  /** height - height of sprite */
  h: number = 0;
  /** ox - origin x-offset, so sprite can be visually centred on parent's position */
  ox: number = 0;
  /** oy - origin y-offset, so sprite can be visually centred on parent's position */
  oy: number = 0;
  /** d - (optional) duration of sprite for animation */
  d?: number;

  constructor (texture: Texture) {
    this.t = texture;

    texture.load().then(tex => {
      this.w = tex.width;
      this.h = tex.height;
      this.ox = tex.width / 2;
      this.oy = tex.height / 2;
    });
  }

  /**
   * Convenience method to generate a set of sprite objects based on a template and a spritesheet.
   * @param {object} sprite - The sprite template.
   * @param {number} rows - Number of rows in the sprite sheet.
   * @param {number} cols - Number of columns in the sprite sheet.
   * @return {Sprite[]}
   */
  static generateSpriteSheet (sprite: Sprite, rows: number, cols: number){
    var out: Sprite[] = [],
        i,
        j;
    for(i=0; i<rows; i++){
      for(j=0; j<cols; j++){
        out.push({
          t: sprite.t,
          x: j*sprite.w,
          y: i*sprite.h,
          w: sprite.w,
          h: sprite.h,
          ox: sprite.ox,
          oy: sprite.oy,
          d: sprite.d
        });
      }
    }
    return out;
  }
}
