import GameComponent from '../core/GameComponent';

/**
 * Submit surfaces to BackgroundCollisionSystem. These are added relative to parent object.
 * This is useful if the parent object is moving like a platform for example.
 * @class SolidComponent
 * @extends GameComponent
 * @param {BackgroundCollisionSystem} backgroundSystem - Where can I add my surfaces.
 * @param {array} lineSegments - Line segments to add
 */
export default class SolidComponent extends GameComponent {
    constructor (backgroundSystem, lineSegments) {
        super();

        this.backgroundSystem = backgroundSystem;
        this.segments = lineSegments;
    }

    update (parent, delta) {
        var lines = [],
            i = 0,
            l = this.segments.length,
            j, m,
            seg, line;
        for(;i<l;i++){
            seg = this.segments[i];
            m = seg.length-1;
            line = []
            for(j=0;j<m;j+=2){
                line.push(seg[j]+parent.position.x, seg[j+1]+parent.position.y);
            }
            lines.push(line);
        }
        this.backgroundSystem.addTemporarySurfaces(lines);
    }
}