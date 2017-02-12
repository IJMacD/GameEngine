(function(){
        // Pre-load assets
        var img = new Image();
        img.src = "img/chest.gif";
        img.src = "img/buoy.png";
        img.src = "img/buoyOff.png";
}());
(function() {
    var GameObject = IGE.GameObject,
        GameComponent = IGE.GameComponent,
        GEC = IGE.Components,

        canvas = document.getElementById('surface'),
        context = canvas.getContext("experimental-webgl"),
        gl = context,
        canvasWidth = canvas.offsetWidth,
        canvasHeight = canvas.offsetHeight,
        canvas2 = document.getElementById('surface2'),
        context2 = canvas2.getContext("2d"),
        canvas2Width = canvas2.offsetWidth,
        canvas2Height = canvas2.offsetHeight,
        gameRoot = new IGE.GameObjectManager(),
        cameraSystem,
        renderSystem,
        renderSystem2,
        redBall,
        sun,
        lastTime = 0;

    function initCanvas(width,height){
        // canvas.removeAttr("width");
        // canvas.removeAttr("height");
        // canvasWidth = width||canvas.width();
        // canvasHeight = height||canvas.height();
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        gl.viewportWidth = canvasWidth;
        gl.viewportHeight = canvasHeight,
        canvas2.width = canvas2Width;
        canvas2.height = canvas2Height;
        cameraSystem && cameraSystem.setScreenSize(canvasWidth, canvasHeight);
        renderSystem && renderSystem.setCanvasSize(canvasWidth, canvasHeight);
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

        shaderProgram.textureCoordAttribute = gl.getAttribLocation(shaderProgram, "aTextureCoord");
        gl.enableVertexAttribArray(shaderProgram.textureCoordAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }

    var chestTexture,
        sunTexture;
    function initTextures() {
        chestTexture = gl.createTexture();
        chestTexture.image = new Image();
        chestTexture.image.onload = function() {
            handleLoadedTexture(chestTexture)
        }
        chestTexture.image.src = "img/crate.png";

        sunTexture = gl.createTexture();
        sunTexture.image = new Image();
        sunTexture.image.onload = function() {
            handleLoadedTexture(sunTexture)
        }
        sunTexture.image.src = "img/sun-mercator.jpg";
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

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

    document.getElementById('fullscr-btn').addEventListener("click", function(){
        canvas[0].webkitRequestFullscreen();
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        initCanvas();
    });

    window.addEventListener("resize", function(){
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
        canvas2Width = canvas2.width();
        canvas2Height = canvas2.height();
        initCanvas();
    });

    var DEBUG = true;

    function RedBallRenderingComponent(renderSystem){
            this.renderSystem = renderSystem;
    }
    RedBallRenderingComponent.prototype = new GameComponent();
    RedBallRenderingComponent.prototype.update = function(parent, delta) {
            this.renderSystem.push(function(context){
                    context.fillStyle = "#ff0000";
                    context.beginPath();
                    context.arc(parent.position[0],parent.position[1],10,0,Math.PI*2,false);
                    context.fill();
            });
    };
    function RedBoxRenderingComponent(renderSystem){
            this.renderSystem = renderSystem;
    }
    RedBoxRenderingComponent.prototype = new GameComponent();
    RedBoxRenderingComponent.prototype.update = function(parent, delta) {
        this.renderSystem.push(function(context){
            var x = parent.position[0],
                y = parent.position[1];
            context.fillStyle = "#ff0000";
            context.translate(x,y);
            context.rotate(parent.rotation);
            context.fillRect(-10,-10,20,20);
        });
    };

    cameraSystem = new IGE.CameraSystem(canvasWidth, canvasHeight);
    renderSystem = new IGE.WebGLRenderSystem(context, canvasWidth, canvasHeight, cameraSystem, shaderProgram);
    renderSystem2 = new IGE.CanvasRenderSystem(context2, cameraSystem);
    // Only CanvasRender uses scale so we flip vertical direction to match WebGLRender
    cameraSystem.setScale(1, -1);
    cameraSystem.setPosition(0,0,800);

    // cameraSystem.addComponent(new GEC.RotationComponent(0.0003));

    sun = new GameObject();
    sun.mass = 1;
    sun.size = [15,15,15];
    sun.rotationAxis = [0,1,0];
    sun.addComponent({update:function(p){renderSystem2.push(function(c){c.fillStyle="black";c.beginPath();c.arc(p.position[0],p.position[1],2,0,Math.PI*2);c.fill();})}});
    sun.addComponent(new GEC.RotationComponent(0.001));
    sun.addComponent(IGE.Render.PolyShapeRenderComponent.createSphere(renderSystem, 30, 30));
    sun.texture = sunTexture;

    gameRoot.addObject(sun);

    const chestSprite = new IGE.Render.Sprite(new IGE.Render.Texture("img/chest.gif"));
    const buoyOnSprite = new IGE.Render.Sprite(new IGE.Render.Texture("img/buoy.png"));
    const buoyOffSprite = new IGE.Render.Sprite(new IGE.Render.Texture("img/buoyOff.png"));

    // Bug: Cube Render does not work
    // var cubeRenderer = IGE.Render.PolyShapeRenderComponent.createCube(renderSystem);
    var cubeRenderer = IGE.Render.PolyShapeRenderComponent.createSphere(renderSystem, 30, 30);

    for(var i = 0; i < 10; i++){
        redBall = new GameObject();
        redBall.setPosition(Math.random()*200-100,Math.random()*200-100,Math.random()*50-25);
        redBall.setVelocity(Math.random()*0.3-0.15,Math.random()*0.3-0.15,Math.random()*0.3-0.15);
        redBall.size = [10,10,10];
        redBall.rotationAxis = [1,1,1];

        redBall.addComponent(new GEC.MoveComponent());
        redBall.addComponent(new GEC.PointGravityComponent(sun));
        redBall.addComponent(new GEC.RotationComponent(Math.random()*0.002 - 0.001));
        redBall.addComponent(cubeRenderer);
        redBall.texture = chestTexture;

        var r = Math.random();
        if(r < 0.2){
            redBall.sprite = chestSprite;
            redBall.addComponent(new IGE.Render.SpriteRenderComponent(renderSystem2));
        }
        else if(r < 0.4){
            redBall.sprite = buoyOffSprite;
            redBall.addComponent(new IGE.Render.SpriteAnimationComponent(1000, [buoyOnSprite,buoyOffSprite]));
            redBall.addComponent(new IGE.Render.SpriteRenderComponent(renderSystem2));
        }
        else if(r < 0.5) {
            redBall.addComponent(new RedBallRenderingComponent(renderSystem2));
        }
        else {
            redBall.addComponent(new RedBoxRenderingComponent(renderSystem2));
        }


        // if(i == 0){
        //     cameraSystem.addComponent(new GEC.FollowAtDistanceComponent(redBall,[0,0,600]));
        // }

        gameRoot.addObject(redBall);
    }


    gameRoot.addObject(cameraSystem);
    gameRoot.addObject(renderSystem);
    gameRoot.addObject(renderSystem2);


    function loop(time){
        requestAnimationFrame(loop);
        gameRoot.update(Math.min(time - lastTime,100));
        lastTime = time;
    }
    loop(0);

}());
