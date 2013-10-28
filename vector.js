(function(window){
	function Vector(){
		this.values = n(arguments);
		this.length = this.values.length;
	}
	function n(args){
		if(typeof args[0] == "Array")
			return args[0];
		return Array.prototype.slice.call(args);
	}
	Vector.prototype = {

		toString: function(){
			return "["+this.values.join(",")+"]";
		},
		set: function() {
			var values = n(arguments);
			if(values.length == this.length) {
				this.values = values;
			}
			return this;

		},
		add: function() {
			var values = n(arguments);
			if(values.length == this.length) {
				for(var i = 0; i < this.length; i++)
					this.values[i] += values[i];
			}
			return this;
		},
		subtract: function() {
			var values = n(arguments);
			if(values.length == this.length) {
				for(var i = 0; i < this.length; i++)
					this.values[i] -= values[i];
			}
			return this;
		},
		scale: function(s) {
			for(var i = 0; i < this.length; i++)
				this.values[i] *= s;
			return this;
		},
		dot: function(vector) {
			if(!vector instanceof Vector)
				return;
			var values = vector.values,
				value = 0;
			if(values.length == this.length) {
				for(var i = 0; i < this.length; i++)
					value += this.values[i] * values[i];
			}
			return value;
		}
	};

	window.Vector = Vector;

})(window);
function Vector2 (x,y){
	if(arguments.length < 2){
		x = 0;
		y = 0;
	}
	this.x = x;
	this.y = y;
	this.length = 2;
};
Vector2.prototype = Object.create(Vector);

