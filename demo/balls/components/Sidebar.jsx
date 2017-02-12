import React, { Component } from 'react';

export default class Sidebar extends Component {
  handleBallChange (event) {
    this.props.modifyState({ballCount: parseInt(event.target.value)});
  }
  increaseBalls () {
    this.props.modifyState({ballCount: this.props.ballCount + 1});
  }
  decreaseBalls () {
    this.props.modifyState({ballCount: this.props.ballCount - 1});
  }
  handleChange (e, prop) {
    this.props.modifyState({[prop]: e.target.checked});
  }

  render () {
    return (
      <div>
        <h1>Settings</h1>
        <p><label>
          Balls: <input value={this.props.ballCount} onChange={e => this.handleBallChange(e)} /> { ' ' }
          <button onClick={() => this.increaseBalls()}>+</button> { ' ' }
          <button onClick={() => this.decreaseBalls()}>-</button>
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.debug} onChange={e => this.handleChange(e, "debug")} />
          Debug
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.gravity} onChange={e => this.handleChange(e, "gravity")} />
          Gravity
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.wrap} onChange={e => this.handleChange(e, "wrap")} />
          Wrap
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.background} onChange={e => this.handleChange(e, "background")} />
          Background Collision
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.square} onChange={e => this.handleChange(e, "square")} />
          Square Render
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.rotation} onChange={e => this.handleChange(e, "rotation")} />
          Rotation:
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.bounds} onChange={e => this.handleChange(e, "bounds")} />
          Animate Bounds
        </label></p>
      </div>
    );
  }
}
