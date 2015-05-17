$(function() {

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
	}
	GridSquareRenderingComponent.prototype = new GE.GameComponent();
	GridSquareRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			var size = Math.pow(10,(parent.position[2] + 1000) / 1000),
					x = parent.position[0],//Math.floor(parent.position[0]/size)*size,
					y = parent.position[1],//Math.floor(parent.position[1]/size)*size,
					w = size,
					h = size;
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
				self = this;

		particles.forEach(function(other){
			var dist = vec3.dist(other.position, parent.position);
			if(dist > 0 && dist < NEIGHBOUR_RADIUS){
				vec3.add(self.cohesion, self.cohesion, other.position);
				vec3.add(self.align, self.align, other.velocity);

				if(dist < SEPARATION_RADIUS){
					vec3.subtract(self.spare, parent.position, other.position);
					vec3.normalize(self.spare, self.spare);
					vec3.scale(self.spare, self.spare, 1 / dist);
					vec3.add(self.separation, self.separation, self.spare);
				}

				count++;
			}
		});

		if(count > 0){
			vec3.scale(this.cohesion, this.cohesion, 1 / count);
			vec3.subtract(this.cohesion, this.cohesion, parent.position);
			vec3.scale(this.cohesion, this.cohesion, COHESION_WEIGHT);
			vec3.add(parent.velocity, parent.velocity, this.cohesion);

			vec3.scale(this.align, this.align, 1 / count);
			vec3.scale(this.align, this.align, ALIGN_WEIGHT);
			vec3.add(parent.velocity, parent.velocity, this.align);

			vec3.scale(this.separation, this.separation, 1/ count);
			vec3.scale(this.separation, this.separation, SEPARATION_WEIGHT);
			vec3.add(parent.velocity, parent.velocity, this.separation);

			if(vec3.length(parent.velocity) > MAX_SPEED){
				vec3.normalize(parent.velocity, parent.velocity);
				vec3.scale(parent.velocity, parent.velocity, MAX_SPEED);
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
			backgroundSystem,
			temporaryBackgroundSystem,
			worldSystem,
			worldBounds,
			particle,
			particleCount = 40,
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

			controlObj = {
				rotate: false,
				gravity: false,
				flocking: true
			},

			NEIGHBOUR_RADIUS = 55,
			SEPARATION_RADIUS = 40,
			MAX_SPEED = 0.1,
			COHESION_WEIGHT = 0.00025,
			ALIGN_WEIGHT = 0.035,
			SEPARATION_WEIGHT = 0.3;

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
		mouseLine = [ v[0], v[1] ];
	})
	.on("mousemove", function(e){
		if(mouseLine){
			temporaryBackgroundSystem.clearSurfaces();

			var v = cameraSystem.screenToWorld(e.offsetX, e.offsetY);

			mouseLine[2] = v[0];
			mouseLine[3] = v[1];

			temporaryBackgroundSystem.addSurface(mouseLine);
		}
	}).on("mouseup", function(){
		mouseLine = null;
	}).on("click", function(){
		controlObj.gravity = !controlObj.gravity;
		controlObj.flocking = !controlObj.flocking;
	});

	worldBounds = [-canvasWidth/2, -canvasHeight/2, canvasWidth/2, canvasHeight/2];
	worldSystem = new GE.WorldSystem(worldBounds);
	cameraSystem = new GE.CameraSystem(context.canvas, worldSystem);
	renderSystem = new GE.CanvasRenderSystem(context, cameraSystem);
	cameraSystem.setScale(0.8);
	worldSystem.addComponent(new GEC.DrawBoundsComponent(renderSystem));
	//cameraSystem.setRotation(-Math.PI/4);
	//cameraSystem.addComponent(new GEC.RotationComponent(0.00005));
	backgroundSystem = new GE.BackgroundSystem();
	//backgroundSystem.addSurface([worldBounds[0], worldBounds[1], worldBounds[0], worldBounds[3], worldBounds[2], worldBounds[3], worldBounds[2], worldBounds[1], worldBounds[0], worldBounds[1]]);
	backgroundSystem.addSurface([20,40,40,20,40,-20,20,-40,-20,-40,-40,-20,-40,20,-20,40]);
	temporaryBackgroundSystem = new GE.BackgroundSystem(renderSystem);
	surfacesRenderComponent = new GEC.DrawSurfacesComponent(renderSystem);
	backgroundSystem.addComponent(surfacesRenderComponent);
	temporaryBackgroundSystem.addComponent(surfacesRenderComponent);
	//worldComponent = new GEC.WorldBounceComponent(worldSystem, 10, 10);
	//worldComponent = new GEC.WorldWrapComponent(worldSystem);
	gravitySwitchComponent = new GEC.SwitchComponent(controlObj, "gravity");
	gravitySwitchComponent.addComponent(new GEC.GravityComponent());
	gravitySwitchComponent.addComponent(new GEC.WorldBounceComponent(worldSystem, 10, 10));
	flockingSwitchComponent = new GEC.SwitchComponent(controlObj, "flocking");
	flockingSwitchComponent.addComponent(new FlockingComponent());
	flockingSwitchComponent.addComponent(new GEC.WorldWrapComponent(worldSystem));
	rotateToHeadingComponent = new GEC.RotateToHeadingComponent();
	rotationInterpolatorComponent = new GEC.RotationInterpolatorComponent();

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


			var r = Math.random()*255,
					g = Math.random()*255,
					b = Math.random()*255;
			particle.colour = "rgba("+r.toFixed()+","+g.toFixed()+","+b.toFixed()+",0.75)";

			particle.addComponent(moveComponent);

			particle.addComponent(gravitySwitchComponent);
			particle.addComponent(flockingSwitchComponent);

			particle.addComponent(rotateToHeadingComponent);
			particle.addComponent(rotationInterpolatorComponent);

			//particle.addComponent(worldComponent);
			particle.addComponent(new GEC.BackgroundCollisionComponent(backgroundSystem));
			particle.addComponent(new GEC.BackgroundCollisionComponent(temporaryBackgroundSystem));

			//particle.addComponent(new GridSquareRenderingComponent(renderSystem));
			//particle.addComponent(new ParticleRenderingComponent(renderSystem));
			particle.addComponent(new ArrowRenderingComponent(renderSystem));

			flock.addObject(particle);
			particles.push(particle);
		}
	}


	// cameraSystem.addComponent(new GEC.FollowComponent(particles[0]));
	// cameraSystem.addComponent(new GEC.TrackRotationComponent(particles[0]));

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
