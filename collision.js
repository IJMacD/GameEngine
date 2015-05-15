var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GameObjectManager = GE.GameObjectManager,
		GEC = GE.Comp;

	function BackgroundSystem(renderSystem, coords) {
		this.renderSystem = renderSystem;
		this.surfaces = [];
		if(coords)
			this.surfaces.push(coords);
	}
	GE.BackgroundSystem = BackgroundSystem;
	BackgroundSystem.prototype = new GE.GameObject();
	BackgroundSystem.prototype.addSurface = function(surface) {
		this.surfaces.push(surface);
	};
	BackgroundSystem.prototype.addSurfaces = function(surfaces) {
		for(var i = 0; i < surfaces.length; i++){
			this.surfaces.push(surfaces[i]);
		}
	};
	BackgroundSystem.prototype.update = function(delta) {
		var s = this.surfaces,
			j = 0,
			m = s.length,
			i, c, l;
		for(; j<m; j++){
			this.renderSystem.strokePath(s[j],"#000");
		}

		// Draw Normals
		if(GE.DEBUG){
			for(j=0; j<m; j++){
				c = this.surfaces[j];
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
	};

	var u = vec2.create(),
			n = vec2.create(),
			w = vec2.create(),
			p = vec2.create(),
			r = vec2.create(),
			q = vec2.create(),
			s = vec2.create(),
			q_p = vec2.create(),
			v = vec2.create();

	function BackgroundCollisionComponent(backgroundSystem, collisionBounds) {
		this.backgroundSystem = backgroundSystem;
		this.bounds = collisionBounds;
	}
	GEC.BackgroundCollisionComponent = BackgroundCollisionComponent;
	BackgroundCollisionComponent.prototype = new GE.GameComponent();
	BackgroundCollisionComponent.prototype.update = function(parent, delta)
	{
		// This logic should probably be moved to BackgroundCollisionSystem
		var surfaces = this.backgroundSystem.surfaces,
			j = 0,
			m = surfaces.length,
			c, l,
			i,
			p_t,
			p_u,
			//theta,
			f = 0.95,
			e = 0.2,
			parentX = parent.position[0],
			parentY = parent.position[1];
		if(this.lastX &&
				Math.abs(this.lastX - parentX) < 100 &&
				Math.abs(this.lastY - parentY) < 100){
			for(;j<m;j++){
				c = surfaces[j],
				l = c.length;
				for(i=0; i<l-3;i+=2)
				{
					// http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
					vec2.set(p, c[i  ], c[i+1]);
					vec2.set(r, c[i+2], c[i+3]);
					vec2.subtract(r, r, p);
					vec2.set(q, this.lastX, this.lastY);
					vec2.subtract(s, parent.position, q);
					//theta = s.angle();
					//s.add(0,this.bounds*Math.cos(theta));
					vec2.subtract(q_p, q, p);
					p_t = cross(q_p, s) / cross(r, s);
					p_u = cross(q_p, r) / cross(r, s);
					if(p_t >= 0 && p_t <= 1 && p_u >= 0 && p_u <= 1)
					{
						parent.position[0] = this.lastX;
						parent.position[1] = this.lastY;
						// http://stackoverflow.com/questions/573084/how-to-calculate-bounce-angle
						vec2.set(n, -r[1], r[0]); // this is the normal to the surface
						vec2.normalize(n, n);
						vec2.copy(v, parent.velocity);
						vec2.scale(u, n, vec2.dot(n, v));
						vec2.subtract(w, v, u);
						vec2.scale(w, w, f);
						vec2.scale(u, u, e);
						vec2.subtract(parent.velocity, w, u);
						break;
					}
				}
			}
		}
		this.lastX = parent.position[0];
		this.lastY = parent.position[1];
	}

	function cross(a, b){
		return a[0]*b[1] - a[1]*b[0];
	}

	return GE;
}(GE || {}));
