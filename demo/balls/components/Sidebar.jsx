import React, { Component } from 'react';

export default class Sidebar extends Component {
  handleBallChange (event) {
    this.props.modifyState({ballCount: parseInt(event.target.value)||0});
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
  handleBoundsChange (e) {
    this.props.modifyState({boundsDuration: e.target.value});
  }
  handleImpulse () {
    this.props.modifyState({impulseTime: Date.now()});
  }
  flipComponent (name) {
    const components = this.props.components;
    const selected = this.props.selectedComponents;
    const isSelected = selected.includes(name);
    this.props.modifyState({
      components: isSelected ? components.filter(x => x != name) : [...components, name],
      selectedComponents: isSelected ? selected.filter(x => x != name) : [...selected, name],
    });
  }
  swapComponents (index1, index2) {
    const selected = this.props.selectedComponents.slice();
    const count = selected.length;
    if (index1 >= 0 && index2 >= 0 && index1 < count && index2 < count) {
      const swap = selected[index1];
      selected[index1] = selected[index2];
      selected[index2] = swap;
    }
    // Rebuild enabled component list to reflect new ordering
    const components = selected.filter(n => this.props.components.includes(n));
    this.props.modifyState({selectedComponents: selected, components});
  }
  enableComponent (name) {
    const components = this.props.components;
    const isEnabled = components.includes(name);
    this.props.modifyState({
      components: isEnabled ? components.filter(x => x != name) : [...components, name]
    });
  }

  render () {
    const available = this.props.availableComponents;
    const selected = this.props.selectedComponents;
    const enabled = this.props.components;
    const unselected = arraySubtract(available, selected);

    return (
      <div style={{overflowY: "auto", padding: 20}}>
        <h1>Settings</h1>
        <h2>Balls</h2>
        <p><label>
          Count: <input value={this.props.ballCount} onChange={e => this.handleBallChange(e)} size={6} /> { ' ' }
          <button onClick={() => this.increaseBalls()}>+</button> { ' ' }
          <button onClick={() => this.decreaseBalls()}>-</button>
        </label></p>
        <p><label>
          Gravity: { ' ' }
          <input
            type="text"
            value={this.props.gravityConstant}
            onChange={e => this.handleGravityChange(e)}
            size={6}
            disabled={!selected.includes("Gravity")} />
        </label></p>
        <p>
          Physics: { ' ' }
          <input
            type="button"
            value="Impulse"
            onClick={e => this.handleImpulse()}
            disabled={!selected.includes("Physics")}
          />
        </p>
        <div>
          <p>Components:</p>
          <ComponentList
            components={selected}
            enabledComponents={enabled}
            areSelected={true}
            componentClick={n => this.flipComponent(n)}
            componentUp={i => this.swapComponents(i, i-1)}
            componentDown={i => this.swapComponents(i, i+1)}
            componentEnable={n => this.enableComponent(n)}
          />
          <ComponentList
            components={unselected}
            areSelected={false}
            componentClick={n => this.flipComponent(n)}
          />
        </div>
        <h2>World</h2>
        <p><label>
          <input type="checkbox" checked={this.props.debug} onChange={e => this.handleChange(e, "debug")} />
          Debug Bounds
        </label></p>
        <p><label>
          <input type="checkbox" checked={this.props.bounds} onChange={e => this.handleChange(e, "bounds")} />
          Animate Bounds { ' ' }
          <input type="text" value={this.props.boundsDuration} onChange={e => this.handleBoundsChange(e)} size={6} />
        </label></p>
      </div>
    );
  }
}

function arraySubtract (minuend, subtrahend) {
  return minuend.filter(x => !subtrahend.includes(x));
}

function ComponentList (props) {
  const {
    components,
    enabledComponents = [],
    areSelected,
    componentClick,
    componentUp,
    componentDown,
    componentEnable,
  } = props;
  const listStyle = {
    listStyle: 'none',
    paddingLeft: 10,
    paddingRight: 10,
    fontSize: '10pt',
  };
  const count = components.length;

  return (
    <ul style={listStyle}>
      {
        components.map((name, i) => {
          const style = {
            color: areSelected ? '' : '#999',
            cursor: 'pointer',
          };

          return (
            <li
              key={name}
              style={style}
              onClick={() => componentClick(name)}
            >
              { areSelected &&
                <input
                  type="checkbox"
                  checked={enabledComponents.includes(name)}
                  onChange={() => { componentEnable(name)}}
                  onClick={e => { e.stopPropagation(); }}
                />
              }
              { name }
              <div style={{float: "right", display: areSelected ? "" : "none"}}>
                <span
                  style={{visibility: i==0 ? 'hidden' : ''}}
                  onClick={e => { e.stopPropagation(); componentUp(i)}}
                >Up</span>
                { ' ' }
                <span
                  style={{visibility: i==(count-1) ? 'hidden' : ''}}
                  onClick={e => { e.stopPropagation(); componentDown(i)}}
                >Down</span>
              </div>
            </li>
          );
        })
      }
    </ul>
  );
}
