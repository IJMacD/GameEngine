import GameObject from '../core/GameObject';

/**
 * Generic way to access a 'world' with intrinsic bounds.
 * @param {array} bounds - Array containing co-ordinates specifying the world <code>[minX, minY, maxX, maxY, minZ, maxZ]</code>
 */
export default class WorldSystem extends GameObject {
    constructor (bounds) {
        super();
        this.bounds = bounds;
    }
}
