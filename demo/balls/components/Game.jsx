import React, { Component } from 'react';
import * as IGE from '../../../dist/ijmacd-game-engine';

const MAX_VELOCITY = 0.1;
const MAX_ROTATION = 0.01;

let game;
let ballBag;
let inputSystem;
let cameraSystem;
let worldSystem;
let collisionSystem;
let renderSystem;
let clickMarker;
let boundsAnimation;

let availableComponents = {
  Gravity: () => new IGE.Components.GravityComponent(),
  TerminalVelocity: () => new IGE.Components.TerminalVelocityComponent(MAX_VELOCITY),
  Move: () => new IGE.Components.MoveComponent(),
  WorldWrap: () => new IGE.Components.WorldWrapComponent(worldSystem),
  WorldBounce: () => new IGE.Components.WorldBounceComponent(worldSystem),
  BackgroundCollision: () => new IGE.Components.BackgroundCollisionComponent(collisionSystem),
  Rotation: () => new IGE.Components.RotationComponent((Math.random() - 0.5) * MAX_ROTATION),
  ColorAnimation: object => new IGE.Components.ColorAnimationComponent(object.color1, object.color2, 3000),
  BoundsAnimation: object => new IGE.Components.BoundsAnimationComponent(object.bounds1, object.bounds2, 2000, IGE.Easing.Smooth),
  RectangleRender: () => new IGE.Components.RectangleRenderComponent(renderSystem),
  DotRender: () => new IGE.Components.DotRenderComponent(renderSystem),
  DebugDrawBounds: () => new IGE.Debug.DebugDrawBoundsComponent(renderSystem),
  DebugPosition: () => new IGE.Debug.DebugPositionComponent(renderSystem),
  DebugVelocity: () => new IGE.Debug.DebugVelocityComponent(renderSystem),
  Click: () => new IGE.Components.ClickComponent(inputSystem),
  VelocityColor: () => new VelocityColorComponent(),
  Physics: () => new IGE.Components.PhysicsComponent(),
};

export default class Game extends Component {

  componentDidMount () {
    init(this.canvas, this.props);
    this.doImperitiveStuff();
  }

  componentDidUpdate (prevProps) {
    this.doImperitiveStuff(prevProps);
  }

  doImperitiveStuff (prevProps={}) {
    game.setScore(this.props.ballCount);

    IGE.Components.GravityComponent.GRAVITATIONAL_CONSTANT = this.props.gravityConstant;

    if(ballBag.objects.length > this.props.ballCount) {
      ballBag.objects.length = Math.max(this.props.ballCount, 0);
    }
    else {
      while(ballBag.objects.length < this.props.ballCount) {
        addBall(ballBag, this.props);
      }
    }

    if(this.props.impulseTime != prevProps.impulseTime) {
      ballBag.objects.forEach(object => {
        object.impulse[0] = (Math.random() - 0.5) * MAX_VELOCITY;
        object.impulse[1] = (Math.random() - 0.5) * MAX_VELOCITY;
      });
    }

    if (!prevProps.debug && this.props.debug) {
      worldSystem.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
      collisionSystem.addComponent(new IGE.Debug.DebugDrawSurfacesComponent(renderSystem));

      game.addObject(clickMarker);
    } else if (prevProps.debug && !this.props.debug) {
      worldSystem.removeComponentByName("DebugDrawBoundsComponent");
      collisionSystem.removeComponentByName("DebugDrawSurfacesComponent");

      game.root.objects[0].removeObject(clickMarker);
    }

    if (!deepEqual(prevProps.components, this.props.components)) {
      ballBag.objects.forEach(object => {
        setComponents(object, this.props.components);
      });
    }

    if (!prevProps.bounds && this.props.bounds) {
      worldSystem.addComponent(boundsAnimation);
    } else if (prevProps.bounds && !this.props.bounds) {
      worldSystem.removeComponent(boundsAnimation);
    }

    boundsAnimation.duration = this.props.boundsDuration || 5000;

    cameraSystem.setScale(this.props.cameraScale);
    cameraSystem.setPosition(this.props.cameraPositionX, this.props.cameraPositionY);
  }

  render () {
    const canvasStyle = {
      width: "100%",
      height: "100%",
    };

    return (
      <canvas
        style={canvasStyle}
        ref={(canvas) => { this.canvas = canvas; }}
      ></canvas>
    );
  }
}

class VelocityColorComponent extends IGE.GameComponent {
  update(parent, delta) {
    const v = parent.velocity;
    if (v[0] < 0) {
      if(v[1] < 0) {
        parent.color = "#800";
      } else {
        parent.color = "#8f0";
      }
    } else {
      if(v[1] < 0) {
        parent.color = "#f80";
      } else {
        parent.color = "#ff0";
      }
    }
  }
}

