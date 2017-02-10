const assert = require('assert');

const { GameObject, GameObjectManager, GameComponent } = require('../../dist/ijmacd-game-engine');

describe('GameObjectManager', function() {
  describe('#constructor()', function() {
    const gom = new GameObjectManager();

    it('should create a new GameObjectManager', function() {
      assert(gom instanceof GameObjectManager);
    });

    it('should be a subclass of GameObject', function() {
      assert(gom instanceof GameObject);
    });

    it("shouldn't have any objects", function() {
      assert.equal(gom.objects.length, 0);
    });

  });

  describe('#addObject()', function() {
    const gom = new GameObjectManager();
    const go = new GameObject();
    const go2 = new GameObject();

    gom.addObject(go);

    it('should add an object', function() {
      assert.equal(gom.objects.length, 1);
    });

    it('should add multiple objects', function() {
      gom.addObject(go);
      assert.equal(gom.objects.length, 2);
    });

  });

  describe('#addObjectAt()', function() {
    const gom = new GameObjectManager();
    const go = new GameObject();
    const go2 = new GameObject();

    gom.addObject(go);
    gom.addObjectAt(go2, 0);

    it('should add object at specified index', function() {
      assert.equal(gom.objects[0], go2);
    });

    it('should move later objects up one index', function() {
      assert.equal(gom.objects[1], go);
    });

  });

  describe('#removeObject()', function() {
    const gom = new GameObjectManager();
    const go = new GameObject();

    gom.addObject(go);
    gom.removeObject(go);

    it('shouldn\'t remove object immedietly', function() {
      assert.equal(gom.objects.length, 1);
    });

    it('should remove object after update', function() {
      gom.update();
      assert.equal(gom.objects.length, 0);
    });

    it('should remove parent reference', function() {
      assert(!go.parent);
    });

  });

  describe('#removeAll()', function() {
    const gom = new GameObjectManager();
    const go = new GameObject();
    const go2 = new GameObject();

    gom.addObject(go);
    gom.addObject(go2);
    gom.removeAll();

    it('should remove all objects immedietly', function() {
      assert.equal(gom.objects.length, 0);
    });

  });

  describe('#update()', function() {
    const gom = new GameObjectManager();
    const go = new class extends GameObject {
      update (delta) {
        updated = delta == 50;
      }
    }();
    let updated = false;

    gom.addObject(go);
    gom.update(50);

    it('should update child objects', function() {
      assert(updated);
    });
  });

});
