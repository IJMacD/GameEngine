import GameComponent from '../core/GameComponent.ts';

/**
 * Component to draw surfaces from a BackgroundCollisionSystem. Will also draw surface normals.
 * @class DebugDrawSurfacesComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where to draw to.
 * @param {string} colour - Colour of surfaces
 */
export default class DebugDrawSurfacesComponent extends GameComponent {
    constructor (renderSystem, colour){
        super();
		this.renderSystem = renderSystem;
		this.colour = colour || "#000";
	}

    update (parent, delta) {
        var s = parent.surfaces,
            j = 0,
            m = s.length,
            i, c, l;
        for(; j<m; j++){
            this.renderSystem.strokePath(s[j], parent.colour || this.colour);
        }

        // Draw Normals
        if(GE.DEBUG){
            for(j=0; j<m; j++){
                c = parent.surfaces[j];
                l = c.length;
                for(i=0;i<l-3;i+=2){
                    var x1 = c[i],
                        y1 = c[i+1],
                        x2 = c[i+2],
                        y2 = c[i+3],
                        dx = x2 - x1,
                        dy = y2 - y1,
                        mx = x1 + dx * 0.5,
                        my = y1 + dy * 0.5,
                        nx = dy / Math.sqrt(dy * dy + dx * dx),
                        ny = -dx / Math.sqrt(dy * dy + dx * dx);
                    this.renderSystem.strokePath([mx,my,mx+nx*30,my+ny*30],'#08f');
                }
            }
        }
    }
}