function init (canvas, options) {
  game = new IGE.Game({
    canvas,
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
    autosize: true,
    score: options.ballCount,
    originCentric: true,
  });

  inputSystem = game.getDefaultInput();
  cameraSystem = game.getDefaultCamera();
  renderSystem = game.getDefaultRenderer();
  worldSystem = game.getDefaultWorld();
  worldSystem.originalBounds = [...worldSystem.bounds];
  boundsAnimation = new IGE.Components.BoundsAnimationComponent(worldSystem.bounds, worldSystem.bounds.map(x => x * 0.6), 5000, IGE.Easing.Linear);

  // ScoreRenderComponent
  game.root.addComponent((parent, delta) => {
    renderSystem.push(ctx => {
      ctx.fillStyle = "#000";
      ctx.font = "48px sans-serif";
      ctx.textAlign = "end";
      ctx.fillText(game.score, game.width - 25, game.height - 25);
    }, -1);
  });

  // TimeRenderComponent
  game.root.addComponent(new (class extends IGE.GameComponent {
    constructor () {
      super();
      this.time = 0;
      game.on("score", () => {
        this.time = 0;
      });
    }

    update (parent, delta) {
      this.time += delta;
      renderSystem.push(ctx => {
        ctx.fillStyle = "#000";
        ctx.font = "48px sans-serif";
        const t = this.time / 1000
        let s = Math.floor(t % 60);
        if(s < 10) s = "0" + s;
        let m = Math.floor(t / 60);
        ctx.fillText(`${m}:${s}`, 25, game.height - 25);
      }, -1);
    }
  }));

  // Click Marker
  clickMarker = new IGE.GameObject();
  clickMarker.addComponent(new IGE.Components.MoveToClickComponent(game.getDefaultInput()));
  clickMarker.addComponent(new IGE.Components.SmoothPositionComponent());
  clickMarker.addComponent(new IGE.Debug.DebugPositionComponent(game.getDefaultRenderer()));

  collisionSystem = new IGE.Collision.BackgroundCollisionSystem();
  collisionSystem.addSurface([-game.width * 0.25, game.height / 2 - 100, 0, 0, game.width * 0.25, game.height / 2 - 100]);
  collisionSystem.addSurface([-game.width, game.height * 0.5 - 50, game.width, game.height * 0.5 - 50]);
  // collisionSystem.addSurface([-game.width * 0.5, game.height * 0.25, -game.width * 0.25, game.height * 0.5]);
  // collisionSystem.addSurface([game.width * 0.25, game.height * 0.5, game.width * 0.5, game.height * 0.25]);

  game.root.addObjectAt(collisionSystem, 1);

  IGE.Components.BackgroundCollisionComponent.COEFFICIENT_FRICTION = 0.95;
  IGE.Components.BackgroundCollisionComponent.COEFFICIENT_RESTITUTION = 0.95;

  ballBag = new IGE.GameObjectManager();

  game.addObject(ballBag);

  game.start();
}

function addBall(ballBag, options) {
  ballBag.addObject(ballFactory(options));
}

function ballFactory (options) {
  const ball = new IGE.GameObject();
  setRandomPosition(ball, worldSystem);
  ball.setVelocity((Math.random()-0.5) * MAX_VELOCITY, (Math.random()-0.5) * MAX_VELOCITY);
  const rx = Math.random() * 20 + 20;
  const ry = Math.random() * 20 + 20;
  ball.setBounds(-rx, -ry, rx, ry);
  ball.bounds1 = [...ball.bounds];
  ball.bounds2 = [-ry, -rx, ry, rx];
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  const r1 = Math.random() * 255;
  const g1 = Math.random() * 255;
  const b1 = Math.random() * 255;
  ball.color = `rgba(${r|0},${g|0},${b|0},0.8)`;
  ball.color1 = ball.color;
  ball.color2 = `rgba(${r1|0},${g1|0},${b1|0},0.8)`;

  ball.on("click", () => {
    ballBag.removeObject(ball);
  });

  return ball;
}

function setComponents (object, components) {
  // object.removeAllComponents();
  object.components.length = 0;

  components.forEach(name => {
    const factory = availableComponents[name];
    if (factory)
      object.addComponent(factory(object));
  });
}

function setRandomPosition(object, world) {
  const bounds = world.bounds;
  const minX = bounds[0];
  const minY = bounds[1];
  const width = bounds[2] - minX;
  const height = bounds[3] - minY;
  const x = Math.random() * width + minX;
  const y = Math.random() * height + minY;
  object.setPosition(x, y);
}

function deepEqual(a, b) {
  if (!a || !b)
    return false;

  if (a.length != b.length)
    return false;

  for (let i = 0, l = a.length; i < l; i++) {
    if (a[i] != b[i])
      return false;
  }

  return true;
}
