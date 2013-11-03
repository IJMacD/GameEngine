$(function() {
	var GameObject = GE.GameObject,
		GameComponent = GE.GameComponent,
		GEC = GE.Comp,

		canvas = $('#surface'),
		context = canvas[0].getContext("experimental-webgl"),
		gl = context,
		canvasWidth = canvas.width(),
		canvasHeight = canvas.height(),
		gameRoot = new GE.GameObjectManager(),
		cameraSystem,
		renderSystem,
		redBall,
		sun,
		lastTime = 0;

	function initCanvas(width,height){
		// canvas.removeAttr("width");
		// canvas.removeAttr("height");
		// canvasWidth = width||canvas.width();
		// canvasHeight = height||canvas.height();
		canvas[0].width = canvasWidth;
		canvas[0].height = canvasHeight;
		gl.viewportWidth = canvasWidth;
		gl.viewportHeight = canvasHeight,
		cameraSystem && cameraSystem.setScreenSize(canvasWidth, canvasHeight);
		renderSystem && renderSystem.setCanvasSize(canvasWidth, canvasHeight);
	}

    function getShader(gl, id) {
        var shaderScript = document.getElementById(id);
        if (!shaderScript) {
            return null;
        }

        var str = "";
        var k = shaderScript.firstChild;
        while (k) {
            if (k.nodeType == 3) {
                str += k.textContent;
            }
            k = k.nextSibling;
        }

        var shader;
        if (shaderScript.type == "x-shader/x-fragment") {
            shader = gl.createShader(gl.FRAGMENT_SHADER);
        } else if (shaderScript.type == "x-shader/x-vertex") {
            shader = gl.createShader(gl.VERTEX_SHADER);
        } else {
            return null;
        }

        gl.shaderSource(shader, str);
        gl.compileShader(shader);

        if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
            alert(gl.getShaderInfoLog(shader));
            return null;
        }

        return shader;
    }

    var shaderProgram;

    function initShaders() {
        var fragmentShader = getShader(gl, "shader-fs");
        var vertexShader = getShader(gl, "shader-vs");

        shaderProgram = gl.createProgram();
        gl.attachShader(shaderProgram, vertexShader);
        gl.attachShader(shaderProgram, fragmentShader);
        gl.linkProgram(shaderProgram);

        if (!gl.getProgramParameter(shaderProgram, gl.LINK_STATUS)) {
            alert("Could not initialise shaders");
        }

        gl.useProgram(shaderProgram);

        shaderProgram.vertexPositionAttribute = gl.getAttribLocation(shaderProgram, "aVertexPosition");
        gl.enableVertexAttribArray(shaderProgram.vertexPositionAttribute);

        shaderProgram.pMatrixUniform = gl.getUniformLocation(shaderProgram, "uPMatrix");
        shaderProgram.mvMatrixUniform = gl.getUniformLocation(shaderProgram, "uMVMatrix");
    }

    var mvMatrix = mat4.create();
    var pMatrix = mat4.create();

    function setMatrixUniforms() {
        gl.uniformMatrix4fv(shaderProgram.pMatrixUniform, false, pMatrix);
        gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
    }


	initCanvas();
	
    initShaders();

    gl.clearColor(1.0, 1.0, 1.0, 1.0);
    gl.enable(gl.DEPTH_TEST);

	$('#fullscr-btn').on("click", function(){
		canvas[0].webkitRequestFullscreen();
		canvasWidth = window.innerWidth;
		canvasHeight = window.innerHeight;
		initCanvas();
	});

	$(window).on("resize", function(){
		canvasWidth = canvas.width();
		canvasHeight = canvas.height();
		initCanvas();
	});

	GE.DEBUG = true;

	function RedTriangleRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
		this.buffer = gl.createBuffer();
		gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        var vertices = [
             0.0,  1.0,  0.0,
            -1.0, -1.0,  0.0,
             1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.buffer.itemSize = 3;
        this.buffer.numItems = 3;
	}
	RedTriangleRenderingComponent.prototype = new GameComponent();
	RedTriangleRenderingComponent.prototype.update = function(parent, delta) {
		var buff = this.buffer;
		this.renderSystem.push(function(gl,mvMatrix){
	        mat4.translate(mvMatrix, mvMatrix, [parent.position.x, parent.position.y, -7.0]);
	        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, buff.itemSize, gl.FLOAT, false, 0, 0);
	        setMatrixUniforms();
	        gl.drawArrays(gl.TRIANGLES, 0, buff.numItems);
		});
	};
	function RedBoxRenderingComponent(renderSystem){
		this.renderSystem = renderSystem;
        this.buffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, this.buffer);
        vertices = [
             1.0,  1.0,  0.0,
            -1.0,  1.0,  0.0,
             1.0, -1.0,  0.0,
            -1.0, -1.0,  0.0
        ];
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        this.buffer.itemSize = 3;
        this.buffer.numItems = 4;
	}
	RedBoxRenderingComponent.prototype = new GameComponent();
	RedBoxRenderingComponent.prototype.update = function(parent, delta) {
		var buff = this.buffer;
		this.renderSystem.push(function(gl,mvMatrix){
	        mat4.translate(mvMatrix, mvMatrix, [parent.position.x, parent.position.y, -7.0]);
	        gl.bindBuffer(gl.ARRAY_BUFFER, buff);
	        gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, buff.itemSize, gl.FLOAT, false, 0, 0);
	        setMatrixUniforms();
	        gl.drawArrays(gl.TRIANGLE_STRIP, 0, buff.numItems);
		});
	};

	cameraSystem = new GE.CameraSystem(0, 0, canvasWidth, canvasHeight);
	renderSystem = new GE.WebGLRenderSystem(context, canvasWidth, canvasHeight, cameraSystem, mvMatrix, pMatrix);
	cameraSystem.setScale(0.5);

	// cameraSystem.addComponent(new GEC.RotationComponent(0.0003));


	sun = new GameObject();
	sun.mass = 5;
	sun.setPosition(0,0);
	//sun.addComponent({update:function(p){renderSystem.push(function(c){c.fillStyle="black";c.beginPath();c.arc(p.position.x,p.position.y,2,0,Math.PI*2);c.fill();})}});
	sun.addComponent(new RedBoxRenderingComponent(renderSystem));

	gameRoot.addObject(sun);

	for(var i = 0; i < 10; i++){
		redBall = new GameObject();
		redBall.setPosition(Math.random()*200-100,Math.random()*200-100);
		redBall.setVelocity(Math.random()*0.3-0.15,Math.random()*0.3-0.15);

		redBall.addComponent(new GEC.MoveComponent());
		redBall.addComponent(new GEC.PointGravityComponent(sun));
		redBall.addComponent(new GEC.RotationComponent(Math.random()*0.002 - 0.001));
		var r = Math.random();
		if(r < 0.5) {
			redBall.addComponent(new RedTriangleRenderingComponent(renderSystem));
		}
		else {
			redBall.addComponent(new RedBoxRenderingComponent(renderSystem));
		}

		gameRoot.addObject(redBall);
	}


	gameRoot.addObject(cameraSystem);
	gameRoot.addObject(renderSystem);


	function loop(time){
		requestAnimationFrame(loop);
		gameRoot.update(Math.min(time - lastTime,100));
		lastTime = time;
	}
	loop(0);

});
