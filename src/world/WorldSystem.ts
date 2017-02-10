import GameObject from '../core/GameObject';

/** @namespace World */

/**
 * Generic way to access a 'world' with intrinsic bounds.
 * @extends {GameObject}
 * @param {array} bounds - Array containing co-ordinates specifying the world <code>[minX, minY, maxX, maxY, minZ, maxZ]</code>
 * @memberof World
 */
export default class WorldSystem extends GameObject {
    constructor (bounds) {
        super();
        this.bounds = bounds;
    }
}
