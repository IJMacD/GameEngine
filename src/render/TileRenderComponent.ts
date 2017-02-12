import GameComponent from '../core/GameComponent';
import CanvasRenderSystem from './CanvasRenderSystem';
import Texture from './Texture';

/**
 * Component for rendering backgrounds for example.
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Where to draw.
 * @param {object} texture - A texture object i.e {image: new Image(), width: 0, height: 0}
 * @param {array} bounds - How far and wide to render the images. Guaranteed to cover bounds.
 * @memberof Sprite
 */
export default class TileRenderComponent extends GameComponent{
  renderSystem: CanvasRenderSystem;
  texture: Texture;

  constructor (renderSystem, texture, bounds) {
    super();

    this.renderSystem = renderSystem;
    this.texture = texture;
    this.bounds = bounds;
  }

  update (parent, delta) {
    var renderSystem = this.renderSystem,
        texture = this.texture,
        bounds = this.bounds,
        dx = texture.width,
        dy = texture.height,
        startX = parent.position[0] % dx,
        startY = parent.position[1] % dy,
        x,
        y = bounds[1],// + startY - dy,
        width = bounds[2],
        height = bounds[3],
        render = function(texture, x, y){
          return function(context){
            context.drawImage(texture.image, x, y);
          };
        };
    for(; y < height + dy; y += dy){
      for(x = bounds[0] + startX - dx; x < width + dx; x += dx){
        renderSystem.push(render(texture, x, y));
      }
    }
  }
}
