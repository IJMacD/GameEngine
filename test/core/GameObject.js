const assert = require('assert');

const { GameObject, GameComponent } = require('../../dist/ijmacd-game-engine');

describe('GameObject', function() {
  describe('#constructor()', function() {
    const go = new GameObject();

    it('should create a new GameObject', function() {
      assert(go instanceof GameObject);
    });

    it('should have position property', function() {
      assert(go.position && go.position.length == 3);
    });

    it('should have velocity property', function() {
      assert(go.velocity && go.velocity.length == 3);
    });

    it('should have rotation property', function() {
      assert(go.rotation !== undefined);
    });

    it('should have rotation axis property', function() {
      assert(go.rotationAxis);
      assert.deepEqual(go.rotationAxis, [0,0,1]);
    });

    it("shouldn't have any components", function() {
      assert.equal(go.components.length, 0);
    });

  });

  describe('#addComponent()', function() {
    const go = new GameObject();
    const gc = new class TestComponent extends GameComponent {
      init (parent) {
        initialised = parent === go;
      }
    }();
    let initialised = false;

    go.addComponent(gc);

    it('should add a component', function() {
      assert.equal(go.components.length, 1);
    });

    it('should initialise component with parent', function() {
      assert(initialised);
    });

    it('should be able to add more than one component', function() {
      go.addComponent(gc);
      assert.equal(go.components.length, 2);
    });

    it('should be able to add a pure component', function() {
      go.addComponent((update, delta) => delta);
      assert.equal(go.components.length, 3);
    });

  });

  describe('#addComponents()', function() {
    const go = new GameObject();
    class TestComponent extends GameComponent {
      constructor () { super(); this.initialised = false; }
      init (parent) {
        this.initialised = parent === go;
      }
    }
    const gc = new TestComponent();
    const gc2 = new TestComponent();

    go.addComponents([gc, gc2]);

    it('should add multiple components', function() {
      assert.equal(go.components.length, 2);
    });

    it('should initialise components with parent', function() {
      assert(gc.initialised && gc2.initialised);
    });

  });

  describe('#removeComponent()', function() {
    const go = new GameObject();
    const gc = new GameComponent();
    const gc2 = new GameComponent();

    go.addComponent(gc);
    go.removeComponent(gc);

    it('shouldn\'t remove component immedietly', function() {
      assert.equal(go.components.length, 1);
    });

    it('should remove component after update', function() {
      go.update();
      assert.equal(go.components.length, 0);
    });

    it('should only remove one component', function() {
      go.addComponent(gc);
      go.addComponent(gc2);
      go.removeComponent(gc)
      go.update();
      assert.equal(go.components.length, 1);
    });

  });

  describe('#removeComponentByName()', function() {
    class TestComponent extends GameComponent {}
    const go = new GameObject();
    const gc = new TestComponent();
    const gc2 = new TestComponent();

    go.addComponent(gc);
    go.removeComponentByName("TestComponent");

    it('shouldn\'t remove component immedietly', function() {
      assert.equal(go.components.length, 1);
    });

    it('should remove component after update', function() {
      go.update();
      assert.equal(go.components.length, 0);
    });

    it('should remove component with custom name', function() {
      gc.name = "CustomTestComponent"
      go.addComponent(gc);
      go.removeComponentByName("CustomTestComponent");
      go.update();
      assert.equal(go.components.length, 0);
    });

    it('should only remove one component', function() {
      go.addComponent(gc);  // CustomTestComponent
      go.addComponent(gc2); // TestComponent
      go.removeComponentByName("CustomTestComponent");
      go.update();
      assert.equal(go.components.length, 1);
    });

  });

  describe('#removeComponentByTest()', function() {
    class TestComponent extends GameComponent {}
    const go = new GameObject();
    const gc = new TestComponent ();
    const gc2 = new TestComponent ();
    const test = c => c === gc;

    go.addComponent(gc);
    go.removeComponentByTest(test);

    it('shouldn\'t remove component immedietly', function() {
      assert.equal(go.components.length, 1);
    });

    it('should remove component after update', function() {
      go.update();
      assert.equal(go.components.length, 0);
    });

    it('should only remove one component', function() {
      go.addComponent(gc);
      go.addComponent(gc2);
      go.removeComponentByTest(test);
      go.update();
      assert.equal(go.components.length, 1);
    });

  });

  describe('#removeAllComponents()', function() {
    const go = new GameObject();
    const gc = new GameComponent();
    const gc2 = new GameComponent();

    go.addComponent(gc);
    go.addComponent(gc2);
    go.removeAllComponents();

    it('shouldn\'t remove components immedietly', function() {
      assert.equal(go.components.length, 2);
    });

    it('should remove component after update', function() {
      go.update();
      assert.equal(go.components.length, 0);
    });

  });

  describe('#setPosition()', function() {
    const go = new GameObject();

    go.setPosition(1,2,3);

    it('should set position', function() {
      assert.deepEqual(go.position, [1,2,3]);
    });

    it('should not change y and z', function() {
      go.setPosition(4)
      assert.deepEqual(go.position, [4,2,3]);
    });

    it('should not change x and z', function() {
      go.setPosition(undefined, 5)
      assert.deepEqual(go.position, [4,5,3]);
    });

    it('should not change x and y', function() {
      go.setPosition(undefined, undefined, 6)
      assert.deepEqual(go.position, [4,5,6]);
    });

  });

  describe('#setVelocity()', function() {
    const go = new GameObject();

    go.setVelocity(1,2,3);

    it('should set velocity', function() {
      assert.deepEqual(go.velocity, [1,2,3]);
    });

    it('should not change y and z', function() {
      go.setVelocity(4)
      assert.deepEqual(go.velocity, [4,2,3]);
    });

    it('should not change x and z', function() {
      go.setVelocity(undefined, 5)
      assert.deepEqual(go.velocity, [4,5,3]);
    });

    it('should not change x and y', function() {
      go.setVelocity(undefined, undefined, 6)
      assert.deepEqual(go.velocity, [4,5,6]);
    });

  });

  describe('#setBounds()', function() {
    const go = new GameObject();

    go.setBounds(1, 2, 3, 4, 5, 6);

    it('should set bounds', function() {
      assert.deepEqual(go.bounds, [1,2,3,4,5,6]);
    });

  });

  describe('#setRotation()', function() {
    const go = new GameObject();

    go.setRotation(Math.PI);

    it('should set rotation', function() {
      assert.equal(go.rotation, Math.PI);
    });

    it('should set and normalise rotation axis', function() {
      go.setRotation(0, [2,0,0]);
      assert.deepEqual(go.rotationAxis, [1,0,0]);
    });

  });

  describe('#update()', function() {
    const go = new GameObject();
    const gc = new class TestComponent extends GameComponent {
      update (parent, delta) {
        updated = parent === go && delta == 50;
      }
    }();
    let updated = false;

    go.addComponent(gc);
    go.update(50);

    it('should update component', function() {
      assert(updated);
    });

    it('should update pure component', function() {
      let updated = false;
      go.addComponent((parent, delta) => {updated = true});
      go.update();
      assert(updated);
    });
  });

  describe('events', function() {
    const go = new GameObject();
    let called = false;
    let called2 = false;

    go.on("event", () => called = true);
    go.fire("event");

    it('should register callback and fire event', function() {
      assert(called);
    });

    it('should register and call multiple callbacks', function() {
      called = false;
      go.on("event", () => called2 = true);
      go.fire("event");
      assert(called);
      assert(called2);
    });
  });
});
