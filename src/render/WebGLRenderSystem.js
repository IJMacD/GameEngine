import GameObject from '../core/GameObject';
import * as vec3 from 'gl-matrix/src/gl-matrix/vec3';
import * as mat4 from 'gl-matrix/src/gl-matrix/mat4';

export default class WebGLRenderSystem extends GameObject {
  constructor (context, canvasWidth, canvasHeight, cameraSystem, shaderProgram) {
    super();
    this.context = context;
    this.canvasWidth = canvasWidth;
    this.canvasHeight = canvasHeight;
    this.cameraSystem = cameraSystem;
    this.shaderProgram = shaderProgram;
    this.mvMatrix = mat4.create();
    this.pMatrix = mat4.create();
    this.renderQueue = [];
    this.spareVector = vec3.create();
    this.ambientLight = 0.3;
    this.pointLighting = 1.4;
  }

  push (renderable) {
      this.renderQueue.push(renderable);
  }

  update (delta) {
    var gl = this.context,
        cam = this.cameraSystem,
        i,
        l;

    gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
    gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

    mat4.perspective(this.pMatrix, 45*Math.PI/180, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0);

    mat4.translate(this.pMatrix, this.pMatrix, vec3.negate(this.spareVector, cam.position));

    if(cam.rotation && cam.rotationAxis){
        mat4.rotate(this.pMatrix, this.pMatrix, cam.rotation, cam.rotationAxis);
    }

    gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);

    for(i = 0, l = this.renderQueue.length; i < l; i++){

        mat4.identity(this.mvMatrix);

        this.renderQueue[i].call(this, this.context, this.mvMatrix);
    }

    this.renderQueue.length = 0;
  }

  setCanvasSize (width, height) {
      this.canvasWidth = width;
      this.canvasHeight = height;
  }
}
