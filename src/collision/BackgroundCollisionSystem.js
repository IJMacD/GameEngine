import GameObject from '../core/GameObject';

/**
 * System to maintain list of polylines ffor collision detection
 * @class BackgroundCollisionSystem
 * @extends GameObject
 */
export default class BackgroundCollisionSystem extends GameObject {
    constructor () {
		super();
		this.surfaces = [];
        this.temporarySurfaces = [];
	}

    /**
     * Add permanent surface.
     * @param {array} surface - Array defining surface.
     */
	addSurface (surface) {
		this.surfaces.push(surface);
	}

    /**
     * Add permanent surfaces.
     * @param {array} surfaces - Array of arrays defining surfaces.
     */
	addSurfaces (surfaces) {
		for(var i = 0; i < surfaces.length; i++){
			this.surfaces.push(surfaces[i]);
		}
	}

    /**
     * Remove permanent surfaces.
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
