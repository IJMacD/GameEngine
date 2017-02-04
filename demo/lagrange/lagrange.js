(function() {
    var GameObject = IGE.GameObject,
        GameComponent = IGE.GameComponent,
        GEC = IGE.Components,

        canvas = document.getElementById('surface'),
        context = canvas.getContext("2d"),
        canvasWidth = canvas.offsetWidth,
        canvasHeight = canvas.offsetHeight,
        gameRoot = new IGE.GameObjectManager(),
        cameraSystem,
        renderSystem,
        planet,
        sun,
        cameraDistance,
        lastTime = 0,
        DEBUG = false;

    function initCanvas(){
        canvas.width = canvasWidth;
        canvas.height = canvasHeight;
        cameraSystem && cameraSystem.setScreenSize(canvasWidth, canvasHeight);
        renderSystem && renderSystem.setCanvasSize(canvasWidth, canvasHeight);
    }

    initCanvas();

    function goFullscreen(){
        canvas.webkitRequestFullscreen();
        canvasWidth = window.innerWidth;
        canvasHeight = window.innerHeight;
        initCanvas();
    }

    function toggleDebug(){
        DEBUG = !DEBUG;
        debugBtn.toggleClass("active", DEBUG);
    }

    document.getElementById('fullscr-btn').addEventListener("click", goFullscreen);

    var debugBtn = document.getElementById('debug-btn').addEventListener("click", toggleDebug);

    window.addEventListener("resize", function(){
        canvasWidth = canvas.width();
        canvasHeight = canvas.height();
        initCanvas();
    });
    window.addEventListener("mousewheel", function(e){
        cameraDistance = Math.min(Math.max(cameraDistance + e.originalEvent.deltaY, 100), 1000);
        cameraSystem.setScale(cameraDistance*0.001);
    });
    window.addEventListener("keyup", function(e){
        if(e.which == 122){ // F11
            goFullscreen();
            e.preventDefault();
        }
    });
    window.addEventListener("keydown", function(e){
        if(e.which == 38){ // UP
        cameraDistance = Math.min(Math.max(cameraDistance - 50, 300), 6000);
            cameraSystem.setPosition(0,-100,cameraDistance);
        }
        else if(e.which == 40){ // DOWN
        cameraDistance = Math.min(Math.max(cameraDistance + 50, 300), 6000);
            cameraSystem.setPosition(0,-100,cameraDistance);
        }
    });

    cameraSystem = new IGE.CameraSystem(canvasWidth, canvasHeight);
    renderSystem = new IGE.CanvasRenderSystem(context, cameraSystem);
    cameraSystem.setScale(0.2);
    cameraDistance = 0;
    cameraSystem.setPosition(0,0,cameraDistance);
    cameraSystem.rotation = 20*Math.PI/180;
    cameraSystem.rotationAxis = [1,0,0];

    sun = new GameObject();

    var moveComponent = new GEC.MoveComponent(),
        pointGravityComponent = new GEC.PointGravityComponent(sun),
        dotRenderer = new IGE.Render.DotRenderComponent(renderSystem);

    sun.mass = 1000;
    sun.size = 60;
    sun.rotationAxis = [0,1,0];
    sun.addComponent(new GEC.RotationComponent(0.001));
    sun.addComponent(new IGE.Render.DotRenderComponent(renderSystem, "#ff0"));

    // sphereRenderer.lighting = true;
    // cubeRenderer.lighting = true;

    gameRoot.addObject(sun);

    var r = 1300,
        G = 1.0,
        M = sun.mass,
        v = Math.sqrt((G * M) / r);

        planet = new GameObject();
        planet.setPosition(r, 0, 0);
        planet.setVelocity(0, v, 0);
        planet.rotationAxis = [0,1,0];
        planet.mass = 10;
        planet.size = 20;

        planet.addComponent(moveComponent);
        planet.addComponent(pointGravityComponent);
        planet.addComponent(dotRenderer);
        planet.addComponent(new IGE.Debug.DebugDrawPathComponent(renderSystem));

        gameRoot.addObject(planet);

    var l1 = r * (1 - Math.pow(planet.mass / (3 * sun.mass), 1/3)),
        v1 = l1 * Math.pow(G*(sun.mass+planet.mass)/(r*r*r), 1/2),
        lagrange;

        lagrange = new GameObject();
        lagrange.setPosition(l1, 0, 0);
        lagrange.setVelocity(0, v1, 0);
        lagrange.size = 10;

        lagrange.addComponent(moveComponent);
        lagrange.addComponent(pointGravityComponent);
        lagrange.addComponent(new GEC.PointGravityComponent(planet));
        lagrange.addComponent(new IGE.Render.DotRenderComponent(renderSystem, "#f00"));
        lagrange.addComponent(new IGE.Debug.DebugDrawPathComponent(renderSystem));

        gameRoot.addObject(lagrange);

    //cameraSystem.addComponent(new GEC.FollowComponent(planet));

    gameRoot.addObject(cameraSystem);
    gameRoot.addObject(renderSystem);


    function loop(time){
        requestAnimationFrame(loop);
        gameRoot.update(Math.min(time - lastTime,100));
        lastTime = time;
    }
    loop(0);

}());
