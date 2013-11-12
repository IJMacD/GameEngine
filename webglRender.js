var GE = (function(GE){

    GE.Comp = GE.Comp || {};

    var GameComponent = GE.GameComponent,
        GameObjectManager = GE.GameObjectManager,
        GEC = GE.Comp;

    GE.WebGLRenderSystem = function WebGLRenderSystem(context, canvasWidth, canvasHeight, cameraSystem, shaderProgram){
        this.context = context;
        this.canvasWidth = canvasWidth;
        this.canvasHeight = canvasHeight;
        this.cameraSystem = cameraSystem;
        this.shaderProgram = shaderProgram;
        this.mvMatrix = mat4.create();
        this.pMatrix = mat4.create();
        this.renderQueue = [];
        this.spareVector = vec3.create();
    };
    GE.WebGLRenderSystem.prototype = new GE.GameObject();
    GE.WebGLRenderSystem.prototype.push = function(renderable){
        this.renderQueue.push(renderable);
    };
    GE.WebGLRenderSystem.prototype.update = function(delta) {
        var gl = this.context,
            cam = this.cameraSystem;

        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(this.pMatrix, 45*Math.PI/180, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0);

        mat4.translate(this.pMatrix, this.pMatrix, vec3.negate(this.spareVector, cam.position));

        if(cam.rotation && cam.rotationAxis){
            mat4.rotate(this.pMatrix, this.pMatrix, cam.rotation, cam.rotationAxis);
        }

        gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);

        for(var i = 0, l = this.renderQueue.length; i < l; i++){

            mat4.identity(this.mvMatrix);

            this.renderQueue[i].call(this, this.context, this.mvMatrix);
        }

        this.renderQueue = [];
    };
    GE.WebGLRenderSystem.prototype.setCanvasSize = function(width, height){
        this.canvasWidth = width;
        this.canvasHeight = height;
    }

    GE.WebGLRenderSystemManager = function WebGLRenderSystemManager(){};
    GE.WebGLRenderSystemManager.prototype = new GameObjectManager();
    GE.WebGLRenderSystemManager.prototype.push = function(renderable){
        for (var i = this.objects.length - 1; i >= 0; i--) {
            this.objects[i].push(renderable);
        };
    }

    GameComponent.create(function PolyShapeRenderingComponent(renderSystem, vertices, textureCoords, vertexNormals, vertexIndices){
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
    }, {
        update: function (parent, delta){
            var vBuff = this.vertexBuffer,
                tBuff = this.textureBuffer,
                nBuff = this.vertexNormalBuffer,
                iBuff = this.vertexIndexBuffer,
                lighting = this.lighting || parent.lighting,
                shaderProgram = this.renderSystem.shaderProgram,
                texture = parent.texture || this.texture;
            this.renderSystem.push(function(gl,mvMatrix){
                mat4.translate(mvMatrix, mvMatrix, parent.position);

                if(parent.rotation && parent.rotationAxis){
                    mat4.rotate(mvMatrix, mvMatrix, parent.rotation, parent.rotationAxis);
                }

                if(parent.size){
                    mat4.scale(mvMatrix, mvMatrix, parent.size);
                }

                var normalMatrix = mat3.create();
                //mat4.invert(normalMatrix, mvMatrix);
                mat3.fromMat4(normalMatrix, mvMatrix);
                mat3.invert(normalMatrix, normalMatrix);
                mat3.transpose(normalMatrix, normalMatrix);
                gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, [1,0,0,0,1,0,0,0,1]);

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
                    gl.uniform3f(shaderProgram.ambientColorUniform, 0.1, 0.1, 0.1);

                    gl.uniform3f(shaderProgram.pointLightingLocationUniform, 0.0, 0.0, 0.0);

                    gl.uniform3f(shaderProgram.pointLightingColorUniform, 1.0, 1.0, 1.0);
                }

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuff);

                gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
                gl.drawElements(gl.TRIANGLES, iBuff.numItems, gl.UNSIGNED_SHORT, 0);
            });
        }
    });

    GEC.PolyShapeRenderingComponent.createCube = function (renderSystem){
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
        return new GEC.PolyShapeRenderingComponent(renderSystem, vertices, textureCoords, vertexNormals, vertexIndices);
    }

    GEC.PolyShapeRenderingComponent.createSphere = function(renderSystem, latitudeBands, longitudeBands){
        var vertexPositionData = [];
        var normalData = [];
        var textureCoordData = [];
        for (var latNumber = 0; latNumber <= latitudeBands; latNumber++) {
          var theta = latNumber * Math.PI / latitudeBands;
          var sinTheta = Math.sin(theta);
          var cosTheta = Math.cos(theta);

          for (var longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            var phi = longNumber * 2 * Math.PI / longitudeBands;
            var sinPhi = Math.sin(phi);
            var cosPhi = Math.cos(phi);

            var x = cosPhi * sinTheta;
            var y = cosTheta;
            var z = sinPhi * sinTheta;
            var u = 1 - (longNumber / longitudeBands);
            var v = 1 - (latNumber / latitudeBands);

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
        var indexData = [];
        for (var latNumber = 0; latNumber < latitudeBands; latNumber++) {
          for (var longNumber = 0; longNumber < longitudeBands; longNumber++) {
            var first = (latNumber * (longitudeBands + 1)) + longNumber;
            var second = first + longitudeBands + 1;
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
          }
        }
        return new GEC.PolyShapeRenderingComponent(renderSystem, vertexPositionData, textureCoordData, vertexPositionData, indexData);
    }

    return GE;
}(GE || {}));
