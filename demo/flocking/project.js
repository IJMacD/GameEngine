(function() {

	"use strict";

	function GridSquareRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
		this.snap = true;
	}
	GridSquareRenderingComponent.prototype = new IGE.GameComponent();
	GridSquareRenderingComponent.prototype.update = function(parent, delta) {
		var z = this.snap ? Math.floor(parent.position[2]/100)*100 : parent.position[2],
				size = Math.pow(10,(z + 1000) / 1000),
				x = this.snap ? Math.floor(parent.position[0]/size)*size : parent.position[0],
				y = this.snap ? Math.floor(parent.position[1]/size)*size : parent.position[1],
				w = size,
				h = size;
		this.renderSystem.push(function(context){
			context.fillStyle = parent.colour || "#000000";
			context.beginPath();
			context.rect(x,y,w,h);
			context.fill();
		});
	};

	function ArrowRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	ArrowRenderingComponent.prototype = new IGE.GameComponent();
	ArrowRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			var size = parent.size || Math.pow(10,(parent.position[2] + 1000) / 1000),
					vz = parent.velocity[2]*10,
					velocityScale = 1 / Math.exp(vz * vz);
			context.fillStyle = parent.colour || "#000000";
			context.translate(parent.position[0], parent.position[1]);
			context.rotate(parent.rotation);
			context.scale(size, size * velocityScale);
			context.beginPath();
			context.moveTo(0,-1);
			context.lineTo(0.5,0.5);
			context.lineTo(0,0);
			context.lineTo(-0.5,0.5);
			context.closePath();
			context.fill();
		});
	};

	IGE.Components.FlockingComponent.NEIGHBOUR_RADIUS = 80;
	IGE.Components.FlockingComponent.SEPARATION_RADIUS = 30;
	IGE.Components.FlockingComponent.SEPARATION_WEIGHT = 6.125 / 30;


	var GameObject = IGE.GameObject,
			GameComponent = IGE.GameComponent,
			GEC = IGE.Components,

			canvas = document.getElementById('surface'),
			context = canvas.getContext("2d"),
			canvasWidth = canvas.offsetWidth,
			canvasHeight = canvas.offsetHeight,
			gameRoot = new IGE.GameObjectManager(),
			flock = new IGE.GameObjectManager(),
			inputSystem,
			cameraSystem,
			renderSystem,
			renderSystem1,
			backgroundSystem,
			temporaryBackgroundCollisionSystem,
			worldSystem,
			worldBounds,
			particle,
			particleCount = 200,
			particleSep = 50,
			particles = [],
			lastTime = 0,

			boxSize = Math.floor(Math.sqrt(particleCount)),
			offsetX = - boxSize * particleSep / 2,
			offsetY = - boxSize * particleSep / 2,

			mouseLine,

			moveComponent = new IGE.Components.MoveComponent(),
			worldComponent,
			switchComponent,
			rotateToHeadingComponent,
			rotationInterpolatorComponent,
			surfacesRenderComponent,
			gridSquareRenderingComponent,
			flockingComponent,
			particleRenderingComponent,
			arrowRenderingComponent,
			worldBounceComponent,
			worldWrapComponent,
			gravitySwitchComponent,
			flockingSwitchComponent,
			cameraTrackSwitchComponent,

			controlObj = {
				rotate: false,
				flocking: true,
				cameraTrack: false,
				debug: false
			};

	var DEBUG = false;

	function initCanvas(width,height){
		// canvas.removeAttr("width");
		// canvas.removeAttr("height");
		// canvasWidth = width||canvas.width();
		// canvasHeight = height||canvas.height();
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
	}

	initCanvas();

	// $('#fullscr-btn').on("click", function(){
	// 	canvas[0].webkitRequestFullscreen();
	// 	canvasWidth = window.innerWidth;
	// 	canvasHeight = window.innerHeight;
	// 	initCanvas();
	// });

	// $(window).on("resize", function(){
	// 	canvasWidth = canvas.width();
	// 	canvasHeight = canvas.height();
	// 	initCanvas();
	// });

	canvas.addEventListener("mousedown", function(e){
		var v = IGE.InputSystem.screenToWorld(inputSystem, e.offsetX, e.offsetY);
		if(mouseLine){
			backgroundSystem.addSurface([mouseLine[0], mouseLine[1], v[0], v[1]]);
		}
		mouseLine = v;
	});

	canvas.addEventListener('mousemove', function(e){
		if(mouseLine){
			var v = IGE.InputSystem.screenToWorld(inputSystem, e.offsetX, e.offsetY);
			temporaryBackgroundCollisionSystem.clearSurfaces();
			temporaryBackgroundCollisionSystem.addSurface([mouseLine[0], mouseLine[1], v[0], v[1]]);
		}
	});

	document.addEventListener("keyup", function(e){
		if(e.which == 13){ // enter
			mouseLine = null;
			temporaryBackgroundCollisionSystem.clearSurfaces();
		}
		else if(e.which >= 48 && e.which <= 57){ // 0 - 9
			var index = e.which - 48;
			if(backgrounds[index]){
				backgroundSystem.clearSurfaces();
				backgroundSystem.addSurfaces(backgrounds[index]);
			}
		}
		else if(e.which == 67){ // c
			backgroundSystem.clearSurfaces();
		}
		else if(e.which == 68){ // d
			controlObj.debug = !controlObj.debug;
		}
		else if(e.which == 71){ // g
			controlObj.flocking = !controlObj.flocking;
		}
		else if(e.which == 82){ // r
			cameraSystem.setPosition(0,0);
			cameraSystem.setVelocity(0,0);
			cameraSystem.setRotation(0);
		}
		else if(e.which == 84){ // t
			controlObj.cameraTrack = !controlObj.cameraTrack;
		}
	});
	/*
	 * 0 48 1 49 2 50 3 51 4 52 5 53 6 54 7 55 8 56 9 57
	 * a 65 b 66 c 67 d 68 e 69 f 70 g 71 h 72 i 73 j 74 k 75 l 76 m 77
	 * n 78 o 79 p 80 q 81 r 82 s 83 t 84 u 85 v 86 w 87 x 88 y 89 z 90
	 */

	worldBounds = [
		-canvasWidth/2, -canvasHeight/2,		// MinX, MinY,
		canvasWidth/2, canvasHeight/2,			// MaxX, MaxY,
		-500, 500														// MinZ, MaxZ
	];
	// worldBounds = [-500, -500, 500, 500];
	worldSystem = new IGE.WorldSystem(worldBounds);

	cameraSystem = new IGE.CameraSystem(canvasWidth, canvasHeight);
	renderSystem = new IGE.CanvasRenderSystem(context, cameraSystem);

	inputSystem = new IGE.InputSystem(canvas, document, cameraSystem);

	// renderSystem = new IGE.MultiRenderSystem();
	// renderSystem.addRenderSystem(renderSystem1);

	cameraSystem.setScale(1);

	worldSystem.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
	// cameraSystem.setRotation(-Math.PI/4);
	// cameraSystem.addComponent(new GEC.RotationComponent(0.00005));
	backgroundSystem = new IGE.Collision.BackgroundCollisionSystem();

	var backgrounds = [
		// 0: worldBounds
		[[worldBounds[0]+10, worldBounds[1]+10, worldBounds[0]+10, worldBounds[3]-10, worldBounds[2]-10, worldBounds[3]-10, worldBounds[2]-10, worldBounds[1]+10, worldBounds[0]+10, worldBounds[1]+10]],
		// 1: Dish
		[[20,40,40,20,40,-20,20,-40,-20,-40,-40,-20,-40,20,-20,40]],
		// 2: baffles
		[[-27.5,103.5,-122.5,0.5],[-107.5,82,-178.5,145],[-209.5,-20,-107.5,-92],[-14.5,178,75.5,118],[-118.5,-173,-12.5,-46],[49.5,54,140.5,165],[-20.5,21,85.5,-50],[-238.5,133,-154.5,216],[-284.5,-20,-197.5,72],[-269.5,63,-352.5,151],[166.5,-10,81.5,-124],[-19.5,-142,111.5,-223],[135.5,85,269.5,4],[119.5,244,227.5,175],[234.5,87,317.5,206],[-232.5,201,-284.5,260],[-347.5,200,-419.5,142],[-360.5,68,-455.5,-28],[-384.5,-22,-277.5,-116],[-203.5,-105,-289.5,-212],[-212.5,-182,-88.5,-266],[25.5,-216,-24.5,-283],[-87.5,177,-6.5,260],[344.5,121,454.5,65],[384.5,16,316.5,-90],[190.5,-113,350.5,-202],[250.5,-203,202.5,-278],[414.5,-67,495.5,-104],[441.5,-189,399.5,-275],[-380.5,-115,-462.5,-192],[-394.5,-206,-275.5,-273],[-415.5,203,-473.5,271],[-505.5,165,-436.5,65],[426.5,148,484.5,235],[300.5,274,409.5,222]],
		// 3: Opposing Vs
		[[-616,-262,-566,-171],[-566,-171,-530,-266],[-386,-268,-346,-180],[-346,-180,-293,-267],[-145,-263,-91,-168],[-91,-168,-44,-264],[121,-262,175,-164],[175,-164,237,-263],[393,-263,451,-152],[451,-152,509,-259],[-510,265,-472,162],[-472,162,-426,265],[-262,265,-224,178],[-224,178,-174,260],[0,258,29,157],[29,157,85,260],[267,256,307,152],[307,152,374,257]],
		// 4: debug
		[[0,0,0,20],[10,0,10,10],[20,0,20,10],[30,0,30,10],[40,0,40,10],[50,0,50,15],[60,0,60,10],[70,0,70,10],[80,0,80,10],[90,0,90,10],[100,0,100,20],[110,0,110,10],[120,0,120,10],[130,0,130,10],[140,0,140,10],[150,0,150,15],[160,0,160,10],[170,0,170,10],[180,0,180,10],[190,0,190,10],[200,0,200,20]],
		// 5: Chevrons
		[[624,272.5,697,194.5,619,119.5],[481,270.5,551,198.5,488,135.5],[298,254.5,377,187.5,311,124.5],[118,270.5,183,191.5,124,124.5],[-84,267.5,-6,194.5,-73,115.5],[-282,250.5,-196,181.5,-276,104.5],[-445,253.5,-377,185.5,-454,95.5],[-624,248.5,-541,172.5,-626,96.5],[547,47.5,474,-14.5,551,-87.5],[410,45.5,351,-15.5,430,-94.5],[257,47.5,197,-8.5,270,-104.5],[83,43.5,24,-4.5,91,-93.5],[-120,42.5,-193,-23.5,-133,-106.5],[-317,25.5,-388,-34.5,-339,-119.5],[-479,35.5,-554,-33.5,-493,-126.5],[-656,20.5,-715,-26.5,-675,-118.5],[637,-159.5,688,-214.5,624,-286.5],[471,-143.5,547,-215.5,490,-285.5],[298,-153.5,357,-223.5,287,-287.5],[113,-154.5,169,-225.5,116,-284.5],[-104,-155.5,-51,-225.5,-124,-289.5],[-299,-177.5,-242,-246.5,-309,-301.5],[-469,-179.5,-407,-254.5,-479,-305.5],[-646,-185.5,-585,-250.5,-652,-306.5]],
		// 6: Impressionist
		[[-189,138,395,72,365,-222,600,-188,555,103],[-75,-118,263,-168,265,26,89,41],[-88,-258,-162,-311,-230,-304],[277,477,294,205,563,300,632,453,777,219,613,-200,836,-148,340,-385,92,-307,269,-651],[66,256,18,361,-123,139,-426,499,-420,397,-550,295,-605,354,-773,93,-629,-334,-488,-315,-445,-294,-566,-348]]
	];

	backgroundSystem.addSurfaces(backgrounds[2]);

	temporaryBackgroundCollisionSystem = new IGE.Collision.BackgroundCollisionSystem(renderSystem);
	surfacesRenderComponent = new IGE.Debug.DebugDrawSurfacesComponent(renderSystem);
	backgroundSystem.addComponent(surfacesRenderComponent);
	temporaryBackgroundCollisionSystem.addComponent(new IGE.Debug.DebugDrawSurfacesComponent(renderSystem, '#88f'));

	gridSquareRenderingComponent = new GridSquareRenderingComponent(renderSystem);
	particleRenderingComponent = new GEC.DotRenderComponent(renderSystem);
	arrowRenderingComponent = new ArrowRenderingComponent(renderSystem);

	worldBounceComponent = new GEC.WorldBounceComponent(worldSystem, 0, 0, 10);
	worldWrapComponent = new GEC.WorldWrapComponent(worldSystem);

  rotateToHeadingComponent = new GEC.RotateToHeadingComponent();
  rotationInterpolatorComponent = new GEC.RotationInterpolatorComponent();

	flockingComponent = new IGE.Components.FlockingComponent(particles);

	flockingSwitchComponent = new GEC.SwitchComponent(controlObj, "flocking");
	flockingSwitchComponent.addComponents(
    [flockingComponent, arrowRenderingComponent],
    [new GEC.RandomMotionComponent(), gridSquareRenderingComponent]
  );

	cameraTrackSwitchComponent = new GEC.SwitchComponent(controlObj, "cameraTrack");
	cameraTrackSwitchComponent.addComponents(
    [
      flockingComponent,
      moveComponent,
      arrowRenderingComponent,
      rotateToHeadingComponent,
      rotationInterpolatorComponent
    ],
    [particleRenderingComponent]);

	cameraSystem.size = 4;
	cameraSystem.addComponent(cameraTrackSwitchComponent);
	cameraSystem.addComponent(worldWrapComponent);
	// cameraSystem.addComponent(new GEC.BackgroundCollisionComponent(backgroundSystem));
	particles.push(cameraSystem);

	for(var i = 0; i < boxSize; i++){
		for(var j = 0; j < boxSize; j++){
			var x = j * particleSep + offsetX,
				y = i * particleSep + offsetY;
			// 	vecNorm = vec2.fromValues(-y , x),
			// 	len = vec2.length(vecNorm)*0.0001;
			// vec2.scale(vecNorm, vecNorm, len);
			particle = new GameObject();
			particle.setPosition(-x,-y,0);
			particle.setVelocity(-x*0.001, -y*0.001, 0);
			particle.mass = 0.01;

			// Red + Blue
			// particle.colour = (i < boxSize / 2) ? "rgba(255,128,128,0.75)" : "rgba(128,128,255,0.75)";
			// Black and Yellow
			particle.colour = (i < boxSize / 2) ? "rgba(0,0,0,0.5)" : "rgba(255,255,0,0.5)";

			particle.addComponent(moveComponent);

			particle.addComponent(worldWrapComponent);
			particle.addComponent(worldBounceComponent);

			particle.addComponent(flockingSwitchComponent);

			particle.addComponent(rotateToHeadingComponent);
			particle.addComponent(rotationInterpolatorComponent);

			//particle.addComponent(worldComponent);
			particle.addComponent(new GEC.BackgroundCollisionComponent(backgroundSystem));
			//particle.addComponent(new GEC.BackgroundCollisionComponent(temporaryBackgroundCollisionSystem));

			if(i+j == 0) {
				particle.colour = "rgba(0,128,0,0.5)";
				const switcher = new IGE.Components.SwitchComponent(controlObj, "debug");
				switcher.addComponent(new IGE.Debug.DebugDrawPathComponent(renderSystem));
				switcher.addComponent(new IGE.Debug.DebugFlockingComponent(renderSystem));
				particle.addComponent(switcher);
			}

			flock.addObject(particle);
			particles.push(particle);
		}
	}

	gameRoot.addObject(inputSystem);
	gameRoot.addObject(flock);
	gameRoot.addObject(worldSystem);
	gameRoot.addObject(backgroundSystem);
	gameRoot.addObject(temporaryBackgroundCollisionSystem);
	gameRoot.addObject(cameraSystem);
	gameRoot.addObject(renderSystem);

	function loop(time){
		try {
			gameRoot.update(Math.min(time - lastTime,100));
			requestAnimationFrame(loop);
			lastTime = time;
		} catch (e){
			console.error(e.stack);
		}
	}
	loop(0);

}());
