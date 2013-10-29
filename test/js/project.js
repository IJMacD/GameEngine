(function(){
	// Pre-load assets
	var img = new Image();
	img.src = "img/chest.gif";
	img.src = "img/buoyOn.png";
	img.src = "img/buoyOff.png";
}());
$(function() {
	var GameObject = GE.GameObject,
		GameComponent = GE.GameComponent,
		GEC = GE.Comp,

		canvas = $('canvas'),
		context = canvas[0].getContext("2d"),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height(),
		gameRoot = new GE.GameObjectManager(),
		cameraSystem,
		renderSystem,
		redBall,
		sun,
		lastTime = 0;

	function initCanvas(width,height){
		// canvas.removeAttr("width");
		// canvas.removeAttr("height");
		// canvasWidth = width||canvas.width();
		// canvasHeight = height||canvas.height();
		canvas[0].width = canvasWidth;
		canvas[0].height = canvasHeight;
		if(cameraSystem){
			cameraSystem.setScreenSize(canvasWidth, canvasHeight);
		}
		if(renderSystem){
			renderSystem.setBounds([0,0,canvasWidth,canvasHeight]);
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
	renderSystem = new GE.RenderSystem(context, [0, 0, canvasWidth, canvasHeight], cameraSystem);

	// cameraSystem.addComponent(new GEC.RotationComponent(0.0003));


	sun = new GameObject();
	sun.mass = 5;
	sun.setPosition(0,0);
	sun.addComponent({update:function(p){renderSystem.push(function(c){c.fillStyle="black";c.beginPath();c.arc(p.position.x,p.position.y,2,0,Math.PI*2);c.fill();})}});

	gameRoot.addObject(sun);

	var chestImg = new Image();
	chestImg.src = "img/chest.gif";
	var buoyOnImg = new Image();
	buoyOnImg.src = "img/buoy.png";
	var buoyOffImg = new Image();
	buoyOffImg.src = "img/buoyOff.png";

	for(var i = 0; i < 10; i++){
		redBall = new GameObject();
		redBall.setPosition(Math.random()*canvasWidth-canvasWidth/2,Math.random()*canvasHeight-canvasHeight/2);
		redBall.setVelocity(Math.random()*0.5-0.25,Math.random()*0.5-0.25);

		redBall.addComponent(new GEC.MoveComponent());
		redBall.addComponent(new GEC.PointGravityComponent(sun));
		redBall.addComponent(new GEC.WorldBounceComponent(20,20,[-canvasWidth/2,-canvasHeight/2,canvasWidth/2,canvasHeight/2]));
		redBall.addComponent(new GEC.RotationComponent(Math.random()*0.002 - 0.001));
		// redBall.addComponent(new GEC.WorldWrapComponent([-canvasWidth/2,-canvasHeight/2,canvasWidth/2,canvasHeight/2]));
		redBall.addComponent(new GEC.DebugDrawPathComponent(renderSystem));
		if(Math.random() < 0.2){
			redBall.sprite = chestImg;
			redBall.addComponent(new GEC.SpriteRenderingComponent(renderSystem));
		}
		else if(Math.random() < 0.4){
			redBall.sprite = buoyOffImg;
			redBall.addComponent(new GEC.AnimatedSpriteComponent([buoyOnImg,buoyOffImg],1));
			redBall.addComponent(new GEC.SpriteRenderingComponent(renderSystem));
		}
		else {
			redBall.addComponent(new RedBoxRenderingComponent(renderSystem));
		}

		gameRoot.addObject(redBall);
	}


	gameRoot.addObject(cameraSystem);
	gameRoot.addObject(renderSystem);

	function loop(time){
		requestAnimationFrame(loop);
		gameRoot.update(time - lastTime);
		lastTime = time;
	}
	loop(0);

});