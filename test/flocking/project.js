$(function() {

	"use strict";

	function ParticleRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	ParticleRenderingComponent.prototype = new GE.GameComponent();
	ParticleRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			context.fillStyle = parent.colour || "#000000";
			context.beginPath();
			context.arc(parent.position[0],parent.position[1],2,0,Math.PI*2,false);
			context.fill();
		});
	};


	function GridSquareRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
		this.snap = true;
	}
	GridSquareRenderingComponent.prototype = new GE.GameComponent();
	GridSquareRenderingComponent.prototype.update = function(parent, delta) {
		var size = Math.pow(10,(parent.position[2] + 1000) / 1000),
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
	ArrowRenderingComponent.prototype = new GE.GameComponent();
	ArrowRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			var size = parent.size || 10;
			context.fillStyle = parent.colour || "#000000";
			context.translate(parent.position[0], parent.position[1]);
			context.rotate(parent.rotation);
			context.beginPath();
			context.moveTo(0,-size);
			context.lineTo(size/2,size/2);
			context.lineTo(0,0);
			context.lineTo(-size/2,size/2);
			context.closePath();
			context.fill();
		});
	};


	function FlockingComponent(renderSystem){
		this.renderSystem = renderSystem;
		this.separation = vec3.create();
		this.align = vec3.create();
		this.cohesion = vec3.create();
		this.spare = vec3.create();
	}
	FlockingComponent.prototype = new GE.GameComponent();
	FlockingComponent.prototype.update = function(parent, delta) {
		vec3.set(this.cohesion, 0, 0, 0);
		vec3.set(this.align, 0, 0, 0);
		vec3.set(this.separation, 0, 0, 0);
		vec3.set(this.spare, 0, 0, 0);

		var count = 0,
				self = this,
				i = 0,
				length = particles.length;

		for(;i<length;i++){
			var other = particles[i],
					dist = vec3.dist(other.position, parent.position);
			if(dist > 0 && dist < NEIGHBOUR_RADIUS){
				vec3.add(self.cohesion, self.cohesion, other.position);
				vec3.add(self.align, self.align, other.velocity);

				if(dist < SEPARATION_RADIUS){
					vec3.subtract(self.spare, parent.position, other.position);
					vec3.normalize(self.spare, self.spare);
					vec3.scaleAndAdd(self.separation, self.separation, self.spare, 1 / dist);
				}

				count++;
			}
		}

		if(count > 0){
			vec3.scale(this.cohesion, this.cohesion, 1 / count);
			vec3.subtract(this.cohesion, this.cohesion, parent.position);
			vec3.scaleAndAdd(parent.velocity, parent.velocity, this.cohesion, COHESION_WEIGHT);

			vec3.scaleAndAdd(parent.velocity, parent.velocity, this.align, ALIGN_WEIGHT / count);

			vec3.scaleAndAdd(parent.velocity, parent.velocity, this.separation, SEPARATION_WEIGHT / count);

			var mag = vec3.length(parent.velocity);
			if(mag > MAX_SPEED){
				vec3.scale(parent.velocity, parent.velocity, MAX_SPEED / mag);
			}
		}
	};


	var GameObject = GE.GameObject,
			GameComponent = GE.GameComponent,
			GEC = GE.Comp,

			canvas = $('#surface'),
			context = canvas[0].getContext("2d"),
			canvasWidth = canvas.width(),
			canvasHeight = canvas.height(),
			gameRoot = new GE.GameObjectManager(),
			flock = new GE.GameObjectManager(),
			cameraSystem,
			renderSystem,
			renderSystem1,
			backgroundSystem,
			temporaryBackgroundSystem,
			worldSystem,
			worldBounds,
			particle,
			particleCount = 400,
			particleSep = 50,
			particles = [],
			lastTime = 0,

			boxSize = Math.floor(Math.sqrt(particleCount)),
			offsetX = - boxSize * particleSep / 2,
			offsetY = - boxSize * particleSep / 2,

			mouseLine,

			moveComponent = new GEC.MoveComponent(),
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
				cameraTrack: true
			},

			NEIGHBOUR_RADIUS = 80,
			SEPARATION_RADIUS = 35,
			MAX_SPEED = 0.1,
			COHESION_WEIGHT = 0.1 * MAX_SPEED / NEIGHBOUR_RADIUS,
			ALIGN_WEIGHT = 30 * MAX_SPEED / NEIGHBOUR_RADIUS,
			SEPARATION_WEIGHT = 6.125 / SEPARATION_RADIUS;

	GE.DEBUG = false;

	function initCanvas(width,height){
		// canvas.removeAttr("width");
		// canvas.removeAttr("height");
		// canvasWidth = width||canvas.width();
		// canvasHeight = height||canvas.height();
		canvas[0].width = canvasWidth;
		canvas[0].height = canvasHeight;
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

	canvas.on("mousedown", function(e){
		var v = cameraSystem.screenToWorld(e.offsetX, e.offsetY);
		if(mouseLine){
			backgroundSystem.addSurface([mouseLine[0], mouseLine[1], v[0], v[1]]);
		}
		mouseLine = v;
	})
	.on('mousemove', function(e){
		var v = cameraSystem.screenToWorld(e.offsetX, e.offsetY);
		if(mouseLine){
			temporaryBackgroundSystem.clearSurfaces();
			temporaryBackgroundSystem.addSurface([mouseLine[0], mouseLine[1], v[0], v[1]]);
		}
	});

	$(document.body).on("keyup", function(e){
		if(e.which == 13){ // enter
			mouseLine = null;
			temporaryBackgroundSystem.clearSurfaces();
		}
		else if(e.which == 67){ // c
			backgroundSystem.clearSurfaces();
		}
		else if(e.which == 71){ // g
			controlObj.flocking = !controlObj.flocking;
		}
		else if(e.which == 84){ // t
			controlObj.cameraTrack = !controlObj.cameraTrack;
		}
	});
	/*
	 * a 65 b 66 c 67 d 68 e 69 f 70 g 71 h 72 i 73 j 74 k 75 l 76 m 77
	 * n 78 o 79 p 80 q 81 r 82 s 83 t 84 u 85 v 86 w 87 x 88 y 89 z 90
	 */

	worldBounds = [-canvasWidth/2, -canvasHeight/2, canvasWidth/2, canvasHeight/2];
	// worldBounds = [-500, -500, 500, 500];
	worldSystem = new GE.WorldSystem(worldBounds);

	cameraSystem = new GE.CameraSystem(context.canvas);
	renderSystem1 = new GE.CanvasRenderSystem(context, cameraSystem);

	renderSystem = new GE.MultiRenderSystem();
	renderSystem.addRenderSystem(renderSystem1);

	cameraSystem.setScale(1);

	worldSystem.addComponent(new GEC.DrawBoundsComponent(renderSystem));
	// cameraSystem.setRotation(-Math.PI/4);
	// cameraSystem.addComponent(new GEC.RotationComponent(0.00005));
	backgroundSystem = new GE.BackgroundSystem();
	// backgroundSystem.addSurface([worldBounds[0], worldBounds[1], worldBounds[0], worldBounds[3], worldBounds[2], worldBounds[3], worldBounds[2], worldBounds[1], worldBounds[0], worldBounds[1]]);
	// backgroundSystem.addSurface([20,40,40,20,40,-20,20,-40,-20,-40,-40,-20,-40,20,-20,40]);
	backgroundSystem.addSurfaces([[-27.5,103.5,-122.5,0.5],[-107.5,82,-178.5,145],[-209.5,-20,-107.5,-92],[-14.5,178,75.5,118],[-118.5,-173,-12.5,-46],[49.5,54,140.5,165],[-20.5,21,85.5,-50],[-238.5,133,-154.5,216],[-284.5,-20,-197.5,72],[-269.5,63,-352.5,151],[166.5,-10,81.5,-124],[-19.5,-142,111.5,-223],[135.5,85,269.5,4],[119.5,244,227.5,175],[234.5,87,317.5,206],[-232.5,201,-284.5,260],[-347.5,200,-419.5,142],[-360.5,68,-455.5,-28],[-384.5,-22,-277.5,-116],[-203.5,-105,-289.5,-212],[-212.5,-182,-88.5,-266],[25.5,-216,-24.5,-283],[-87.5,177,-6.5,260],[344.5,121,454.5,65],[384.5,16,316.5,-90],[190.5,-113,350.5,-202],[250.5,-203,202.5,-278],[414.5,-67,495.5,-104],[441.5,-189,399.5,-275],[-380.5,-115,-462.5,-192],[-394.5,-206,-275.5,-273],[-415.5,203,-473.5,271],[-505.5,165,-436.5,65],[426.5,148,484.5,235],[300.5,274,409.5,222]]);

	temporaryBackgroundSystem = new GE.BackgroundSystem(renderSystem);
	surfacesRenderComponent = new GEC.DrawSurfacesComponent(renderSystem);
	backgroundSystem.addComponent(surfacesRenderComponent);
	temporaryBackgroundSystem.addComponent(new GEC.DrawSurfacesComponent(renderSystem, '#88f'));

	gridSquareRenderingComponent = new GridSquareRenderingComponent(renderSystem);
	particleRenderingComponent = new ParticleRenderingComponent(renderSystem);
	arrowRenderingComponent = new ArrowRenderingComponent(renderSystem);

	worldBounceComponent = new GEC.WorldBounceComponent(worldSystem, 10, 10);
	worldWrapComponent = new GEC.WorldWrapComponent(worldSystem);

  rotateToHeadingComponent = new GEC.RotateToHeadingComponent();
  rotationInterpolatorComponent = new GEC.RotationInterpolatorComponent();

	flockingComponent = new FlockingComponent();

	flockingSwitchComponent = new GEC.SwitchComponent(controlObj, "flocking");
	flockingSwitchComponent.addComponents(
    [flockingComponent, worldWrapComponent, arrowRenderingComponent],
    [new GEC.GravityComponent(), worldWrapComponent, particleRenderingComponent]
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

	cameraSystem.addComponent(cameraTrackSwitchComponent);
	cameraSystem.addComponent(worldWrapComponent);
	// cameraSystem.addComponent(new GEC.BackgroundCollisionComponent(backgroundSystem));
	particles.push(cameraSystem);

	for(var i = 0; i < boxSize; i++){
		for(var j = 0; j < boxSize; j++){
			var x = j * particleSep + offsetX,
				y = i * particleSep + offsetY,
				vecNorm = vec2.fromValues(-y , x),
				len = vec2.length(vecNorm)*0.0001;
			vec2.scale(vecNorm, vecNorm, len);
			particle = new GameObject();
			particle.setPosition(-x,-y,0);
			particle.setVelocity(vecNorm[0], vecNorm[1], 0);
			particle.mass = 0.01;

			particle.colour = (i < boxSize / 2) ? "rgba(255,128,128,0.75)" : "rgba(128,128,255,0.75)";

			particle.addComponent(moveComponent);

			particle.addComponent(flockingSwitchComponent);

			particle.addComponent(rotateToHeadingComponent);
			particle.addComponent(rotationInterpolatorComponent);

			//particle.addComponent(worldComponent);
			particle.addComponent(new GEC.BackgroundCollisionComponent(backgroundSystem));
			//particle.addComponent(new GEC.BackgroundCollisionComponent(temporaryBackgroundSystem));

			flock.addObject(particle);
			particles.push(particle);
		}
	}

	gameRoot.addObject(flock);
	gameRoot.addObject(worldSystem);
	gameRoot.addObject(backgroundSystem);
	gameRoot.addObject(temporaryBackgroundSystem);
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

});