Vector2.prototype.toString = function(){
	return "["+this.x.toFixed()+","+this.y.toFixed()+"]";
};
Vector2.prototype.clone = function() {
	return new Vector2(this.x, this.y);
};
Vector2.prototype.set = function(x,y) {
	if(arguments.length == 0){
		x = 0;
		y = 0;
	}
	else if(arguments[0] instanceof Vector2){
		y = arguments[0].y;
		x = arguments[0].x;
	}
	this.x = x;
	this.y = y;
	return this;

};
Vector2.prototype.add = function(x,y) {
	if(x instanceof Vector2){
		this.x += x.x;
		this.y += x.y;
	}
	else {
		this.x += x;
		this.y += y;
	}
	return this;
};
Vector2.prototype.subtract = function(x,y) {
	if(x instanceof Vector2){
		this.x -= x.x;
		this.y -= x.y;
	}
	else {
		this.x -= x;
		this.y -= y;
	}
	return this;
};
Vector2.prototype.scale = function(s) {
	this.x *= s;
	this.y *= s;
	return this;
};
Vector2.prototype.leftMultiply = function(matrix){
	if(matrix instanceof Matrix &&
		matrix.rows == 2 &&
		matrix.cols == 2){
		var newX = matrix.values[0][0] * this.x + matrix.values[0][1] * this.y,
			newY = matrix.values[1][0] * this.x + matrix.values[1][1] * this.y;
		this.x = newX;
		this.y = newY;
	}
	return this;
}
Vector2.prototype.normalise = function(){
	var mag = Math.sqrt(this.x*this.x + this.y*this.y);
	if(mag != 0){
		this.x /= mag;
		this.y /= mag;
	}
	return this;
};
Vector2.prototype.magnitude = function(){
	return Math.sqrt(this.x*this.x + this.y*this.y);
};
Vector2.prototype.magnitude2 = function(){
	return this.x*this.x + this.y*this.y;
};
Vector2.prototype.angle = function(){
	return Math.atan2(this.x, this.y);
};
Vector2.prototype.cross = function(x,y) {
	if(x instanceof Vector2){
		y = x.y;
		x = x.x;
	}
	return this.x * y - this.y * x;
};
Vector2.prototype.dot = function(x,y) {
	if(x instanceof Vector2)
		return this.x * x.x + this.y * x.y;
	else
		return this.x * x + this.y * y;
};
Vector2.prototype.normal = function() {
	return (new Vector2(this.y, -this.x)).normalise();
};
Vector2.angleBetween = function(v1, v2) {
	return Math.atan2(v2.x - v1.x, v2.y - v1.y);
};
function Vector3 (x,y,z) {
	this.x = x;
	this.y = y;
	this.z = z;
	this.length = 3;
}
Vector3.prototype = Object.create(Vector);
Vector3.prototype.toString = function(){
	return "["+this.x+","+this.y+","+this.z+"]";
};
Vector3.prototype.cross = function(x,y,z) {
	if(x instanceof Vector3){
		var y = x.y,
			z = x.z,
			x = x.x;
	}
	return new Vector3(
		this.y * z - this.z * y,
		this.z * x - this.x * z,
		this.x * y - this.y * x);
};
Vector3.prototype.dot = function(x,y,z) {
	if(x instanceof Vector3){
		var y = x.y,
			z = x.z,
			x = x.x;
	}
	return this.x * x + this.y * y + this.z * z;
};
function Matrix (values){
	if(values.length > 1){
		var length = values[0].length,
			i = 1,
			l = values.length;
		for(;i<l;i++){
			if(values[i].length != length)
				break;
		}
		if(i != l)
			return;
		this.rows = l;
		this.cols = length;
	}
	else if(values instanceof Matrix){
		this.rows = values.rows;
		this.cols = values.cols;
		this.values = [];
		for(i = 0, l = values.values.length; i < l; i++){
			this.values.push(values.values[i].slice());
		}
		return;
	}
	else{
		this.rows = 1;
		this.cols = values[0].length;
	}
	this.values = values;
}
Matrix.prototype = {
	toString: function() {
		var strs = [];
		for(var i = 0; i < this.rows; i++)
			strs[i] = "["+this.values[i].join(",")+"]";
		return strs.join("\n");
	},
	add: function(matrix) {
		if(matrix instanceof Matrix &&
			this.rows == matrix.rows &&
			this.cols == matrix.cols){
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.cols; j++){
					this.values[i][j] += matrix[i][j];
				}
			}
		}
		return this;
	},
	subtract: function(matrix) {
		if(matrix instanceof Matrix &&
			this.rows == matrix.rows &&
			this.cols == matrix.cols){
			for(var i = 0; i < this.rows; i++){
				for(var j = 0; j < this.cols; j++){
					this.values[i][j] -= matrix[i][j];
				}
			}
		}
		return this;
	},
	scale: function(factor) {
		for(var i = 0; i < this.rows; i++){
			for(var j = 0; j < this.cols; j++){
				this.values[i][j] *= factor;
			}
		}
		return this;
	},
	det: function() {
		if(this.rows == 2 &&
			this.cols == 2){
			return this.values[0][0]*this.values[1][1] - this.values[0][1]*this.values[1][0];
		}
	},
	inverse: function(){
		if(this.rows == 2 &&
			this.cols == 2 &&
			this.det() != 0){
			var v = this.values;
			return (new Matrix([[v[1][1],-v[0][1]],[-v[1][0],v[0][0]]])).scale(1/this.det());
		}
	},
	multiply: function(matrix) {
		var values = [];
		if(matrix instanceof Matrix &&
			this.rows == matrix.cols &&
			this.cols == matrix.rows){
			for(var i = 0; i < this.rows; i++){
				values[i] = [];
				for(var j = 0; j < matrix.cols; j++){
					var value = 0;
					for(var k = 0; k < this.cols; k++)
						value += this.values[i][k] * matrix.values[k][j];
					values[i][j] = value;
				}
			}
		}
		return new Matrix(values);
	},
	multiplyBy: function(matrix) {
		var values = [];
		if(matrix instanceof Matrix &&
			this.rows == matrix.cols &&
			this.cols == matrix.rows){
			for(var i = 0; i < this.rows; i++){
				values[i] = [];
				for(var j = 0; j < matrix.cols; j++){
					var value = 0;
					for(var k = 0; k < this.cols; k++)
						value += this.values[i][k] * matrix.values[k][j];
					values[i][j] = value;
				}
			}
		}
		this.values = values;
	}
};
Matrix.rotationMatrix = function(theta){
	return new Matrix([
		[Math.cos(theta),-Math.sin(theta)],
		[Math.sin(theta), Math.cos(theta)]
	]);
};
Matrix.scaleMatrix = function(sx,sy){
	if(arguments.length == 1)
		sy = sx;
	return new Matrix([
		[sx,0],
		[0, sy]
	]);
};
Matrix.shearMatrix = function(thetax,thetay){
	if(arguments.length == 1)
		thetay = 0;
	return new Matrix([
		[1, Math.tan(thetax)],
		[Math.tan(thetay), 1]
	]);
};
