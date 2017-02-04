import GameObject from '../core/GameObject';
import GameComponent from '../core/GameComponent';

var addComponent = GameObject.prototype.addComponent;

/**
  * Component which conditionally activates child components.
  * @extends {GameComponent}
  */
export default class SwitchComponent extends GameComponent {
  constructor (switchObject, switchProperty) {
    super();
    this.positiveComponents = [];
    this.negativeComponents = [];

    /**
      * The switch for whether the positive components are active or the negative ones. Default: true
      * @type {boolean}
      */
    this.active = true;

    this.object = switchObject;
    this.prop = switchProperty;
  }

  /**
    * Add a positive component. Synonomous with {@link SwitchComponent#addPositiveComponent}
    * @param {GameComponent} component - The component to add.
    */
  addComponent (component){
    this.components = this.positiveComponents;
    addComponent.call(this, component);
    this.components  = undefined;
  }

  /**
    * Add a positive component
    * @param {GameComponent} component - The component to add.
    */
  addPositiveComponent (component){
    this.components = this.positiveComponents;
    addComponent.call(this, component);
    this.components  = undefined;
  }

  /**
    * Add a negative component
    * @param {GameComponent} component - The component to add.
    */
  addNegativeComponent (component){
    this.components = this.negativeComponents;
    addComponent.call(this, component);
    this.components  = undefined;
  }

  /**
    * Add an array of positive components and negativeComponents
    * @param {GameComponent[]} positiveComponents - The components to add to the positive side.
    * @param {GameComponent[]} negativeComponents - The components to add to the negative side.
    */
  addComponents (positiveComponents, negativeComponents){
    positiveComponents.forEach(this.addPositiveComponent.bind(this));
    negativeComponents.forEach(this.addNegativeComponent.bind(this));
  }

  /**
    * Swap the active state from positive to negative or vice-versa.
    */
  flip () {
    this.setActive(!this.active);
  }

  /**
    * Explicitly set the active state.
    * @param {boolean} active - True means positive components will become active.
    */
  setActive (active) {
    this.active = active;

    if(this.object){
      this.object[this.prop] = this.active;
    }
  }

  update (parent, delta) {
    var i = 0,
        l;

    if(this.object){
      this.active = this.object[this.prop];
    }

    if(this.active){
      l = this.positiveComponents.length;
      for(;i<l;i++){
        this.positiveComponents[i].update(parent, delta);
      }
    } else {
      l = this.negativeComponents.length;
      for(;i<l;i++){
        this.negativeComponents[i].update(parent, delta);
      }
    }
  }
}
