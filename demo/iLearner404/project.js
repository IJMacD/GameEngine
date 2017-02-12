(function() {
	"use strict";

	class DisplayScoreComponent extends IGE.GameComponent {
		constructor (renderSystem) {
			super();

			this.frameCount = 0;
			this.renderSystem = renderSystem;
		}

		update (parent, delta) {

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
	}

	var GameObject = IGE.GameObject,
		GameComponent = IGE.GameComponent,
		GEC = IGE.Components,

		/* Constants */
		GROUND_HEIGHT = 128,
		TREE_HEIGHT = 290,
		STATE_PAUSED = 0,
		STATE_PLAYING = 1,
		STATE_DEAD = 2,
		CLICK_IMPULSE = -0.5,
		GRAVITATIONAL_CONSTANT = 0.00055,

		/* Bootstrap */
		canvas = document.getElementById('surface'),
		context = canvas.getContext("2d"),
		canvasWidth = canvas.offsetWidth,
		canvasHeight = canvas.offsetHeight,

		/* Game Objects */
		gameRoot = new IGE.GameObjectManager(),
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

	IGE.GRAVITATIONAL_CONSTANT = GRAVITATIONAL_CONSTANT;

	IGE.DEBUG = true;

	initCanvas();

	initTextures();

	function initCanvas(width,height){
		canvasWidth = width || canvas.offsetWidth;
		canvasHeight = height || canvas.offsetHeight;
		canvas.width = canvasWidth;
		canvas.height = canvasHeight;
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

	window.addEventListener("resize", function(){
		initCanvas();
	});

	canvas.addEventListener("click", function () {
		if(gameState == STATE_PLAYING){
			// TODO: add player component to check if on ground first
			playerObject.impulse[1] = CLICK_IMPULSE;
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

	worldSystem = new IGE.WorldSystem(worldBounds);

	cameraSystem = new IGE.CameraSystem(canvasWidth, canvasHeight);
	renderSystem = new IGE.CanvasRenderSystem(context, cameraSystem);

	displayScoreComponent = new DisplayScoreComponent(renderSystem);

	collisionSystem = new IGE.Collision.CollisionSystem();

	var skyObject = new GameObject(),
		skySprite = textures[5];
	skyObject.setVelocity(gameSpeed / 16,0);
	skyObject.addComponent(moveComponent);
	skyObject.addComponent(new IGE.Render.TileRenderComponent(renderSystem, skySprite, worldBounds));

	gameRoot.addObject(skyObject);


	var treeObject = new GameObject(),
		treeBounds = [-canvasWidth/2, canvasHeight/2 - TREE_HEIGHT - GROUND_HEIGHT, canvasWidth/2, canvasHeight/2 - GROUND_HEIGHT],
		treeSprite = textures[4];
	treeObject.setVelocity(gameSpeed / 4,0);
	treeObject.addComponent(moveComponent);
	treeObject.addComponent(new IGE.Render.TileRenderComponent(renderSystem, treeSprite, treeBounds));

	gameRoot.addObject(treeObject);

	var tileObject = new GameObject(),
		groundBounds = [-canvasWidth/2, canvasHeight/2 - GROUND_HEIGHT, canvasWidth/2, canvasHeight/2],
		grassSprite = textures[1];
	tileObject.setVelocity(gameSpeed,0);
	tileObject.addComponent(moveComponent);
	tileObject.addComponent(new IGE.Render.TileRenderComponent(renderSystem, grassSprite, groundBounds));

	gameRoot.addObject(tileObject);

	var playerObject,
		playerSprites = [
            {t:textures[0],x:0,y:0,w:187,h:171,ox:50,oy:160},
            {t:textures[0],x:187,y:0,w:187,h:171,ox:50,oy:160},
            {t:textures[0],x:0,y:171,w:187,h:171,ox:50,oy:160},
            {t:textures[0],x:187,y:171,w:187,h:171,ox:50,oy:160},
            {t:textures[0],x:0,y:342,w:187,h:171,ox:50,oy:160},
            {t:textures[0],x:187,y:342,w:187,h:171,ox:50,oy:160},
            {t:textures[0],x:0,y:513,w:187,h:171,ox:50,oy:160}
        ],
        playerBounds = [-25, -135, 40, -10];

	createPlayer();

	function createPlayer() {
		playerObject = new GameObject();
		playerObject.setPosition(worldBounds[0] + 100, worldBounds[3] - 20);
		playerObject.bounds = playerBounds;
		playerObject.sprite = playerSprites[0];
		playerObject.sprites = playerSprites;
		playerObject.impulse = [0,0];
		playerObject.addComponent(moveComponent);
		playerObject.addComponent(new GEC.GravityComponent());
		playerObject.addComponent(new GEC.PhysicsComponent());
		var worldBounceComponent = new GEC.WorldBounceComponent(worldSystem);
		worldBounceComponent.cRestitution = 0.4;
		worldBounceComponent.cFriction = 0.9;
		playerObject.addComponent(worldBounceComponent);
		playerObject.addComponent(new IGE.Render.SpriteAnimationComponent(66));
		playerObject.addComponent(new IGE.Render.SpriteRenderComponent(renderSystem));
		playerObject.addComponent(new GEC.CollisionComponent(collisionSystem, false, true));
		playerObject.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
		playerObject.on("attackedBy", (attack, vulnerable) => {
			// We hit a crate
			gameOver();
		});

		gameRoot.addObject(playerObject);
	}

	var crates = new IGE.GameObjectManager();

	function KillCratesComponent (){};
	KillCratesComponent.prototype = new GameComponent();
	KillCratesComponent.update = function(parent, delta){
		if(parent.position[0] < worldBounds[0] - 100){
			crates.removeObject(parent);
		}
	};
	var killCratesComponent = new KillCratesComponent(),
		attackComponent = new GEC.CollisionComponent(collisionSystem, true);

	addCrate();

	function addCrate() {
		var crate = new GameObject();
		crate.setPosition(worldBounds[2]+100,worldBounds[3] - 32);
		crate.setVelocity(gameSpeed, 0);
		crate.sprite = {t: textures[2],x:0,y:0,w:64,h:64,ox:32,oy:32 };
		crate.bounds = [-24,-24,24,24];
		crate.addComponent(moveComponent);
		crate.addComponent(new IGE.Render.SpriteRenderComponent(renderSystem));
		crate.addComponent(KillCratesComponent);
		crate.addComponent(attackComponent);
		crate.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
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
}());
