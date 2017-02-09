import assert from 'assert';

import {
  Game,
  GameObjectManager,
  CameraSystem,
  CanvasRenderSystem,
  WorldSystem,
  InputSystem
} from '../../dist/ijmacd-game-engine';

class CanvasMock {
  constructor(width, height) {
    this.width = width;
    this.height = height;
  }
  getContext() {
    return { canvas: this }
  }
}

describe('Game', function() {
  describe('#constructor()', function() {

    it('should create a new Game with no options', function() {
      const game = new Game();

      assert(game instanceof Game);
      assert(!game.canvas);
      assert.strictEqual(game.width, 0);
      assert.strictEqual(game.height, 0);
      assert(game.root instanceof GameObjectManager);
      assert(Array.isArray(game.textures));
      assert(Array.isArray(game.sounds));
      assert.strictEqual(game.frame, 0);
      assert.strictEqual(game.time, 0);
      assert.strictEqual(game.score, 0);
      assert.strictEqual(game.lives, 0);
      assert.strictEqual(game.level, 0);
    });

    it('should create a new Game with options', function() {
      const game = new Game({
        width: 100,
        height: 200,
        score: 300,
        lives: 400,
        level: 500,
        /* autosize: true, */
      });

      assert(game instanceof Game);
      assert(!game.canvas);
      assert.equal(game.width, 100);
      assert.equal(game.height, 200);
      assert.equal(game.score, 300);
      assert.equal(game.lives, 400);
      assert.equal(game.level, 500);
    });

    it('should create a new Game with canvas', function() {
      const canvas = new CanvasMock(150, 250);
      const game = new Game({
        canvas
      });

      assert(game instanceof Game);
      assert.equal(game.canvas, canvas);
      assert.equal(game.width, canvas.width);
      assert.equal(game.height, canvas.height);
    });

    it('should create a new Game with canvas and options', function() {
      const canvas = new CanvasMock(150, 250);
      const game = new Game({
        canvas,
        width: 100,
        height: 200
      });

      assert(game instanceof Game);
      assert.equal(game.canvas, canvas);
      assert.equal(game.width, 100);
      assert.equal(game.height, 200);
      assert.equal(canvas.width, 100);
      assert.equal(canvas.height, 200);
    });

  });

  describe('#setCanvas()', function() {
    const canvas = new CanvasMock(150, 250);
    const canvas2 = new CanvasMock(350, 450);
    const game = new Game({
      canvas,
      width: 100,
      height: 200
    });

    game.setCanvas(canvas2);

    it('should replace the canvas', function() {
      assert.equal(game.canvas, canvas2);
    });

    it('should set size of new canvas', function() {
      assert.equal(canvas2.width, 100);
      assert.equal(canvas2.height, 200);
    });

  });

  // Can't test due to use of new Image();
  // describe('#loadTextures()', function() {
  //   const game = new Game();

  //   const textures = game.loadTextures(['a','b','c']);

  //   it('should map paths to textures', function() {
  //     assert.equal(textures.length, 3);
  //   });

  //   it('should return valid texture objects', function() {
  //     assert.deepEqual(textures[0], {
  //       image: textures[0].image,
  //       width: 0,
  //       height: 0,
  //       loaded: false
  //     });
  //   });

  // });

  // Can't test due to use of new Audio();
  // describe('#loadAudio()', function() {
  //   const game = new Game();

  //   const sounds = game.loadAudio(['a','b','c']);

  //   it('should map paths to sounds', function() {
  //     assert.equal(sounds.length, 3);
  //   });

  //   it('should return valid sound objects', function() {
  //     assert.deepEqual(sounds[0], {
  //       audio: sounds[0].audio,
  //       length: 0,
  //       loaded: false
  //     });
  //   });

  // });

  describe('#start()', function() {
    const game = new Game();
    const test = () => loaded = true;
    let loaded = false;

    game.on("loadLevel", test);

    game.start();

    it('should increase level and fire callback', function() {
      assert.equal(game.level, 1);
      assert(loaded);
    });

    it('should set play state', function() {
      assert.equal(game.state, Game.STATE_PLAYING);
    });

    it('should execute loop', function() {
      assert(game.frame >= 1);
    });

    after(function () {
      game.stop();
    });

  });

  describe('#stop()', function() {
    const game = new Game();

    game.start();
    game.stop();

    it('should set play state', function() {
      assert.equal(game.state, Game.STATE_STOPPED);
    });

    it('should stop executing loop', function(done) {
      let frame;
      setTimeout(() => { frame = game.frame }, 0);
      setTimeout(() => {
        assert.equal(game.frame, frame);
        done();
      }, 20);
    });

  });

  describe('#getDefaultCamera()', function() {
    const game = new Game({
      width: 100,
      height: 300
    });
    const camera = game.getDefaultCamera();

    it('should return instance of CameraSystem', function() {
      assert(camera instanceof CameraSystem);
    });

    it('should set camera position', function() {
      assert.equal(camera.position[0], 50);
      assert.equal(camera.position[1], 150);
    });

  });

  describe('#getDefaultRenderer()', function() {
    const canvas = new CanvasMock();
    const game = new Game({
      canvas
    });
    const renderer = game.getDefaultRenderer();
    const camera = game.getDefaultCamera();

    it('should return instance of CanvasRenderSystem', function() {
      assert(renderer instanceof CanvasRenderSystem);
    });

    it('should have reference to CameraSystem', function() {
      assert.equal(renderer.camera, camera);
    });

  });

  describe('#getDefaultWorld()', function() {
    const game = new Game({
      width: 100,
      height: 200
    });
    const world = game.getDefaultWorld();

    const game2 = new Game({
      width: 100,
      height: 200
    });
    const world2 = game2.getDefaultWorld(10, 20);

    it('should return instance of WorldSystem', function() {
      assert(world instanceof WorldSystem);
    });

    it('should have default bounds', function() {
      assert.deepEqual(world.bounds, [0,0,100,200]);
    });

    it('should have custom bounds', function() {
      assert.deepEqual(world2.bounds, [-10,-20,110,220]);
    });

    it('should be able to change bounds', function() {
      game2.getDefaultWorld(30, 40);
      assert.deepEqual(world2.bounds, [-30,-40,130,240]);
    });

  });

  describe('#getDefaultInput()', function() {
    const canvas = new CanvasMock();
    const game = new Game();
    const input = game.getDefaultInput();
    const camera = game.getDefaultCamera();

    it('should return instance of InputSystem', function() {
      assert(input instanceof InputSystem);
    });

    it('should have reference to CameraSystem', function() {
      assert.equal(input.camera, camera);
    });

  });

  describe('#setScore()', function() {
    const game = new Game();
    const test = (score) => loaded = score == 10;
    let loaded = false;

    game.on("score", test);

    game.setScore(10);

    it('should set score', function() {
      assert.equal(game.score, 10);
    });

    it('should fire callback', function() {
      assert(loaded);
    });

  });

  describe('#nextLevel()', function() {
    const game = new Game();
    const test = (level) => loaded = level == 1;
    let loaded = false;

    game.on("loadLevel", test);

    game.nextLevel();

    it('should set level', function() {
      assert.equal(game.level, 1);
    });

    it('should fire callback', function() {
      assert(loaded);
    });

  });

  describe('#setLevel()', function() {
    const game = new Game();
    const test = (level) => loaded = level == 10;
    let loaded = false;

    game.on("loadLevel", test);

    game.setLevel(10);

    it('should set level', function() {
      assert.equal(game.level, 10);
    });

    it('should fire callback', function() {
      assert(loaded);
    });

  });

  describe('#completeLevel()', function() {
    const game = new Game();
    const test = (level) => loaded = level == 0;
    let loaded = false;

    game.on("levelComplete", test);

    game.completeLevel();

    it('should fire callback', function() {
      assert(loaded);
    });

  });

  describe('#setSize()', function() {
    const canvas = new CanvasMock();
    const game = new Game({
      canvas
    });

    game.setSize(100,200);

    it('should set game size', function() {
      assert.equal(game.width, 100);
      assert.equal(game.height, 200);
    });

    it('should set canvas size', function() {
      assert.equal(canvas.width, 100);
      assert.equal(canvas.height, 200);
    });

  });

  // Can't test due to window
  // describe('#setAutosize()', function() {
  //   const canvas = new CanvasMock(100, 200);
  //   const game = new Game({
  //     canvas
  //   });

  //   game.setAutosize(true);

  //   canvas.width = 300;
  //   canvas.height = 400;

  //   window.fire("resize");

  //   it('should set game size', function() {
  //     assert.equal(game.width, 300);
  //     assert.equal(game.height, 400);
  //   });

  // });

});
