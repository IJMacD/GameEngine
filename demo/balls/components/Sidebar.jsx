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
  handleGravityChange (e) {
    this.props.modifyState({gravityConstant: e.target.value});
  }
  flipComponent (name) {
    const components = this.props.components;
    const isSelected = components.includes(name);
    this.props.modifyState({
      components: isSelected ? components.filter(x => x != name) : [...components, name]
    });
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
          <input type="checkbox" checked={this.props.bounds} onChange={e => this.handleChange(e, "bounds")} />
          World Bounds Animation
        </label></p>
        <p><label>
          Gravity { ' ' }
          <input type="text" value={this.props.gravityConstant} onChange={e => this.handleGravityChange(e)} />
        </label></p>
        <div>
          <p>Ball Components:</p>
          <ul>
            {
              this.props.availableComponents.map((name, i) => {
                const selected = this.props.components.includes(name);
                const style = {
                  color: selected ? '' : 'lightgray',
                  textDecoration: selected ? '' : 'line-through',
                  cursor: 'pointer',
                };

                return <li key={i} style={style} onClick={() => this.flipComponent(name)}>{ name }</li>
              })
            }
          </ul>
        </div>
      </div>
    );
  }
}
