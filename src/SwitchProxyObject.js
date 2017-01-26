import { SwitchComponent } from './behaviour/basic';

/**
 * A higher-order class. Wraps (by sub-classing) a GameObject to provide
 * automatic switching components.
 * 
 * @example <code>
 *     const SwitchGameObject = applySwitchingEnhancer(GameObject); 
 *     const myObject = new SwitchGameObject();
 *     myObject.addComponent(new MoveComponent());
 *     const switchObject = myObject.getSwitchObject();
 *     switchObject = {
 *         "MoveComponent": true
 *     }
 * </code>
 */
export default function applySwitchingEnhancer (type){
  return class extends type {
    constructor () {
      super();

      this.switchObject = {};
    }

    addComponent (component) {
      const name = component.constructor.name;

      this.switchObject[name] = true;

      const switchComponent = new SwitchComponent(this.switchObject, name);

      switchComponent.addComponent(component);

      super.addComponent(switchComponent);
    }

    getSwitchObject () {
      return this.switchObject;
    }

    setSwitchObject (switchObject) {
      this.switchObject = switchObject;
    }
  }
}