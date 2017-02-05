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

// Export basic components
import * as basic from './basic';
for(let name in basic) {
  Components[name] = basic[name];
}

import * as easing from './Easing';
export { easing as Easing };

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

import BackgroundCollisionComponent from './collision/BackgroundCollisionComponent';
Components['BackgroundCollisionComponent'] = BackgroundCollisionComponent;

import SolidComponent from './collision/SolidComponent';
Components['SolidComponent'] = SolidComponent;

// Export render namespace
import * as render from './render';
export { render as Render };

export { default as WebGLRenderSystem } from './render/WebGLRenderSystem';

import DotRenderComponent from './render/DotRenderComponent';
Components['DotRenderComponent'] = DotRenderComponent;

import RectangleRenderComponent from './render/RectangleRenderComponent';
Components['RectangleRenderComponent'] = RectangleRenderComponent;

import TextRenderComponent from './render/TextRenderComponent';
Components['TextRenderComponent'] = TextRenderComponent;

// Export debug
import * as debug from './debug';
export { debug as Debug };
