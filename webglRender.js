var GE = (function(GE){

	GE.Comp = GE.Comp || {};

	var GameComponent = GE.GameComponent,
		GameObjectManager = GE.GameObjectManager,
		GEC = GE.Comp;

	function WebGLRenderSystem(context, canvasWidth, canvasHeight, cameraSystem, mvMatrix, pMatrix){
		this.context = context;
		this.canvasWidth = canvasWidth;
		this.canvasHeight = canvasHeight;
		this.cameraSystem = cameraSystem;
		this.mvMatrix = mvMatrix;
		this.pMatrix = pMatrix;
		this.renderQueue = [];
	}
	GE.WebGLRenderSystem = WebGLRenderSystem;
	WebGLRenderSystem.prototype = new GE.GameObject();
	WebGLRenderSystem.prototype.push = function(renderable){
		this.renderQueue.push(renderable);
	};
	WebGLRenderSystem.prototype.update = function(delta) {
		var gl = this.context;
        gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

        mat4.perspective(this.pMatrix, 173*Math.PI/180, gl.viewportWidth / gl.viewportHeight, 0.1, 100.0);

		for(var i = 0, l = this.renderQueue.length; i < l; i++){

        	mat4.identity(this.mvMatrix);

			this.renderQueue[i].call(this, this.context, this.mvMatrix);
		}

		this.renderQueue = [];
	};
	WebGLRenderSystem.prototype.setCanvasSize = function(width, height){
		this.canvasWidth = width;
		this.canvasHeight = height;
	}

	function RenderSystemManager(){}
	GE.RenderSystemManager = RenderSystemManager;
	RenderSystemManager.prototype = new GameObjectManager();
	RenderSystemManager.prototype.push = function(renderable){
		for (var i = this.objects.length - 1; i >= 0; i--) {
			this.objects[i].push(renderable);
		};
	}

	return GE;
}(GE || {}));
