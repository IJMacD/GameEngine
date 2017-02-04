import GameComponent from '../core/GameComponent';
import mat3 from 'gl-matrix/src/gl-matrix/mat3';
import mat4 from 'gl-matrix/src/gl-matrix/mat4';

export default class PolyShapeRenderingComponent extends GameComponent {
    constructor (renderSystem, vertices, textureCoords, vertexNormals, vertexIndices) {
        super();
        var gl = renderSystem.context;
        this.renderSystem = renderSystem;

        this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.vertexBuffer.itemSize = 3;
        this.vertexBuffer.numItems = Math.floor(vertices.length / this.vertexBuffer.itemSize);

        this.textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        this.textureBuffer.itemSize = 2;
        this.textureBuffer.numItems = Math.floor(textureCoords.length / this.textureBuffer.itemSize);

        this.vertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.vertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
        this.vertexNormalBuffer.itemSize = 3;
        this.vertexNormalBuffer.numItems = Math.floor(vertexNormals.length / this.vertexNormalBuffer.itemSize);

        this.vertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.vertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        this.vertexIndexBuffer.itemSize = 1;
        this.vertexIndexBuffer.numItems = vertexIndices.length;
    }

    update (parent, delta) {
        var vBuff = this.vertexBuffer,
            tBuff = this.textureBuffer,
            nBuff = this.vertexNormalBuffer,
            iBuff = this.vertexIndexBuffer,
            lighting = this.lighting || parent.lighting,
            shaderProgram = this.renderSystem.shaderProgram,
            texture =  this.texture || parent.texture;
        this.renderSystem.push(function(gl,mvMatrix){
            mat4.translate(mvMatrix, mvMatrix, parent.position);

            if(parent.rotation && parent.rotationAxis){
                mat4.rotate(mvMatrix, mvMatrix, parent.rotation, parent.rotationAxis);
            }

            var normalMatrix = mat3.create();
            mat3.fromMat4(normalMatrix, mvMatrix);
            mat3.invert(normalMatrix, normalMatrix);
            mat3.transpose(normalMatrix, normalMatrix);
            gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

            if(parent.size){
                mat4.scale(mvMatrix, mvMatrix, parent.size);
            }

            gl.bindBuffer(gl.ARRAY_BUFFER, vBuff);
            gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vBuff.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, tBuff);
            gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, tBuff.itemSize, gl.FLOAT, false, 0, 0);

            gl.bindBuffer(gl.ARRAY_BUFFER, nBuff);
            gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, nBuff.itemSize, gl.FLOAT, false, 0, 0);

            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.uniform1i(shaderProgram.samplerUniform, 0);

            gl.uniform1i(shaderProgram.useLightingUniform, lighting);
            if(lighting){
                gl.uniform3f(shaderProgram.ambientColorUniform, this.ambientLight, this.ambientLight, this.ambientLight);

                gl.uniform3f(shaderProgram.pointLightingLocationUniform, 0.0, 0.0, 0.0);

                gl.uniform3f(shaderProgram.pointLightingColorUniform, this.pointLighting, this.pointLighting, this.pointLighting);
            }

            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuff);

            gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
            gl.drawElements(gl.TRIANGLES, iBuff.numItems, gl.UNSIGNED_SHORT, 0);
        });
    }
}

/**
 * Static method to create cubic polyshape.
 * @static
 * @param {WebGLRenderSystem} renderSystem
 * @return {PolyShapeRenderingComponent}
 */
PolyShapeRenderingComponent.createCube = function (renderSystem){
    var vertices = [
        // Front face
        -1.0, -1.0,  1.0,
        1.0, -1.0,  1.0,
        1.0,  1.0,  1.0,
        -1.0,  1.0,  1.0,

        // Back face
        -1.0, -1.0, -1.0,
        -1.0,  1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0, -1.0, -1.0,

        // Top face
        -1.0,  1.0, -1.0,
        -1.0,  1.0,  1.0,
        1.0,  1.0,  1.0,
        1.0,  1.0, -1.0,

        // Bottom face
        -1.0, -1.0, -1.0,
        1.0, -1.0, -1.0,
        1.0, -1.0,  1.0,
        -1.0, -1.0,  1.0,

        // Right face
        1.0, -1.0, -1.0,
        1.0,  1.0, -1.0,
        1.0,  1.0,  1.0,
        1.0, -1.0,  1.0,

        // Left face
        -1.0, -1.0, -1.0,
        -1.0, -1.0,  1.0,
        -1.0,  1.0,  1.0,
        -1.0,  1.0, -1.0,
    ],
    textureCoords = [
        // Front face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,

        // Back face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Top face
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,

        // Bottom face
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,
        1.0, 0.0,

        // Right face
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
        0.0, 0.0,

        // Left face
        0.0, 0.0,
        1.0, 0.0,
        1.0, 1.0,
        0.0, 1.0,
    ],
    vertexNormals = [
        // Front face
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,
        0.0,  0.0,  1.0,

        // Back face
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,
        0.0,  0.0, -1.0,

        // Top face
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,
        0.0,  1.0,  0.0,

        // Bottom face
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,
        0.0, -1.0,  0.0,

        // Right face
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,
        1.0,  0.0,  0.0,

        // Left face
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
        -1.0,  0.0,  0.0,
    ],
    vertexIndices = [
        0, 1, 2,      0, 2, 3,    // Front face
        4, 5, 6,      4, 6, 7,    // Back face
        8, 9, 10,     8, 10, 11,  // Top face
        12, 13, 14,   12, 14, 15, // Bottom face
        16, 17, 18,   16, 18, 19, // Right face
        20, 21, 22,   20, 22, 23  // Left face
    ];
    return new PolyShapeRenderingComponent(renderSystem, vertices, textureCoords, vertexNormals, vertexIndices);
};

/**
 * Static method to create spherical polyshape.
 * @static
 * @param {WebGLRenderSystem} renderSystem
 * @param {number} latitudeBands
 * @param {number} longitudeBands
 * @return {PolyShapeRenderingComponent}
 */
PolyShapeRenderingComponent.createSphere = function(renderSystem, latitudeBands, longitudeBands){
    var vertexPositionData = [],
        normalData = [],
        textureCoordData = [],
        latNumber,
        theta,
        sinTheta,
        cosTheta,
        longNumber,
        phi,
        sinPhi,
        cosPhi,
        x, y, z, u, v,
        indexData,
        first,
        second;
    for (latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        theta = latNumber * Math.PI / latitudeBands;
        sinTheta = Math.sin(theta);
        cosTheta = Math.cos(theta);

        for (longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            phi = longNumber * 2 * Math.PI / longitudeBands;
            sinPhi = Math.sin(phi);
            cosPhi = Math.cos(phi);

            x = cosPhi * sinTheta;
            y = cosTheta;
            z = sinPhi * sinTheta;
            u = 1 - (longNumber / longitudeBands);
            v = 1 - (latNumber / latitudeBands);

            normalData.push(x);
            normalData.push(y);
            normalData.push(z);
            textureCoordData.push(u);
            textureCoordData.push(v);
            vertexPositionData.push(x);
            vertexPositionData.push(y);
            vertexPositionData.push(z);
        }
    }
    indexData = [];
    for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (longNumber = 0; longNumber < longitudeBands; longNumber++) {
            first = (latNumber * (longitudeBands + 1)) + longNumber;
            second = first + longitudeBands + 1;
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }
    return new PolyShapeRenderingComponent(renderSystem, vertexPositionData, textureCoordData, vertexPositionData, indexData);
};
