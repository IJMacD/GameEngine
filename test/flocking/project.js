$(function() {
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
		particle,
		particleCount = 400,
		particleSep = 50,
		particles = [],
		lastTime = 0,

		NEIGHBOUR_RADIUS = 55,
		SEPARATION_RADIUS = 40,
		MAX_SPEED = 0.1,
		COHESION_WEIGHT = 0.00025,
		ALIGN_WEIGHT = 0.015,
		SEPARATION_WEIGHT = 0.3;

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
			renderSystem.setCanvasSize(canvasWidth,canvasHeight);
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

	function ParticleRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	ParticleRenderingComponent.prototype = new GameComponent();
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
	GridSquareRenderingComponent.prototype = new GameComponent();
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


	function FlockingComponent(renderSystem){
		this.renderSystem = renderSystem;
		this.separation = vec3.create();
		this.align = vec3.create();
		this.cohesion = vec3.create();
		this.spare = vec3.create();
	}
	FlockingComponent.prototype = new GameComponent();
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


	cameraSystem = new GE.CameraSystem(0, 0, canvasWidth, canvasHeight);
	renderSystem = new GE.CanvasRenderSystem(context, canvasWidth, canvasHeight, cameraSystem);
	cameraSystem.setScale(1);

	var boxSize = Math.floor(Math.sqrt(particleCount)),
		offsetX = - boxSize * particleSep / 2,
		offsetY = - boxSize * particleSep / 2;
	for(var i = 0; i < boxSize; i++){
		for(var j = 0; j < boxSize; j++){
			var x = j * particleSep + offsetX,
				y = i * particleSep + offsetY,
				vecNorm = vec2.fromValues(-y , x),
				len = vec2.length(vecNorm)*0.0001;
			vec2.scale(vecNorm, vecNorm, len);
			particle = new GameObject();
			particle.setPosition(-x,-y,0);
			particle.setVelocity(vecNorm[0], vecNorm[1], x * y);
			particle.mass = 0.01;


			var r = Math.random()*255,
					g = Math.random()*255,
					b = Math.random()*255;
			particle.colour = "rgba("+r.toFixed()+","+g.toFixed()+","+b.toFixed()+",0.75)";

			particle.addComponent(new GEC.MoveComponent());
			particle.addComponent(new GEC.WorldWrapComponent([-canvasWidth/2,-canvasHeight/2,canvasWidth/2,canvasHeight/2,-1000,1000]));

			particle.addComponent(new FlockingComponent());

			particle.addComponent(new GridSquareRenderingComponent(renderSystem));
			//particle.addComponent(new ParticleRenderingComponent(renderSystem));

			flock.addObject(particle);
			particles.push(particle);
		}
	}

	gameRoot.addObject(flock);
	gameRoot.addObject(cameraSystem);
	gameRoot.addObject(renderSystem);

	function loop(time){
		requestAnimationFrame(loop);
		gameRoot.update(Math.min(time - lastTime,100));
		lastTime = time;
	}
	loop(0);

});
