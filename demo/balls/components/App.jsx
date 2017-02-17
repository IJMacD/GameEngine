import React, { Component } from 'react';

import Game from './Game';
import Sidebar from './Sidebar';

export default class App extends Component {
  constructor () {
    super();

    this.state = {
      ballCount: 10,
      gravityConstant: 0.0003,
      debug: false,
      bounds: true,
      boundsDuration: 5000,
      availableComponents: [
        "Gravity",
        "TerminalVelocity",
        "Move",
        "WorldWrap",
        "WorldBounce",
        "BackgroundCollision",
        "Rotation",
        "ColorAnimation",
        "BoundsAnimation",
        "RectangleRender",
        "DotRender",
        "DebugDrawBounds",
        "DebugPosition",
        "DebugVelocity",
        "Click",
      ],
      components: [
        "TerminalVelocity",
        "Move",
        "WorldBounce",
        "DotRender",
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
