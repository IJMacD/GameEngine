export default class Texture {

  image = new Image();
  width = 0;
  height = 0;
  loaded = false;

  private loadPromise;

  constructor (path, onLoad?: (texture: Texture) => void) {
    this.loadPromise = new Promise((resolve, reject) => {
      this.image.onload = () => {
          this.width = this.image.width;
          this.height = this.image.height;
          this.loaded = true;

          if (onLoad)
            onLoad(this);

          resolve(this);
      };
      this.image.onerror = function(){
          throw new Error("Failed to load a texture: " + path);
      };
      this.image.src = path;
    });
  }

  load () {
    return this.loadPromise;
  }
}
