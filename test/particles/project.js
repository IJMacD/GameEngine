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
		energySystem,
		energyMonitorComponent,
		particle,
		particleCount = 100,
		particleSep = 50,
		particles = [],
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

	function ParticleRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
	}
	ParticleRenderingComponent.prototype = new GameComponent();
	ParticleRenderingComponent.prototype.update = function(parent, delta) {
		this.renderSystem.push(function(context){
			context.fillStyle = "#000000";
			context.beginPath();
			context.arc(parent.position[0],parent.position[1],2,0,Math.PI*2,false);
			context.fill();
		});
	};

	function EnergySystem(renderSystem){
		this.renderSystem = renderSystem;
		this.totalEnergy = 0;
	}
	EnergySystem.prototype = new GameObject();
	EnergySystem.prototype.add = function(energy) {
		this.totalEnergy += energy;
	};
	EnergySystem.prototype.update = function(delta) {
		var totalEnergy = this.totalEnergy;
		this.totalEnergy = 0;
		this.renderSystem.push(function(context){
			context.fillStyle = "#000000";
			context.fillText(totalEnergy.toFixed(6), 50, 50);
		});
	};

	function EnergyMonitorComponent(energySystem){
		this.energySystem = energySystem;
	}
	EnergyMonitorComponent.prototype = new GameComponent();
	EnergyMonitorComponent.prototype.update = function(parent, delta) {
		this.energySystem.add(0.5 * parent.mass * vec2.squaredLength(parent.velocity));
	};

	cameraSystem = new GE.CameraSystem(canvasWidth, canvasHeight);
	renderSystem = new GE.CanvasRenderSystem(context, cameraSystem);
	cameraSystem.setScale(1);
	cameraSystem2 = new GE.CameraSystem(canvas2Width, canvas2Height);
	renderSystem2 = new GE.CanvasRenderSystem(context2, cameraSystem2);
	cameraSystem2.setScale(0.05);
	energySystem = new EnergySystem(renderSystem);
	energyMonitorComponent = new EnergyMonitorComponent(energySystem);

	var boxSize = Math.floor(Math.sqrt(particleCount)),
		offsetX = - boxSize * particleSep / 2,
		offsetY = - boxSize * particleSep / 2;
	for(var i = 0; i < boxSize; i++){
		for(var j = 0; j < boxSize; j++){
			var x = j * particleSep + offsetX,
				y = i * particleSep + offsetY,
				vecNorm = vec2.fromValues(-y , x),
				len = vec2.length(vecNorm)*0.000001;
			vec2.scale(vecNorm, vecNorm, len);
			particle = new GameObject();
			particle.setPosition(-x,-y,0);
			particle.setVelocity(vecNorm[0], vecNorm[1], 0);
			particle.mass = 0.01;

			particle.addComponent(new GEC.MoveComponent());
			for(var k = 0; k < i*boxSize + j; k++){
				particles[k].addComponent(new GEC.PointGravityComponent(particle));
				particle.addComponent(new GEC.PointGravityComponent(particles[k]));
			}
			//particle.addComponent(new GEC.WorldBounceComponent(2,2,[-canvasWidth/2,-canvasHeight/2,canvasWidth/2,canvasHeight/2]));
			particle.addComponent(energyMonitorComponent);

			if(i == 0 && j == 0){
				particle.addComponent(new GEC.DebugDrawPathComponent(renderSystem));
			}

			particle.addComponent(new ParticleRenderingComponent(renderSystem));
			particle.addComponent(new ParticleRenderingComponent(renderSystem2));

			gameRoot.addObject(particle);
			particles.push(particle);
		}
	}

	gameRoot.addObject(energySystem);
	gameRoot.addObject(cameraSystem);
	gameRoot.addObject(renderSystem);
	// gameRoot.addObject(cameraSystem2);
	// gameRoot.addObject(renderSystem2);

	function loop(time){
		requestAnimationFrame(loop);
		gameRoot.update(Math.min(time - lastTime,100));
		lastTime = time;
	}
	loop(0);

});
