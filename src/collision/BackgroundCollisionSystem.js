import GameObject from '../core/GameObject';

/**
 * System to maintain list of polylines for collision detection.
 * @extends {GameObject}
 * @memberof Collision
 */
class BackgroundCollisionSystem extends GameObject {
    constructor () {
		super();
		this.surfaces = [];
        this.temporarySurfaces = [];
	}

    /**
     * Add permanent surface. Surfaces are all polylines.
     *
     * <p>Surface is an array containing pairs of values representing (x,y) co-ordinates.
     * <p>Therefore the minimum size of the array is 4: <code>[x1, y1, x2, y2]</code>;
     * @example
     * backgroundCollisionSystem.addSurface([x0, y0, x1, y1, ..., xn, yn]);
     * @param {array} surface - Array defining surface.
     */
	addSurface (surface) {
		this.surfaces.push(surface);
	}

    /**
     * Add multiple permanent surfaces at once.
     * @param {array} surfaces - Array of arrays defining surfaces.
     */
	addSurfaces (surfaces) {
		for(var i = 0; i < surfaces.length; i++){
			this.surfaces.push(surfaces[i]);
		}
	}

    /**
     * Remove all permanent surfaces.
     */
	clearSurfaces (){
		this.surfaces.length = 0;
	}

    /**
     * Add a temporary (single frame) surface
     * @param {array} surface - Array defining surface
     */
    addTemporarySurface (surface) {
        this.temporarySurfaces.push(surface);
    }

    update (delta) {
        super.update(delta);

        this.temporarySurfaces.length = 0;
    }
}

export default BackgroundCollisionSystem;
