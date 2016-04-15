/* global vec2 */
/* global GE */
/// <reference path="../../typings/jquery/jquery.d.ts"/>
$(function() {
	"use strict";

	GE.GameComponent.create(function TileComponent(renderSystem, sprite, bounds) {
		this.renderSystem = renderSystem;
		this.sprite = sprite;
		this.bounds = bounds;
	}, {
		update: function(parent, delta){
			var renderSystem = this.renderSystem,
				sprite = this.sprite,
				bounds = this.bounds,
				dx = sprite.width,
				dy = sprite.height,
				startX = parent.position[0] % dx,
				startY = parent.position[1] % dy,
				x = bounds[0] + startX - dx,
				y = bounds[1],// + startY - dy,
				width = bounds[2],
				height = bounds[3],
				render = function(sprite, x, y){
					return function(context){
			            context.drawImage(sprite, x, y);
					};
				};
			for(; y < height + dy; y += dy){
				for(; x < width + dx; x += dx){
					renderSystem.push(render(sprite, x, y));
				}
			}
		}
	});

    GE.GameComponent.create(function SpriteSheetRenderingComponent(renderSystem){
        this.renderSystem = renderSystem;
    }, {
		update: function(parent, delta) {
	        var frame = parent.sprite[parent.spriteIndex%parent.sprite.length],
	            image = frame && frame.i;
	        this.renderSystem.push(function(context){
	            var x = parent.position[0],
	                y = parent.position[1],
	                w = frame.w,
	                h = frame.h;
	            context.translate(x,y);
	            context.rotate(parent.rotation);
	            context.drawImage(image, frame.x, frame.y, w, h, -frame.ox, -frame.oy, w, h);
	        });
	    }
	});


	GE.GameComponent.create(function PhysicsComponent(){ }, {
		update: function(parent, delta) {
			if(parent.impulse){
				vec2.add(parent.velocity, parent.velocity, parent.impulse);
				vec2.set(parent.impulse, 0, 0);
			}
		}
	});

    GE.GameComponent.create(function SpriteAnimationComponent(duration){
        this.duration = duration;
        this.countdown = duration;
    }, {
		update: function(parent, delta) {
	        var spriteCount = parent.sprite.length;
	        this.countdown -= delta;
	        if(this.countdown < 0){
	            parent.spriteIndex = (parent.spriteIndex + 1) % spriteCount;
	            this.countdown = this.duration;
	        }
		}
    });

	GE.GameComponent.create(function DisplayScoreComponent(renderSystem) {
		this.frameCount = 0;
		this.renderSystem = renderSystem;
	},
	{
		update: function (parent, delta) {

			var score = this.frameCount;
			this.frameCount++;

			renderSystem.push(function (context) {
				context.strokeStyle = "rgba(0,0,0,0.3)";
				context.lineWidth = 2;
				context.fillStyle = "#f00";
				context.font = "32px sans-serif";
				context.strokeText(score, parent.position[0], parent.position[1]);
				context.fillText(score, parent.position[0], parent.position[1]);
			}, -1); // -1 is a special layer rendered at the end independant of camera

		}
	});

	GE.GameComponent.create(function AttackCollisionComponent(collisionSystem) {
		this.collisionSystem = collisionSystem;
	},
	{
		update: function(parent, delta){
			var x = parent.position[0],
				y = parent.position[1],
				bounds = parent.bounds;
			this.collisionSystem.addAttackBounds([
				x + bounds[0],
				y + bounds[1],
				x + bounds[2],
				y + bounds[3]
			]);
		}
	});

	GE.GameComponent.create(function VulnerableCollisionComponent(collisionSystem) {
		this.collisionSystem = collisionSystem;
	},
	{
		update: function(parent, delta){
			var x = parent.position[0],
				y = parent.position[1],
				bounds = parent.bounds;
			this.collisionSystem.addVulnerableBounds([
				x + bounds[0],
				y + bounds[1],
				x + bounds[2],
				y + bounds[3]
			]);
		}
	});

	function CollisionSystem() {
		this.attackBounds = [];
		this.vulnerableBounds = [];
	}
	CollisionSystem.prototype = new GE.GameObject();
	CollisionSystem.prototype.addAttackBounds = function(bounds){
		this.attackBounds.push(bounds);
	};
	CollisionSystem.prototype.addVulnerableBounds = function(bounds){
		this.vulnerableBounds.push(bounds);
	};
	CollisionSystem.prototype.update = function (delta) {
		var i = 0,
			l = this.attackBounds.length,
			j = 0,
			m = this.vulnerableBounds.length,
			attack,
			vulnerable;
		for(; i < l; i++){
			attack = this.attackBounds[i];
			for(j = 0; j < m; j++){
				vulnerable = this.vulnerableBounds[j];

				if(attack[0] < vulnerable[2] &&
					attack[1] < vulnerable[3] &&
					attack[2] > vulnerable[0] &&
					attack[3] > vulnerable[1]){

						/*
						 * We have been killed!
						 */
						gameOver();
					}
			}
		}
		this.attackBounds.length = 0;
		this.vulnerableBounds.length = 0;
	};

	var GameObject = GE.GameObject,
		GameComponent = GE.GameComponent,
		GEC = GE.Comp,

		/* Constants */
		GROUND_HEIGHT = 128,
		TREE_HEIGHT = 290,
		STATE_PAUSED = 0,
		STATE_PLAYING = 1,
		STATE_DEAD = 2,
		CLICK_IMPULSE = -0.5,
		GRAVITATIONAL_CONSTANT = 0.00055,

		/* Bootstrap */
		canvas = $('#surface'),
		context = canvas[0].getContext("2d"),
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height(),

		/* Game Objects */
		gameRoot = new GE.GameObjectManager(),
		cameraSystem,
		renderSystem,
		worldSystem,
		worldBounds,
		collisionSystem,

		/* Game Components */
		moveComponent = new GEC.MoveComponent(),
		displayScoreComponent,

		/* Data */
		textures = [],
		texturePaths = [
			"img/sprite_player.png",
			"img/grass.png",
			"img/crate.png",
			"img/game_over.png",
			"img/tree.png",
			"img/sky.png"
		],

		gameSpeed = -0.1,
		gameDifficulty = 5000,
		gameState = STATE_PAUSED,

		lastTime = 0;

	GE.GRAVITATIONAL_CONSTANT = GRAVITATIONAL_CONSTANT;

	GE.DEBUG = true;

	initCanvas();

	initTextures();

	function initCanvas(width,height){
		canvasWidth = width || canvas.width()
		canvasHeight = height || canvas.height()
		canvas[0].width = canvasWidth;
		canvas[0].height = canvasHeight;
	}

    function initTextures() {
		var toLoad = texturePaths.length;
        textures = texturePaths.map(function(path){
            var texture = {};
            texture.image = new Image();
            texture.image.onload = function() {
               texture.width = texture.image.width;
			   texture.height = texture.image.height;
			   toLoad--;
			   if(toLoad == 0){
				   loaded();
			   }
            };
            texture.image.src = path;
            return texture;
        });
    }

	$(window).on("resize", function(){
		initCanvas();
	});

	canvas.on("click", function name() {
		if(gameState == STATE_PLAYING){
			// TODO: add player component to check if on ground first
			vec2.set(playerObject.impulse, 0, CLICK_IMPULSE);
		}
		else if (gameState == STATE_DEAD){
			gameReset();
			gameStart();
		}
		else if (gameState == STATE_PAUSED){
			gameStart();
		}
	});

	worldBounds = [-canvasWidth/2, -canvasHeight/2, canvasWidth/2, canvasHeight/2 - GROUND_HEIGHT + 10];

	worldSystem = new GE.WorldSystem(worldBounds);

	cameraSystem = new GE.CameraSystem(context.canvas);
	renderSystem = new GE.CanvasRenderSystem(context, cameraSystem);

	displayScoreComponent = new GEC.DisplayScoreComponent(renderSystem);

	collisionSystem = new CollisionSystem();


	var skyObject = new GameObject(),
		skySprite = textures[5].image;
	skyObject.setVelocity(gameSpeed / 16,0);
	skyObject.addComponent(moveComponent);
	skyObject.addComponent(new GEC.TileComponent(renderSystem, skySprite, worldBounds));

	gameRoot.addObject(skyObject);


	var treeObject = new GameObject(),
		treeBounds = [-canvasWidth/2, canvasHeight/2 - TREE_HEIGHT - GROUND_HEIGHT, canvasWidth/2, canvasHeight/2 - GROUND_HEIGHT],
		treeSprite = textures[4].image;
	treeObject.setVelocity(gameSpeed / 4,0);
	treeObject.addComponent(moveComponent);
	treeObject.addComponent(new GEC.TileComponent(renderSystem, treeSprite, treeBounds));

	gameRoot.addObject(treeObject);

	var tileObject = new GameObject(),
		groundBounds = [-canvasWidth/2, canvasHeight/2 - GROUND_HEIGHT, canvasWidth/2, canvasHeight/2],
		grassSprite = textures[1].image;
	tileObject.setVelocity(gameSpeed,0);
	tileObject.addComponent(moveComponent);
	tileObject.addComponent(new GEC.TileComponent(renderSystem, grassSprite, groundBounds));

	gameRoot.addObject(tileObject);

	var playerObject,
		playerSprite = [
            {i:textures[0].image,x:0,y:0,w:187,h:171,ox:50,oy:160},
            {i:textures[0].image,x:187,y:0,w:187,h:171,ox:50,oy:160},
            {i:textures[0].image,x:0,y:171,w:187,h:171,ox:50,oy:160},
            {i:textures[0].image,x:187,y:171,w:187,h:171,ox:50,oy:160},
            {i:textures[0].image,x:0,y:342,w:187,h:171,ox:50,oy:160},
            {i:textures[0].image,x:187,y:342,w:187,h:171,ox:50,oy:160},
            {i:textures[0].image,x:0,y:513,w:187,h:171,ox:50,oy:160}
        ],
        playerBounds = [-25, -135, 40, -10];

	createPlayer();

	function createPlayer() {
		playerObject = new GameObject();
		playerObject.setPosition(worldBounds[0] + 100, worldBounds[3] - 20);
		playerObject.bounds = playerBounds;
		playerObject.sprite = playerSprite;
		playerObject.spriteIndex = 0;
		playerObject.impulse = vec2.create();
		playerObject.addComponent(moveComponent);
		playerObject.addComponent(new GEC.GravityComponent());
		playerObject.addComponent(new GEC.PhysicsComponent());
		playerObject.addComponent(new GEC.WorldBounceComponent(worldSystem));
		playerObject.addComponent(new GEC.SpriteAnimationComponent(66));
		playerObject.addComponent(new GEC.SpriteSheetRenderingComponent(renderSystem));
		playerObject.addComponent(new GEC.VulnerableCollisionComponent(collisionSystem));
		// playerObject.addComponent(new GEC.DrawBoundsComponent(renderSystem));

		gameRoot.addObject(playerObject);
	}

	var crates = new GE.GameObjectManager();

	function KillCratesComponent (){};
	KillCratesComponent.prototype = new GameComponent();
	KillCratesComponent.update = function(parent, delta){
		if(parent.position[0] < worldBounds[0] - 100){
			crates.removeObject(parent);
		}
	};
	var killCratesComponent = new KillCratesComponent(),
		attackComponent = new GEC.AttackCollisionComponent(collisionSystem);

	addCrate();

	function addCrate() {
		var crate = new GameObject();
		crate.setPosition(worldBounds[2]+100,worldBounds[3] - 32);
		crate.setVelocity(gameSpeed, 0);
		crate.sprite = textures[2].image;
		crate.bounds = [-24,-24,24,24];
		crate.addComponent(moveComponent);
		crate.addComponent(new GEC.CanvasSpriteRenderingComponent(renderSystem));
		crate.addComponent(KillCratesComponent);
		crate.addComponent(attackComponent);
		//crate.addComponent(new GEC.DrawBoundsComponent(renderSystem));
		crates.addObject(crate);

		var timeout = Math.random() * gameDifficulty + (gameDifficulty / 2);
		setTimeout(addCrate, timeout);
	}

	var hudObject = new GameObject();
	hudObject.setPosition(canvasWidth - 100, 50);
	hudObject.addComponent(displayScoreComponent);

	gameRoot.addObject(crates);
	gameRoot.addObject(hudObject);

	gameRoot.addObject(collisionSystem);
	gameRoot.addObject(worldSystem);
	gameRoot.addObject(cameraSystem);
	gameRoot.addObject(renderSystem);

	function loop(time){
		try {
			gameRoot.update(Math.min(time - lastTime,100));

			if(gameState == STATE_PLAYING){
				requestAnimationFrame(loop);
			}
			else if (gameState == STATE_DEAD){
				var img = textures[3].image,
					x = (canvasWidth - img.width) / 2,
					y = (canvasHeight - img.height) /2;
				context.drawImage(img, x, y);
			}
			lastTime = time;
		} catch (e){
			console.error(e.stack);
		}
	}

	function loaded() {
		loop(lastTime);
	}

	function gameReset(){
		crates.removeAll();
		gameState = STATE_PAUSED;
	}

	function gameStart(){
		gameState = STATE_PLAYING;
		loop(lastTime);
	}

	function gameOver(){
		gameState = STATE_DEAD;
	}
});
