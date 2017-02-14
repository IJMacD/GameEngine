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

    IGE.Components.GravityComponent.GRAVITATIONAL_CONSTANT = this.props.gravityConstant;

    if (!prevProps.debug && this.props.debug) {
      worldSystem.addComponent(new IGE.Debug.DebugDrawBoundsComponent(renderSystem));
      collisionSystem.addComponent(new IGE.Debug.DebugDrawSurfacesComponent(renderSystem));

      game.addObject(clickMarker);
    } else if (prevProps.debug && !this.props.debug) {
      worldSystem.removeComponentByName("DebugDrawBoundsComponent");
      collisionSystem.removeComponentByName("DebugDrawSurfacesComponent");

      game.root.objects[0].removeObject(clickMarker);
    }

    if (prevProps.components != this.props.components) {
      ballBag.objects.forEach(object => {
        // object.removeAllComponents();
        object.components.length = 0;

        this.props.components.forEach(name => {
          object.addComponent(availableComponents[name](object));
        });
      });
    }

    if (!prevProps.bounds && this.props.bounds) {
      const bounds = worldSystem.originalBounds;
      const bounds2 = bounds.map(x => x * 0.8);
      worldSystem.addComponent(new IGE.Components.BoundsAnimationComponent(bounds, bounds2, 5000, IGE.Easing.Linear));
    } else if (prevProps.bounds && !this.props.bounds) {
      worldSystem.removeComponentByName("BoundsAnimationComponent");
    }

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

let game;
let ballBag;
let inputSystem;
let cameraSystem;
let worldSystem;
let collisionSystem;
let renderSystem;
let clickMarker;

let availableComponents = {
  Gravity: () => new IGE.Components.GravityComponent(),
  TerminalVelocity: () => new IGE.Components.TerminalVelocityComponent(MAX_VELOCITY),
  Move: () => new IGE.Components.MoveComponent(),
  WorldWrap: () => new IGE.Components.WorldWrapComponent(worldSystem),
  WorldBounce: () => new IGE.Components.WorldBounceComponent(worldSystem),
  BackgroundCollision: () => new IGE.Components.BackgroundCollisionComponent(collisionSystem),
  Rotation: () => new IGE.Components.RotationComponent((Math.random() - 0.5) * MAX_ROTATION),
  ColorAnimation: object => new IGE.Components.ColorAnimationComponent(object.color, object.color2, 3000),
  BoundsAnimation: object => new IGE.Components.BoundsAnimationComponent(object.bounds, object.bounds2, 2000, IGE.Easing.Smooth),
  RectangleRender: () => new IGE.Components.RectangleRenderComponent(renderSystem),
  DotRender: () => new IGE.Components.DotRenderComponent(renderSystem),
  DebugDrawBounds: () => new IGE.Debug.DebugDrawBoundsComponent(renderSystem),
  PositionRender: () => new IGE.Debug.PositionRenderComponent(renderSystem),
  Click: () => new IGE.Components.ClickComponent(inputSystem)
}

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
  collisionSystem.addSurface([-game.width, game.height * 0.5 - 50, game.width, game.height * 0.5 - 50]);
  // collisionSystem.addSurface([-game.width * 0.5, game.height * 0.25, -game.width * 0.25, game.height * 0.5]);
  // collisionSystem.addSurface([game.width * 0.25, game.height * 0.5, game.width * 0.5, game.height * 0.25]);

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
  ball.bounds2 = [-ry, -rx, ry, rx];
  const r = Math.random() * 255;
  const g = Math.random() * 255;
  const b = Math.random() * 255;
  const r1 = Math.random() * 255;
  const g1 = Math.random() * 255;
  const b1 = Math.random() * 255;
  ball.color = `rgba(${r|0},${g|0},${b|0},1)`;
  ball.color2 = `rgba(${r1|0},${g1|0},${b1|0},0.5)`;

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
