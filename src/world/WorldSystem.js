import GameObject from '../core/GameObject';

/**
 * Generic way to access a 'world' with intrinsic bounds.
 * @class WorldSystem
 * @extends {GameObject}
 * @param {array} bounds - Array containing co-ordinates specifying the world [minX, minY, maxX, maxY, minZ, maxZ]
 */
export default class WorldSystem extends GameObject {
    constructor (bounds) {
        super();
        this.bounds = bounds;
    }

    /**
     * Set the bounds of this world.
     * @param {array} bounds - Array containing co-ordinates specifying the world [minX, minY, maxX, maxY, minZ, maxZ]
     */
    setBounds (bounds) {
        this.bounds = bounds;
    }
}
