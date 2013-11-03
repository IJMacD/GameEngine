(function(){
	// Pre-load assets
	var img = new Image();
	img.src = "img/chest.gif";
	img.src = "img/buoy.png";
	img.src = "img/buoyOff.png";
}());
$(function() {
	var GameObject = GE.GameObject,
		GameComponent = GE.GameComponent,
		GEC = GE.Comp,

		canvas = $('#surface'),
		context = canvas[0].getContext("2d"),
		canvas2 = $('#surface2'),
		context2 = canvas2[0].getContext("2d"),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height(),
		canvas2Width = canvas2.width(),
		canvas2Height = canvas2.height(),
		gameRoot = new GE.GameObjectManager(),
		cameraSystem,
		renderSystem,
		cameraSystem2,
		renderSystem2,
		redBall,
		sun,
		sun2,
		lastTime = 0;

	function initCanvas(width,height){
		// canvas.removeAttr("width");
		// canvas.removeAttr("height");
		// canvasWidth = width||canvas.width();
		// canvasHeight = height||canvas.height();
		canvas[0].width = canvasWidth;
		canvas[0].height = canvasHeight;
		canvas2[0].width = canvas2Width;
		canvas2[0].height = canvas2Height;
		if(cameraSystem){
			cameraSystem.setScreenSize(canvasWidth, canvasHeight);
		}
		if(cameraSystem2){
			cameraSystem2.setScreenSize(canvas2Width, canvas2Height);
		}
		if(renderSystem){
			renderSystem.setCanvasSize(canvasWidth,canvasHeight);
		}
		if(renderSystem2){
			renderSystem2.setCanvasSize(canvas2Width,canvas2Height);
		}
	}

	initCanvas();

	$('#fullscr-btn').on("click", function(){
		canvas[0].webkitRequestFullscreen();
		canvasWidth = window.innerWidth;
		canvasHeight = window.innerHeight;
		initCanvas();
	});

	$(window).on("resize", function(){
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
		initCanvas();
	});

	GE.DEBUG = true;

	function RedBallRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	RedBallRenderingComponent.prototype = new GameComponent();
	RedBallRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			context.fillStyle = "#ff0000";
			context.beginPath();
			context.arc(parent.position.x,parent.position.y,10,0,Math.PI*2,false);
			context.fill();
		});
	};
	function RedBoxRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	RedBoxRenderingComponent.prototype = new GameComponent();
	RedBoxRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			var x = parent.position.x,
				y = parent.position.y;
			context.fillStyle = "#ff0000";
			context.translate(x,y);
			context.rotate(parent.rotation);
			context.fillRect(-10,-10,20,20);
		});
	};

	cameraSystem = new GE.CameraSystem(0, 0, canvasWidth, canvasHeight);
	renderSystem = new GE.RenderSystem(context, canvasWidth, canvasHeight, cameraSystem);
	cameraSystem.setScale(0.5);
	cameraSystem2 = new GE.CameraSystem(0, 0, canvas2Width, canvas2Height);
	renderSystem2 = new GE.RenderSystem(context2, canvas2Width, canvas2Height, cameraSystem2);
	cameraSystem2.setScale(5);

	renderSystemManager = new GE.RenderSystemManager();
	renderSystemManager.addObject(renderSystem);
	renderSystemManager.addObject(renderSystem2);

	// cameraSystem.addComponent(new GEC.RotationComponent(0.0003));


	sun = new GameObject();
	sun.mass = 5;
	sun.setPosition(-canvasWidth/6,0);
	sun.addComponent({update:function(p){renderSystemManager.push(function(c){c.fillStyle="black";c.beginPath();c.arc(p.position.x,p.position.y,2,0,Math.PI*2);c.fill();})}});

	sun2 = new GameObject();
	sun2.mass = 5;
	sun2.setPosition(canvasWidth/6,0);
	sun2.addComponent({update:function(p){renderSystemManager.push(function(c){c.fillStyle="black";c.beginPath();c.arc(p.position.x,p.position.y,2,0,Math.PI*2);c.fill();})}});

	gameRoot.addObject(sun);
	gameRoot.addObject(sun2);

	var chestImg = new Image();
	chestImg.src = "img/chest.gif";
	var buoyOnImg = new Image();
	buoyOnImg.src = "img/buoy.png";
	var buoyOffImg = new Image();
	buoyOffImg.src = "img/buoyOff.png";

	for(var i = 0; i < 10; i++){
		redBall = new GameObject();
		redBall.setPosition(Math.random()*canvasWidth-canvasWidth/2,Math.random()*canvasHeight-canvasHeight/2);
		redBall.setVelocity(Math.random()*0.3-0.15,Math.random()*0.3-0.15);

		redBall.addComponent(new GEC.MoveComponent());
		redBall.addComponent(new GEC.PointGravityComponent(sun));
		redBall.addComponent(new GEC.PointGravityComponent(sun2));
		//redBall.addComponent(new GEC.WorldBounceComponent(20,20,[-canvasWidth/2,-canvasHeight/2,canvasWidth/2,canvasHeight/2]));
		redBall.addComponent(new GEC.RotationComponent(Math.random()*0.002 - 0.001));
		// redBall.addComponent(new GEC.WorldWrapComponent([-canvasWidth/2,-canvasHeight/2,canvasWidth/2,canvasHeight/2]));
		redBall.addComponent(new GEC.DebugDrawPathComponent(renderSystemManager));
		var r = Math.random();
		if(r < 0.2){
			redBall.sprite = chestImg;
			redBall.addComponent(new GEC.SpriteRenderingComponent(renderSystemManager));
		}
		else if(r < 0.4){
			redBall.sprite = buoyOffImg;
			redBall.addComponent(new GEC.AnimatedSpriteComponent([buoyOnImg,buoyOffImg],1));
			redBall.addComponent(new GEC.SpriteRenderingComponent(renderSystemManager));
		}
		else if(r < 0.5) {
			redBall.addComponent(new RedBallRenderingComponent(renderSystemManager));
		}
		else {
			redBall.addComponent(new RedBoxRenderingComponent(renderSystemManager));
		}

		gameRoot.addObject(redBall);

		if(i == 0){
			cameraSystem2.addComponent(new GEC.FollowComponent(redBall));
		}
	}


	gameRoot.addObject(cameraSystem);
	gameRoot.addObject(cameraSystem2);
	gameRoot.addObject(renderSystemManager);

	function loop(time){
		requestAnimationFrame(loop);
		gameRoot.update(Math.min(time - lastTime,100));
		lastTime = time;
	}
	loop(0);

});
