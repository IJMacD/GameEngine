import GameObject from '../core/GameObject';

/** @namespace World */

export default WorldSystem;

/**
 * Generic way to access a 'world' with intrinsic bounds.
 * @extends {GameObject}
 * @param {array} bounds - Array containing co-ordinates specifying the world <code>[minX, minY, maxX, maxY, minZ, maxZ]</code>
 * @memberof World
 */
class WorldSystem extends GameObject {
    constructor (bounds) {
        super();
        this.bounds = bounds;
    }

    /**
     * Set the bounds of this world.
     * @param {array} bounds - Array containing co-ordinates specifying the world <code>[minX, minY, maxX, maxY, minZ, maxZ]</code>
     */
    setBounds (bounds) {
        this.bounds = bounds;
    }
}
