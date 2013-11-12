(function(){
    var img = new Image();
    img.src = "img/sun-mercator.jpg";
    img.src = "img/mercury.jpg";
    img.src = "img/venus.jpg";
    img.src = "img/earth.jpg";
    img.src = "img/mars.jpg";
    img.src = "img/jupiter.jpg";
    img.src = "img/saturn.jpg";
    img.src = "img/uranus.jpg";
    img.src = "img/neptune.jpg";
}());
$(function() {
    var GameObject = GE.GameObject,
        GameComponent = GE.GameComponent,
        GEC = GE.Comp,

        canvas = $('#surface'),
        context = canvas[0].getContext("experimental-webgl"),
        canvas2 = $('#surface2'),
        context2 = canvas2[0].getContext("2d"),
        gl = context,
        canvasWidth = canvas.width(),
        canvasHeight = canvas.height(),
        canvas2Width = canvas2.width(),
        canvas2Height = canvas2.height(),
        gameRoot = new GE.GameObjectManager(),
        cameraSystem,
        renderSystem,
        renderSystem2,
        cameraSystem2,
        planet,
        sun,
        cameraDistance,
        lastTime = 0;

    function initCanvas(){
        canvas[0].width = canvasWidth;
        canvas[0].height = canvasHeight;
        gl.viewportWidth = canvasWidth;
        gl.viewportHeight = canvasHeight,
        cameraSystem && cameraSystem.setScreenSize(canvasWidth, canvasHeight);
        renderSystem && renderSystem.setCanvasSize(canvasWidth, canvasHeight);
        canvas2[0].width = canvas2Width;
        canvas2[0].height = canvas2Height;
        renderSystem2 && renderSystem2.setCanvasSize(canvas2Width, canvas2Height);
    }

    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.vertexNormalAttribute = gl.getAttribLocation(shaderProgram, "aVertexNormal");
        gl.enableVertexAttribArray(shaderProgram.vertexNormalAttribute);

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
        shaderProgram.nMatrixUniform = gl.getUniformLocation(shaderProgram, "uNMatrix");
        shaderProgram.samplerUniform = gl.getUniformLocation(shaderProgram, "uSampler");
        shaderProgram.useLightingUniform = gl.getUniformLocation(shaderProgram, "uUseLighting");
        shaderProgram.ambientColorUniform = gl.getUniformLocation(shaderProgram, "uAmbientColor");
        shaderProgram.pointLightingLocationUniform = gl.getUniformLocation(shaderProgram, "uPointLightingLocation");
        shaderProgram.pointLightingColorUniform = gl.getUniformLocation(shaderProgram, "uPointLightingColor");
    }

    var textures = [],
        texturePaths = [
            "img/sun-mercator.jpg",
            "img/mercury.jpg",
            "img/venus.jpg",
            "img/earth.jpg",
            "img/mars.jpg",
            "img/jupiter.jpg",
            "img/saturn.jpg",
            "img/uranus.jpg",
            "img/neptune.jpg"
        ];
    function initTextures() {
        $.each(texturePaths, function(i,path){
            var texture = gl.createTexture();
            texture.image = new Image();
            texture.image.onload = function() {
                handleLoadedTexture(texture)
            }
            texture.image.src = path;
            textures[i] = texture;
        });
    }

    function handleLoadedTexture(texture) {
        gl.bindTexture(gl.TEXTURE_2D, texture);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, true);
        gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, texture.image);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_NEAREST);
        gl.generateMipmap(gl.TEXTURE_2D);

        gl.bindTexture(gl.TEXTURE_2D, null);
    }

    initCanvas();
    
    initShaders();

    initTextures();

    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    function goFullscreen(){
        canvas[0].webkitRequestFullscreen();
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        initCanvas();
    }

    function toggleDebug(){
        GE.DEBUG = !GE.DEBUG;
        debugBtn.toggleClass("active", GE.DEBUG);
        if(GE.DEBUG){
            gameRoot.addObject(renderSystem2);
            canvas2.show();
        }
        else {
            gameRoot.removeObject(renderSystem2);
            canvas2.hide();
        }
    }

    $('#fullscr-btn').on("click", goFullscreen);

    var debugBtn = $('#debug-btn').on("click", toggleDebug);

    $(window).on("resize", function(){
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
        canvas2Width = canvas2.width();
        canvas2Height = canvas2.height();
        initCanvas();
    }).on("mousewheel", function(e){
        cameraDistance = Math.min(Math.max(cameraDistance + e.originalEvent.deltaY, 300), 6000);
        cameraSystem.setPosition(0,-100,cameraDistance);
    }).on("keyup", function(e){
        if(e.which == 122){
            goFullscreen();
            e.preventDefault();
        }
    });

    cameraSystem = new GE.CameraSystem(0, 0, canvasWidth, canvasHeight);
    renderSystem = new GE.WebGLRenderSystem(context, canvasWidth, canvasHeight, cameraSystem, shaderProgram);
    cameraSystem2 = new GE.CameraSystem(0, 0, canvas2Width, canvas2Height);
    renderSystem2 = new GE.CanvasRenderSystem(context2, canvas2Width, canvas2Height, cameraSystem2);
    cameraSystem.setScale(1.0);
    cameraDistance = 800;
    cameraSystem.setPosition(0,-100,cameraDistance);
    cameraSystem.rotation = 20*Math.PI/180;
    cameraSystem.rotationAxis = [1,0,0];
    cameraSystem2.setScale(0.5);
    cameraSystem2.rotationAxis = [1,0,0];

    function DotRenderingComponent(renderSystem){
            this.renderSystem = renderSystem;
    }
    DotRenderingComponent.prototype = new GameComponent();
    DotRenderingComponent.prototype.update = function(parent, delta) {
            this.renderSystem.push(function(context){
                    context.fillStyle = "#000000";
                    context.beginPath();
                    context.arc(parent.position[0],-parent.position[2],2,0,Math.PI*2,false);
                    context.fill();
            });
    };

    sun = new GameObject();

    var sphereRenderer = GEC.PolyShapeRenderingComponent.createSphere(renderSystem,30,30),
        cubeRenderer = GEC.PolyShapeRenderingComponent.createCube(renderSystem),
        moveComponent = new GEC.MoveComponent(),
        pointGravityComponent = new GEC.PointGravityComponent(sun),
        sizes = [4,8,10,6,20,18,16,16],
        dotRenderer = new DotRenderingComponent(renderSystem2);

    sun.mass = 1;
    sun.size = vec3.fromValues(30,30,30);
    sun.rotationAxis = vec3.fromValues(0,1,0);
    sun.addComponent(new GEC.RotationComponent(0.001));
    sun.addComponent(sphereRenderer);
    sun.addComponent(dotRenderer);
    sun.texture = textures[0];

    // sphereRenderer.lighting = true;
    // cubeRenderer.lighting = true;

    gameRoot.addObject(sun);
    for(var i = 0; i < 8; i++){
        planet = new GameObject();
        planet.setPosition((i+1.5) * 50, 0, 0);
        planet.setVelocity(0, 0, 0.14 / Math.pow(i+1.5,0.5));
        planet.size = vec3.fromValues(sizes[i],sizes[i],sizes[i]);
        planet.rotationAxis = vec3.fromValues(0,1,0);

        planet.texture = textures[i+1];

        planet.lighting = true;

        planet.addComponent(moveComponent);
        planet.addComponent(pointGravityComponent);
        // planet.addComponent(new GEC.RotationComponent(Math.random()*0.002 - 0.001));

        planet.addComponent(sphereRenderer);

        planet.addComponent(dotRenderer);
        planet.addComponent(new GEC.DebugDrawPathComponent(renderSystem2));

        gameRoot.addObject(planet);
    }


    gameRoot.addObject(cameraSystem);
    gameRoot.addObject(renderSystem);


    function loop(time){
        requestAnimationFrame(loop);
        gameRoot.update(Math.min(time - lastTime,100));
        lastTime = time;
    }
    loop(0);

});
