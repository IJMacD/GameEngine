// Export core classes. GameObject, GameComponent etc.
export { default as GameObject } from './core/GameObject';
export { default as GameObjectManager } from './core/GameObjectManager';
export { default as GameComponent } from './core/GameComponent';

// Export key systems. CameraSystem, CanvasRenderSystem etc.
export { default as CameraSystem } from './CameraSystem';
export { default as CanvasRenderSystem } from './render/CanvasRenderSystem';
export { default as WorldSystem } from './world/WorldSystem';
export { default as InputSystem } from './input/InputSystem';
export { default as AudioSystem } from './AudioSystem';

// Export support classes. e.g. Game
export { default as Game } from './core/Game';

export const Components = {};

import * as basic from './behaviour/basic';
for(let name in basic) {
  Components[name] = basic[name];
}

import GravityComponent from './behaviour/GravityComponent';
Components['GravityComponent'] = GravityComponent;

import WorldBounceComponent from './world/WorldBounceComponent';
Components['WorldBounceComponent'] = WorldBounceComponent;

import WorldWrapComponent from './world/WorldWrapComponent';
Components['WorldWrapComponent'] = WorldWrapComponent;
