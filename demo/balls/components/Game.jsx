import React, { Component } from 'react';
import * as IGE from '../../../dist/ijmacd-game-engine';

const MAX_VELOCITY = 0.1;
const MAX_ROTATION = 0.01;

export default class Game extends Component {

  componentDidMount () {
    init(this.canvas, this);
    this.doImperitiveStuff();
  }

  componentDidUpdate (prevProps) {
    this.doImperitiveStuff(prevProps);
  }

  doImperitiveStuff (prevProps={}) {
    game.setScore(this.props.ballCount);

    if (!prevProps.debug && this.props.debug) {
      worldSystem.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
      collisionSystem.addComponent(new IGE.Debug.DebugDrawSurfacesComponent(renderSystem));

      ballBag.objects.forEach(object => {
        object.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
        object.addComponent(new IGE.Debug.PositionRenderComponent(renderSystem));
      });

      game.addObject(clickMarker);
    } else if (prevProps.debug && !this.props.debug) {
      worldSystem.removeComponentByName("DebugDrawBoundsComponent");
      collisionSystem.removeComponentByName("DebugDrawSurfacesComponent");

      ballBag.objects.forEach(object => {
        object.removeComponentByName("DebugDrawBoundsComponent");
        object.removeComponentByName("PositionRenderComponent");
      });

      game.root.objects[0].removeObject(clickMarker);
    }

    componentHelper(prevProps.gravity, this.props.gravity, object => {
      object.addComponent(new IGE.Components.GravityComponent());
    }, object => {
      object.removeComponentByName("GravityComponent");
    });

    componentHelper(prevProps.wrap, this.props.wrap, object => {
      object.addComponent(new IGE.Components.WorldWrapComponent(worldSystem));
      object.removeComponentByName("WorldBounceComponent");
    }, object => {
      object.addComponent(new IGE.Components.WorldBounceComponent(worldSystem));
      object.removeComponentByName("WorldWrapComponent");
    });

    componentHelper(prevProps.background, this.props.background, object => {
      object.addComponent(new IGE.Components.BackgroundCollisionComponent(collisionSystem));
    }, object => {
      object.removeComponentByName("BackgroundCollisionComponent");
    });

    componentHelper(prevProps.square, this.props.square, object => {
      object.addComponent(new IGE.Components.RectangleRenderComponent(renderSystem));
      object.removeComponentByName("DotRenderComponent");
    }, object => {
      object.addComponent(new IGE.Components.DotRenderComponent(renderSystem));
      object.removeComponentByName("RectangleRenderComponent");
    });

    componentHelper(prevProps.rotation, this.props.rotation, object => {
      object.addComponent(new IGE.Components.RotationComponent((Math.random() - 0.5) * MAX_ROTATION));
    }, object => {
      object.removeComponentByName("RotationComponent");
    });

    if (!prevProps.bounds && this.props.bounds) {
      const bounds = worldSystem.originalBounds;
      const bounds2 = bounds.map(x => x * 0.8);
      worldSystem.addComponent(new IGE.Components.BoundsAnimationComponent(bounds, bounds2, 5000, IGE.Easing.Linear));
    } else if (prevProps.bounds && !this.props.bounds) {
      worldSystem.removeComponentByName("BoundsAnimationComponent");
    }

    componentHelper(prevProps.bounds, this.props.bounds, object => {
      const bounds = object.originalBounds;
      const bounds2 = [bounds[1], bounds[0], bounds[3], bounds[2]];
      object.addComponent(new IGE.Components.BoundsAnimationComponent(bounds, bounds2, 5000, IGE.Easing.Linear));
    }, object => {
      object.removeComponentByName("BoundsAnimationComponent");
    });
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

function componentHelper (oldValue, newValue, positiveAction, negativeAction) {
  if (!oldValue && newValue) {
    ballBag.objects.forEach(positiveAction);
  } else if (oldValue && !newValue) {
    ballBag.objects.forEach(negativeAction);
  }
}

let game;
let ballBag;
let inputSystem;
let cameraSystem;
let worldSystem;
let collisionSystem;
let renderSystem;
let clickMarker;

function init (canvas, component) {
  game = new IGE.Game({
    canvas,
    width: canvas.offsetWidth,
    height: canvas.offsetHeight,
    autosize: true,
    score: 10,
    originCentric: true,
  });

  const options = component.props;

  inputSystem = game.getDefaultInput();
  cameraSystem = game.getDefaultCamera();
  renderSystem = game.getDefaultRenderer();
  worldSystem = game.getDefaultWorld(50);
  worldSystem.originalBounds = [...worldSystem.bounds];

  if (options.bounds)
    worldSystem.addComponent(new IGE.Components.BoundsAnimationComponent(worldSystem.bounds, worldSystem.bounds.map(x => x * 0.8), 5000, IGE.Easing.Linear));

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
  clickMarker.addComponent(new IGE.Debug.PositionRenderComponent(game.getDefaultRenderer()));

  if (options.debug) {
    game.addObject(clickMarker);
  }

  collisionSystem = new IGE.Collision.BackgroundCollisionSystem();
  collisionSystem.addSurface([-game.width * 0.25, game.height / 2 - 100, 0, 0, game.width * 0.25, game.height / 2 - 100]);
  collisionSystem.addSurface([-game.width * 0.5, game.height * 0.25, -game.width * 0.25, game.height * 0.5]);
  collisionSystem.addSurface([game.width * 0.25, game.height * 0.5, game.width * 0.5, game.height * 0.25]);

  game.root.addObjectAt(collisionSystem, 1);

  IGE.Components.BackgroundCollisionComponent.COEFFICIENT_FRICTION = 0.95;
  IGE.Components.BackgroundCollisionComponent.COEFFICIENT_RESTITUTION = 0.95;

  ballBag = new IGE.GameObjectManager();

  for(let i = 0; i < game.score; i++) {
    addBall(ballBag, options);
  }

  game.addObject(ballBag);

  game.start();

  game.on("score", score => {
    if(ballBag.objects.length > score) {
      ballBag.objects.length = Math.max(score, 0);
    }
    else {
      while(ballBag.objects.length < score) {
        addBall(ballBag, component.props);
      }
    }
  });
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
  ball.originalBounds = [...ball.bounds];
  const bounds2 = [-ry, -rx, ry, rx];
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  const r1 = Math.random() * 255;
  const g1 = Math.random() * 255;
  const b1 = Math.random() * 255;
  const color = `rgba(${r|0},${g|0},${b|0},1)`;
  const color2 = `rgba(${r1|0},${g1|0},${b1|0},0.5)`;

  if (options.gravity)
    ball.addComponent(new IGE.Components.GravityComponent());

  ball.addComponent(new IGE.Components.TerminalVelocityComponent(MAX_VELOCITY));
  ball.addComponent(new IGE.Components.MoveComponent());

  if (options.wrap) {
    ball.addComponent(new IGE.Components.WorldWrapComponent(worldSystem));
  } else {
    ball.addComponent(new IGE.Components.WorldBounceComponent(worldSystem));
  }

  if (options.background)
    ball.addComponent(new IGE.Components.BackgroundCollisionComponent(collisionSystem));

  if (options.rotation)
    ball.addComponent(new IGE.Components.RotationComponent((Math.random() - 0.5) * MAX_ROTATION));

  ball.addComponent(new IGE.Components.ColorAnimationComponent(color, color2, 3000));

  if (options.bounds)
    ball.addComponent(new IGE.Components.BoundsAnimationComponent(ball.bounds, bounds2, 2000, IGE.Easing.Smooth));

  if (options.square) {
    ball.addComponent(new IGE.Components.RectangleRenderComponent(renderSystem, color));
  } else {
    ball.addComponent(new IGE.Components.DotRenderComponent(renderSystem, color));
  }

  if (options.debug) {
    ball.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
    ball.addComponent(new IGE.Debug.PositionRenderComponent(renderSystem));
  }

  ball.addComponent(new IGE.Components.ClickComponent(inputSystem));

  ball.on("click", () => {
    ballBag.removeObject(ball);
  });

  return ball;
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
