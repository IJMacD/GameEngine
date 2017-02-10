import GameComponent from '../core/GameComponent.ts';

/**
 * Submit temporary surfaces to BackgroundCollisionSystem every frame.
 * These are added relative to parent object. This is useful if the parent
 * object is a moving platform for example.
 * @extends {GameComponent}
 * @param {BackgroundCollisionSystem} backgroundSystem - Where can I add my surfaces.
 * @param {array} lineSegments - Line segments to add. These are polylines e.g. <code>[x1, y1, x2, y2, ..., xn, yn]</code>
 * @memberof Collision
 */
class SolidComponent extends GameComponent {
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

export default SolidComponent;
