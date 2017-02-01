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

// Export basic behavioural components
import * as basic from './behaviour/basic';
for(let name in basic) {
  Components[name] = basic[name];
}

import GravityComponent from './behaviour/GravityComponent';
Components['GravityComponent'] = GravityComponent;

// Export world namespace
import * as world from './world';
export { world as World };

import WorldBounceComponent from './world/WorldBounceComponent';
Components['WorldBounceComponent'] = WorldBounceComponent;

import WorldWrapComponent from './world/WorldWrapComponent';
Components['WorldWrapComponent'] = WorldWrapComponent;

// Export input namespace
import * as input from './input';
export { input as Input };

import ClickComponent from './input/ClickComponent';
Components['ClickComponent'] = ClickComponent;

// Export collision namespace
import * as collision from './collision';
export { collision as Collision };

import CollisionComponent from './collision/CollisionComponent';
Components['CollisionComponent'] = CollisionComponent;

import BounceComponent from './collision/BounceComponent';
Components['BounceComponent'] = BounceComponent;

import SolidComponent from './collision/SolidComponent';
Components['SolidComponent'] = SolidComponent;

import DotRenderComponent from './render/DotRenderComponent';
Components['DotRenderComponent'] = DotRenderComponent;
