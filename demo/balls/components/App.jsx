import React, { Component } from 'react';

import Game from './Game';
import Sidebar from './Sidebar';

export default class App extends Component {
  constructor () {
    super();

    this.state = {
      ballCount: 10,
      gravity: false,
      gravityConstant: 0.0003,
      falling: false,
      debug: false,
      wrap: false,
      background: false,
      square: false,
      rotation: false,
      bounds: true,
      components: [
        // "Gravity",
        "TerminalVelocity",
        "Move",
        "WorldWrap",
        // "WorldBounce",
        // "BackgroundCollision",
        // "Rotation",
        "ColorAnimation",
        // "BoundsAnimation",
        // "RectangleRender",
        "DotRender",
        // "DebugDrawBounds",
        // "PositionRender",
        "Click",
      ],
    };
  }

  render () {
    const appStyle = {
      display: "grid",
      gridTemplateColumns: "75% 25%",
      height: "100%",
    };

    return (
      <div style={appStyle}>
        <Game {...this.state} />
        <Sidebar {...this.state} modifyState={change => this.setState(change)} />
      </div>
    );
  }
}
