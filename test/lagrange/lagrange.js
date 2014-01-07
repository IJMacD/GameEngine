$(function() {
    var GameObject = GE.GameObject,
        GameComponent = GE.GameComponent,
        GEC = GE.Comp,

        canvas = $('#surface'),
        context = canvas[0].getContext("2d"),
        canvasWidth = canvas.width(),
        canvasHeight = canvas.height(),
        gameRoot = new GE.GameObjectManager(),
        cameraSystem,
        renderSystem,
        planet,
        sun,
        cameraDistance,
        lastTime = 0;

    function initCanvas(){
        canvas[0].width = canvasWidth;
        canvas[0].height = canvasHeight;
        cameraSystem && cameraSystem.setScreenSize(canvasWidth, canvasHeight);
        renderSystem && renderSystem.setCanvasSize(canvasWidth, canvasHeight);
    }

    initCanvas();

    function goFullscreen(){
        canvas[0].webkitRequestFullscreen();
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        initCanvas();
    }

    function toggleDebug(){
        GE.DEBUG = !GE.DEBUG;
        debugBtn.toggleClass("active", GE.DEBUG);
    }

    $('#fullscr-btn').on("click", goFullscreen);

    var debugBtn = $('#debug-btn').on("click", toggleDebug);

    $(window).on("resize", function(){
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
        initCanvas();
    }).on("mousewheel", function(e){
        cameraDistance = Math.min(Math.max(cameraDistance + e.originalEvent.deltaY, 300), 6000);
        cameraSystem.setPosition(0,-100,cameraDistance);
    }).on("keyup", function(e){
        if(e.which == 122){ // F11
            goFullscreen();
            e.preventDefault();
        }
    }).on("keydown", function(e){
        if(e.which == 38){ // UP
        cameraDistance = Math.min(Math.max(cameraDistance - 50, 300), 6000);
            cameraSystem.setPosition(0,-100,cameraDistance);
        }
        else if(e.which == 40){ // DOWN
        cameraDistance = Math.min(Math.max(cameraDistance + 50, 300), 6000);
            cameraSystem.setPosition(0,-100,cameraDistance);
        }
    });

    cameraSystem = new GE.CameraSystem(0, 0, canvasWidth, canvasHeight);
    renderSystem = new GE.CanvasRenderSystem(context, canvasWidth, canvasHeight, cameraSystem);
    cameraSystem.setScale(1.0);
    cameraDistance = 0;
    cameraSystem.setPosition(0,0,cameraDistance);
    cameraSystem.rotation = 20*Math.PI/180;
    cameraSystem.rotationAxis = [1,0,0];

    function DotRenderingComponent(renderSystem, color){
        this.renderSystem = renderSystem;
        this.color = color || "#000";
    }
    DotRenderingComponent.prototype = new GameComponent();
    DotRenderingComponent.prototype.update = function(parent, delta) {
        var color = this.color;
        this.renderSystem.push(function(context){
            context.fillStyle = color;
            context.beginPath();
            context.arc(parent.position[0],-parent.position[2],2,0,Math.PI*2,false);
            context.fill();
        });
    };

    sun = new GameObject();

    var moveComponent = new GEC.MoveComponent(),
        pointGravityComponent = new GEC.PointGravityComponent(sun),
        dotRenderer = new DotRenderingComponent(renderSystem);

    sun.mass = 1000;
    sun.size = vec3.fromValues(30,30,30);
    sun.rotationAxis = vec3.fromValues(0,1,0);
    sun.addComponent(new GEC.RotationComponent(0.001));
    sun.addComponent(dotRenderer);

    // sphereRenderer.lighting = true;
    // cubeRenderer.lighting = true;

    gameRoot.addObject(sun);

    var r = 275,
        G = 1.0,
        M = sun.mass,
        v = Math.sqrt((G * M) / r);

        planet = new GameObject();
        planet.setPosition(r, 0, 0);
        planet.setVelocity(0, 0, -v);
        planet.rotationAxis = vec3.fromValues(0,1,0);
        planet.mass = 1;

        planet.addComponent(moveComponent);
        planet.addComponent(pointGravityComponent);
        planet.addComponent(dotRenderer);
        planet.addComponent(new GEC.DebugDrawPathComponent(renderSystem));

        gameRoot.addObject(planet);



    gameRoot.addObject(cameraSystem);
    gameRoot.addObject(renderSystem);


    function loop(time){
        requestAnimationFrame(loop);
        gameRoot.update(Math.min(time - lastTime,100));
        lastTime = time;
    }
    loop(0);

});
