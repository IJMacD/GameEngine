(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define([], factory);
	else if(typeof exports === 'object')
		exports["IGE"] = factory();
	else
		root["IGE"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.l = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };

/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};

/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};

/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 65);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A GameComponent adds a particular behaviour to a GameObject. This class
 * should be subclassed to implement desired behaviour. The `update` method
 * is called once per frame for each GameObject it has been attached to. This
 * is where most of the work will be done.
 * @extends {GameObject}
 * @abstract
 */
var GameComponent = function (_GameObject) {
	_inherits(GameComponent, _GameObject);

	function GameComponent() {
		_classCallCheck(this, GameComponent);

		return _possibleConstructorReturn(this, (GameComponent.__proto__ || Object.getPrototypeOf(GameComponent)).apply(this, arguments));
	}

	_createClass(GameComponent, [{
		key: 'init',


		/**
   * This method is called once when the component is first added to each parent.
   * Use this to perform set-up and add any necessary properties to parent objects.
   * @abstract
   * @param {GameObject} parent - A reference to the {@link GameObject} on which
   * this component is operating. This allows multiple GameObjects to share
   * stateless components.
   */
		value: function init(parent) {}

		/**
   * This method is called once per frame for each GameObject this component
   * has been attached to.
   * @abstract
   * @param {GameObject} parent - A reference to the {@link GameObject} on which
   * this component is operating. This allows multiple GameObjects to share
   * stateless components.
   * @param {number} delta - Time since last frame in milliseconds
   */

	}, {
		key: 'update',
		value: function update(parent, delta) {}

		/**
   * This method is used to produce a html representation of the component for
   * things such as debugging trees. Similar to toString method.
   * @return {string} Representation of this component in HTML
   */

	}, {
		key: 'toHTML',
		value: function toHTML() {
			return this.name;
		}
	}]);

	return GameComponent;
}(_GameObject3.default);

/**
 * This static helper method reduces the boiler plate of subclassing
 * GameComponent.
 * @static
 * @deprecated Use ES6 classes instead
 * @param {function} constructor - The constructor of the subclass. This should
 * be a named function expression or a reference to a function statement so that
 * magic can happen using the function's name for component identification.
 * @param {object} properties - A plain javascript object containing methods
 * and properties to be attached to the new prototype.
 * @return {GameComponent} The new 'class' which has been created.
 */


GameComponent.create = function (constructor, properties) {
	constructor.prototype = new GameComponent();
	for (var prop in properties) {
		constructor.prototype[prop] = properties[prop];
	}
	var name = constructor.name;
	if (!name) {
		name = constructor.toString().match(/^function ([a-z_]+)/i)[1];
		constructor.name = name;
	}
	return constructor;
};

exports.default = GameComponent;

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(4);

/**
 * @class 3 Dimensional Vector
 * @name vec3
 */
var vec3 = {};

/**
 * Creates a new, empty vec3
 *
 * @returns {vec3} a new 3D vector
 */
vec3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = 0;
    out[1] = 0;
    out[2] = 0;
    return out;
};

/**
 * Creates a new vec3 initialized with values from an existing vector
 *
 * @param {vec3} a vector to clone
 * @returns {vec3} a new 3D vector
 */
vec3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Creates a new vec3 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} a new 3D vector
 */
vec3.fromValues = function(x, y, z) {
    var out = new glMatrix.ARRAY_TYPE(3);
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Copy the values from one vec3 to another
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the source vector
 * @returns {vec3} out
 */
vec3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    return out;
};

/**
 * Set the components of a vec3 to the given values
 *
 * @param {vec3} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @param {Number} z Z component
 * @returns {vec3} out
 */
vec3.set = function(out, x, y, z) {
    out[0] = x;
    out[1] = y;
    out[2] = z;
    return out;
};

/**
 * Adds two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    return out;
};

/**
 * Alias for {@link vec3.subtract}
 * @function
 */
vec3.sub = vec3.subtract;

/**
 * Multiplies two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    out[2] = a[2] * b[2];
    return out;
};

/**
 * Alias for {@link vec3.multiply}
 * @function
 */
vec3.mul = vec3.multiply;

/**
 * Divides two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    out[2] = a[2] / b[2];
    return out;
};

/**
 * Alias for {@link vec3.divide}
 * @function
 */
vec3.div = vec3.divide;

/**
 * Math.ceil the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to ceil
 * @returns {vec3} out
 */
vec3.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    out[2] = Math.ceil(a[2]);
    return out;
};

/**
 * Math.floor the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to floor
 * @returns {vec3} out
 */
vec3.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    out[2] = Math.floor(a[2]);
    return out;
};

/**
 * Returns the minimum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    out[2] = Math.min(a[2], b[2]);
    return out;
};

/**
 * Returns the maximum of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    out[2] = Math.max(a[2], b[2]);
    return out;
};

/**
 * Math.round the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to round
 * @returns {vec3} out
 */
vec3.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    out[2] = Math.round(a[2]);
    return out;
};

/**
 * Scales a vec3 by a scalar number
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec3} out
 */
vec3.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    return out;
};

/**
 * Adds two vec3's after scaling the second operand by a scalar value
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec3} out
 */
vec3.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} distance between a and b
 */
vec3.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.distance}
 * @function
 */
vec3.dist = vec3.distance;

/**
 * Calculates the squared euclidian distance between two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec3.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1],
        z = b[2] - a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredDistance}
 * @function
 */
vec3.sqrDist = vec3.squaredDistance;

/**
 * Calculates the length of a vec3
 *
 * @param {vec3} a vector to calculate length of
 * @returns {Number} length of a
 */
vec3.length = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return Math.sqrt(x*x + y*y + z*z);
};

/**
 * Alias for {@link vec3.length}
 * @function
 */
vec3.len = vec3.length;

/**
 * Calculates the squared length of a vec3
 *
 * @param {vec3} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec3.squaredLength = function (a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    return x*x + y*y + z*z;
};

/**
 * Alias for {@link vec3.squaredLength}
 * @function
 */
vec3.sqrLen = vec3.squaredLength;

/**
 * Negates the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to negate
 * @returns {vec3} out
 */
vec3.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    out[2] = -a[2];
    return out;
};

/**
 * Returns the inverse of the components of a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to invert
 * @returns {vec3} out
 */
vec3.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  out[2] = 1.0 / a[2];
  return out;
};

/**
 * Normalize a vec3
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a vector to normalize
 * @returns {vec3} out
 */
vec3.normalize = function(out, a) {
    var x = a[0],
        y = a[1],
        z = a[2];
    var len = x*x + y*y + z*z;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
        out[2] = a[2] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec3's
 *
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {Number} dot product of a and b
 */
vec3.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
};

/**
 * Computes the cross product of two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @returns {vec3} out
 */
vec3.cross = function(out, a, b) {
    var ax = a[0], ay = a[1], az = a[2],
        bx = b[0], by = b[1], bz = b[2];

    out[0] = ay * bz - az * by;
    out[1] = az * bx - ax * bz;
    out[2] = ax * by - ay * bx;
    return out;
};

/**
 * Performs a linear interpolation between two vec3's
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1],
        az = a[2];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    out[2] = az + t * (b[2] - az);
    return out;
};

/**
 * Performs a hermite interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.hermite = function (out, a, b, c, d, t) {
  var factorTimes2 = t * t,
      factor1 = factorTimes2 * (2 * t - 3) + 1,
      factor2 = factorTimes2 * (t - 2) + t,
      factor3 = factorTimes2 * (t - 1),
      factor4 = factorTimes2 * (3 - 2 * t);
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Performs a bezier interpolation with two control points
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the first operand
 * @param {vec3} b the second operand
 * @param {vec3} c the third operand
 * @param {vec3} d the fourth operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec3} out
 */
vec3.bezier = function (out, a, b, c, d, t) {
  var inverseFactor = 1 - t,
      inverseFactorTimesTwo = inverseFactor * inverseFactor,
      factorTimes2 = t * t,
      factor1 = inverseFactorTimesTwo * inverseFactor,
      factor2 = 3 * t * inverseFactorTimesTwo,
      factor3 = 3 * factorTimes2 * inverseFactor,
      factor4 = factorTimes2 * t;
  
  out[0] = a[0] * factor1 + b[0] * factor2 + c[0] * factor3 + d[0] * factor4;
  out[1] = a[1] * factor1 + b[1] * factor2 + c[1] * factor3 + d[1] * factor4;
  out[2] = a[2] * factor1 + b[2] * factor2 + c[2] * factor3 + d[2] * factor4;
  
  return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec3} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec3} out
 */
vec3.random = function (out, scale) {
    scale = scale || 1.0;

    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    var z = (glMatrix.RANDOM() * 2.0) - 1.0;
    var zScale = Math.sqrt(1.0-z*z) * scale;

    out[0] = Math.cos(r) * zScale;
    out[1] = Math.sin(r) * zScale;
    out[2] = z * scale;
    return out;
};

/**
 * Transforms the vec3 with a mat4.
 * 4th vector component is implicitly '1'
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat4 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2],
        w = m[3] * x + m[7] * y + m[11] * z + m[15];
    w = w || 1.0;
    out[0] = (m[0] * x + m[4] * y + m[8] * z + m[12]) / w;
    out[1] = (m[1] * x + m[5] * y + m[9] * z + m[13]) / w;
    out[2] = (m[2] * x + m[6] * y + m[10] * z + m[14]) / w;
    return out;
};

/**
 * Transforms the vec3 with a mat3.
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {mat4} m the 3x3 matrix to transform with
 * @returns {vec3} out
 */
vec3.transformMat3 = function(out, a, m) {
    var x = a[0], y = a[1], z = a[2];
    out[0] = x * m[0] + y * m[3] + z * m[6];
    out[1] = x * m[1] + y * m[4] + z * m[7];
    out[2] = x * m[2] + y * m[5] + z * m[8];
    return out;
};

/**
 * Transforms the vec3 with a quat
 *
 * @param {vec3} out the receiving vector
 * @param {vec3} a the vector to transform
 * @param {quat} q quaternion to transform with
 * @returns {vec3} out
 */
vec3.transformQuat = function(out, a, q) {
    // benchmarks: http://jsperf.com/quaternion-transform-vec3-implementations

    var x = a[0], y = a[1], z = a[2],
        qx = q[0], qy = q[1], qz = q[2], qw = q[3],

        // calculate quat * vec
        ix = qw * x + qy * z - qz * y,
        iy = qw * y + qz * x - qx * z,
        iz = qw * z + qx * y - qy * x,
        iw = -qx * x - qy * y - qz * z;

    // calculate result * inverse quat
    out[0] = ix * qw + iw * -qx + iy * -qz - iz * -qy;
    out[1] = iy * qw + iw * -qy + iz * -qx - ix * -qz;
    out[2] = iz * qw + iw * -qz + ix * -qy - iy * -qx;
    return out;
};

/**
 * Rotate a 3D vector around the x-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateX = function(out, a, b, c){
   var p = [], r=[];
	  //Translate point to the origin
	  p[0] = a[0] - b[0];
	  p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];

	  //perform rotation
	  r[0] = p[0];
	  r[1] = p[1]*Math.cos(c) - p[2]*Math.sin(c);
	  r[2] = p[1]*Math.sin(c) + p[2]*Math.cos(c);

	  //translate to correct position
	  out[0] = r[0] + b[0];
	  out[1] = r[1] + b[1];
	  out[2] = r[2] + b[2];

  	return out;
};

/**
 * Rotate a 3D vector around the y-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateY = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[2]*Math.sin(c) + p[0]*Math.cos(c);
  	r[1] = p[1];
  	r[2] = p[2]*Math.cos(c) - p[0]*Math.sin(c);
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Rotate a 3D vector around the z-axis
 * @param {vec3} out The receiving vec3
 * @param {vec3} a The vec3 point to rotate
 * @param {vec3} b The origin of the rotation
 * @param {Number} c The angle of rotation
 * @returns {vec3} out
 */
vec3.rotateZ = function(out, a, b, c){
  	var p = [], r=[];
  	//Translate point to the origin
  	p[0] = a[0] - b[0];
  	p[1] = a[1] - b[1];
  	p[2] = a[2] - b[2];
  
  	//perform rotation
  	r[0] = p[0]*Math.cos(c) - p[1]*Math.sin(c);
  	r[1] = p[0]*Math.sin(c) + p[1]*Math.cos(c);
  	r[2] = p[2];
  
  	//translate to correct position
  	out[0] = r[0] + b[0];
  	out[1] = r[1] + b[1];
  	out[2] = r[2] + b[2];
  
  	return out;
};

/**
 * Perform some operation over an array of vec3s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec3. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec3s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec3.forEach = (function() {
    var vec = vec3.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 3;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1]; vec[2] = a[i+2];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1]; a[i+2] = vec[2];
        }
        
        return a;
    };
})();

/**
 * Get the angle between two 3D vectors
 * @param {vec3} a The first operand
 * @param {vec3} b The second operand
 * @returns {Number} The angle in radians
 */
vec3.angle = function(a, b) {
   
    var tempA = vec3.fromValues(a[0], a[1], a[2]);
    var tempB = vec3.fromValues(b[0], b[1], b[2]);
 
    vec3.normalize(tempA, tempA);
    vec3.normalize(tempB, tempB);
 
    var cosine = vec3.dot(tempA, tempB);

    if(cosine > 1.0){
        return 0;
    } else {
        return Math.acos(cosine);
    }     
};

/**
 * Returns a string representation of a vector
 *
 * @param {vec3} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec3.str = function (a) {
    return 'vec3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ')';
};

/**
 * Returns whether or not the vectors have exactly the same elements in the same position (when compared with ===)
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec3} a The first vector.
 * @param {vec3} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2];
    var b0 = b[0], b1 = b[1], b2 = b[2];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)));
};

module.exports = vec3;


/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

var _util = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/**
 * The base object in the GameEngine. Most objects managed by the system
 * will be based on this class.
 */
var GameObject = function () {
    function GameObject() {
        _classCallCheck(this, GameObject);

        /** Array of components which update this GameObject.
         * @type {array} */
        this.components = [];
        this.components.remove = arrayRemoveItem;

        /** Position of this object in the world.
         * @type {vec3} */
        this.position = _vec2.default.create();

        /** Velocity of this object moving through the world.
         * @type {vec3} */
        this.velocity = _vec2.default.create();

        /** Current rotation of this object.
         * @type {number} */
        this.rotation = 0;

        /** Rotation axis of this object.
         * @type {number} */
        this.rotationAxis = _vec2.default.fromValues(0, 0, 1);

        /**
          * List of components which will be removed on next update.
          * @private
          * @type {array}
          */
        this._toBeRemoved = [];
    }

    /**
     * <p>This method is used to add a {@link GameComponent} to this object.
     *
     * <p>GameComponents give objects particular behaviours. This method ensures
     * that each component added will have a chance to update once per frame
     * for this object.
     * @param {GameComponent} component - The component to be added to this object
     * @return {GameObject} Returns a reference to this for chainability
     */


    _createClass(GameObject, [{
        key: 'addComponent',
        value: function addComponent(component) {

            // Allow syntactic sugar of addComponent(function() {...}) which is a
            // shorthand for specifying a simple component with only an update method
            if (isFunction(component)) {
                component = { update: component };
            }

            this.components.push(component);

            // If the component has an init method call it when added so that the
            // component can add properties to the parent object
            if (component.init) {
                component.init(this);
            }

            return this;
        }

        /**
         * Remove a particular {@link GameComponent} which had previously been added
         * to this object.
         * @param {GameComponent} component - The component to be removed from this object
         * @return {GameObject} Returns a reference to this for chainability
         */

    }, {
        key: 'removeComponent',
        value: function removeComponent(component) {
            this._toBeRemoved.push(component);
            return this;
        }
    }, {
        key: 'removeComponentByName',
        value: function removeComponentByName(name) {
            for (var i = 0; i < this.components.length; i++) {
                var c = this.components[i];
                if (c.name == name || c.constructor.name == name) this._toBeRemoved.push(c);
            }
            return this;
        }
    }, {
        key: 'removeComponentByTest',
        value: function removeComponentByTest(test) {
            for (var i = 0; i < this.components.length; i++) {
                if (test(this.components[i])) this._toBeRemoved.push(this.components[i]);
            }
            return this;
        }

        /**
         * <p>Protective method to set position of the object in world-units.
         *
         * <p>The native units are world-units. i.e. If a 2D camera is
         * used with the scale set to 1x and the canvas is not scaled in the webpage,
         * 1 unit in the world will equate to 1 pixel on the screen.
         *
         * <p>This method will preserve position on axes which you leave undefined
         * in the call to this method.
         *
         * @example <caption>This will only affect the y co-ordinate, leaving x and
         * z at their original values.</caption>
         * // Set y = 20
         * gameObject.setPosition(undefined, 20);
         * @param {number} x - x component of position vector
         * @param {number} y - y component of position vector
         * @param {number} z - z component of position vector
         * @return {GameObject} Returns a reference to this for chainability
         */

    }, {
        key: 'setPosition',
        value: function setPosition(x, y, z) {
            if (x == undefined) {
                x = this.position[0];
            }
            if (y == undefined) {
                y = this.position[1];
            }
            if (z == undefined) {
                z = this.position[2];
            }
            _vec2.default.set(this.position, x, y, z);
            return this;
        }

        /**
         * <p>Protective method to set velocity of the object.
         *
         * <p>The native units are world-units per millisecond. i.e. If a 2D camera
         * is used with the scale set to 1x and the canvas is not scaled in the webpage,
         * 1 unit in the world will equate to 1 pixel on the screen. In this common
         * case the units of velocity will be equivelant to pixels-per-millisecond.
         *
         * <p>This method will preserve position on axes which you leave undefined
         * in the call to this method.
         *
         * @example <caption>This will only affect the velocity parallel to the y-axis
         * co-ordinate, leaving vx and vz unaffected.</caption>
         * // Set vy = 20px per second
         * gameObject.setVelocity(undefined, 0.02);
         * @param {number} x - x component of velocity vector
         * @param {number} y - y component of velocity vector
         * @param {number} z - z component of velocity vector
         * @return {GameObject} Returns a reference to this for chainability
         */

    }, {
        key: 'setVelocity',
        value: function setVelocity(vx, vy, vz) {
            if (vx == undefined) {
                vx = this.velocity[0];
            }
            if (vy == undefined) {
                vy = this.velocity[1];
            }
            if (vz == undefined) {
                vz = this.velocity[2];
            }
            _vec2.default.set(this.velocity, vx, vy, vz);
            return this;
        }

        /**
         * Set the bounds of the component relative to its position.
         * @param {number} minX
         * @param {number} minY
         * @param {number} maxX
         * @param {number} maxY
         * @param {number} minZ - Optional
         * @param {number} maxZ - Optional
         * @return this
         */

    }, {
        key: 'setBounds',
        value: function setBounds() {
            for (var _len = arguments.length, bounds = Array(_len), _key = 0; _key < _len; _key++) {
                bounds[_key] = arguments[_key];
            }

            this.bounds = bounds;
            return this;
        }

        /**
         * Set object rotation
         * @param {number} rotation - Rotation in radians
         * @param {vec3} rotationAxis - 3D rotations require rotation axis.
         * @return this
         */

    }, {
        key: 'setRotation',
        value: function setRotation(rotation, rotationAxis) {
            this.rotation = rotation;
            if (rotationAxis && rotationAxis.length == 3) {
                _vec2.default.normalize(this.rotationAxis, rotationAxis);
            }
            return this;
        }

        /**
         * @deprecated
         */

    }, {
        key: 'hit',
        value: function hit(victim) {
            if (this.hitVictim == null) this.hitVictim = victim;
        }

        /**
         * @deprecated
         */

    }, {
        key: 'hitBy',
        value: function hitBy(attacker) {
            if (this.attackerHit == null) this.attackerHit = attacker;
        }

        /**
         * This method is called once per frame. GameObjects will usually only need
         * to call update on each of its components in this method passing a reference
         * to itself.
         * @param {number} delta - Time since last frame in milliseconds
         */

    }, {
        key: 'update',
        value: function update(delta) {
            var i = 0,
                l = this.components.length,
                j = 0,
                m = this._toBeRemoved.length;
            for (; j < m; j++) {
                for (i = 0; i < l; i++) {
                    if (this.components[i] == this._toBeRemoved[j]) {
                        this.components.remove(i);
                        break;
                    }
                }
            }
            this._toBeRemoved.length = 0;

            l = this.components.length;
            for (i = 0; i < l; i++) {
                this.components[i].update(this, delta);
            }
        }

        /**
         * This method is used to produce a html representation of the object for
         * things such as debugging trees. It will include components in its rendering.
         * Similar to the toString method.
         * @return {string} Representation of this component in HTML
         */

    }, {
        key: 'toHTML',
        value: function toHTML() {
            var html = this.name,
                i;
            if (typeof this.position.x == "number") html += " " + this.position;
            if (this.components.length) {
                html += "<ul>";
                for (i = 0; i < this.components.length; i++) {
                    html += "<li>" + this.components[i].toHTML();
                }html += "</ul>";
            }
            return html;
        }
    }]);

    return GameObject;
}();

exports.default = GameObject;


(0, _util.eventMixin)(GameObject);

function arrayRemoveItem(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
}

function isFunction(a) {
    return a instanceof Function;
}

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _Easing = __webpack_require__(5);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Animate arbritarty properties
 * @param {number} loop - 0: no loop, 1: loop animation, 2: loop reverse
 */
var PropertyAnimationComponent = function (_GameComponent) {
  _inherits(PropertyAnimationComponent, _GameComponent);

  function PropertyAnimationComponent(outputter, start, end) {
    var duration = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 1000;
    var easing = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : _Easing.Linear;
    var loop = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : 2;

    _classCallCheck(this, PropertyAnimationComponent);

    var _this = _possibleConstructorReturn(this, (PropertyAnimationComponent.__proto__ || Object.getPrototypeOf(PropertyAnimationComponent)).call(this));

    if (!Array.isArray(start)) {
      start = [start];
    }
    if (!Array.isArray(end)) {
      end = [end];
    }
    start.length = 4;
    end.length = 4;

    _this.outputter = outputter;
    _this.start = start;
    _this.end = end;
    _this.duration = duration;
    _this.easing = easing;
    _this.loop = loop;

    _this.elapsed = 0;
    _this.direction = 1;
    _this.out = Array(4);
    return _this;
  }

  _createClass(PropertyAnimationComponent, [{
    key: 'reset',
    value: function reset() {
      this.elapsed = 0;
    }
  }, {
    key: 'start',
    value: function start() {
      this.direction = 1;
    }
  }, {
    key: 'pause',
    value: function pause() {
      this.direction = 0;
    }
  }, {
    key: 'stop',
    value: function stop() {
      this.pause();
      this.reset();
    }
  }, {
    key: 'update',
    value: function update(parent, delta) {
      var t = this.easing(this.elapsed / this.duration);
      var a0 = this.start[0];
      var a1 = this.start[1];
      var a2 = this.start[2];
      var a3 = this.start[3];

      this.out[0] = a0 + t * (this.end[0] - a0);
      this.out[1] = a1 + t * (this.end[1] - a1);
      this.out[2] = a2 + t * (this.end[2] - a2);
      this.out[3] = a3 + t * (this.end[3] - a3);

      this.outputter(parent, this.out);

      this.elapsed += delta * this.direction;

      if (this.elapsed > this.duration || this.elapsed < 0) {
        if (this.loop == 2) {
          this.direction *= -1;
        } else if (this.loop == 1) {
          this.elapsed = 0;
        }
        this.elapsed = Math.min(Math.max(this.elapsed, 0), this.duration);
      }
    }
  }]);

  return PropertyAnimationComponent;
}(_GameComponent3.default);

exports.default = PropertyAnimationComponent;

/***/ }),
/* 4 */
/***/ (function(module, exports) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

/**
 * @class Common utilities
 * @name glMatrix
 */
var glMatrix = {};

// Configuration Constants
glMatrix.EPSILON = 0.000001;
glMatrix.ARRAY_TYPE = (typeof Float32Array !== 'undefined') ? Float32Array : Array;
glMatrix.RANDOM = Math.random;
glMatrix.ENABLE_SIMD = false;

// Capability detection
glMatrix.SIMD_AVAILABLE = (glMatrix.ARRAY_TYPE === Float32Array) && ('SIMD' in this);
glMatrix.USE_SIMD = glMatrix.ENABLE_SIMD && glMatrix.SIMD_AVAILABLE;

/**
 * Sets the type of array used when creating new vectors and matrices
 *
 * @param {Type} type Array type, such as Float32Array or Array
 */
glMatrix.setMatrixArrayType = function(type) {
    glMatrix.ARRAY_TYPE = type;
}

var degree = Math.PI / 180;

/**
* Convert Degree To Radian
*
* @param {Number} Angle in Degrees
*/
glMatrix.toRadian = function(a){
     return a * degree;
}

/**
 * Tests whether or not the arguments have approximately the same value, within an absolute
 * or relative tolerance of glMatrix.EPSILON (an absolute tolerance is used for values less 
 * than or equal to 1.0, and a relative tolerance is used for larger values)
 * 
 * @param {Number} a The first number to test.
 * @param {Number} b The second number to test.
 * @returns {Boolean} True if the numbers are approximately equal, false otherwise.
 */
glMatrix.equals = function(a, b) {
	return Math.abs(a - b) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a), Math.abs(b));
}

module.exports = glMatrix;


/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.BackIn = BackIn;
exports.BackOut = BackOut;
exports.BackInOut = BackInOut;
exports.ElasticIn = ElasticIn;
exports.ElasticOut = ElasticOut;
exports.ElasticInOut = ElasticInOut;
exports.DampedOscillation = DampedOscillation;
var Linear = exports.Linear = function Linear(t) {
  return t;
};
var QuadIn = exports.QuadIn = function QuadIn(t) {
  return t * t;
};
var QuadOut = exports.QuadOut = function QuadOut(t) {
  return -t * (t - 2);
};
var CircIn = exports.CircIn = function CircIn(t) {
  return 1 - Math.sqrt(1 - t * t);
};
var CircOut = exports.CircOut = function CircOut(t) {
  return Math.sqrt(1 - (t - 1) * (t - 1));
};
var Smooth = exports.Smooth = function Smooth(t) {
  return t * t * (3 - 2 * t);
};
// Stolen from Dojo:
// https://github.com/dojo/dwb/blob/master/src/main/webapp/js/build/amd_loader/fx/easing.js
var SineIn = exports.SineIn = function SineIn(t) {
  return -1 * Math.cos(t * (Math.PI / 2)) + 1;
};
var SineOut = exports.SineOut = function SineOut(t) {
  return Math.sin(t * (Math.PI / 2));
};
var SineInOut = exports.SineInOut = function SineInOut(t) {
  return -1 * (Math.cos(Math.PI * t) - 1) / 2;
};
function BackIn(t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s);
};
function BackOut(t) {
  var s = 1.70158;
  t = t - 1;
  return t * t * ((s + 1) * t + s) + 1;
};
function BackInOut(t) {
  var s = 1.70158 * 1.525;
  t = t * 2;
  if (t < 1) {
    return Math.pow(t, 2) * ((s + 1) * t - s) / 2;
  }
  t -= 2;
  return (Math.pow(t, 2) * ((s + 1) * t + s) + 2) / 2;
};
function ElasticIn(n) {
  if (n == 0 || n == 1) {
    return n;
  }
  var p = .3;
  var s = p / 4;
  n = n - 1;
  return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
};
function ElasticOut(n) {
  if (n == 0 || n == 1) {
    return n;
  }
  var p = .3;
  var s = p / 4;
  return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
};
function ElasticInOut(n) {
  if (n == 0) return 0;
  n = n * 2;
  if (n == 2) return 1;
  var p = .3 * 1.5;
  var s = p / 4;
  if (n < 1) {
    n -= 1;
    return -.5 * (Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p));
  }
  n -= 1;
  return .5 * (Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p)) + 1;
};
function DampedOscillation(n) {
  var oscillations = 5;
  return 1 - Math.cos(n * 2 * Math.PI * oscillations) * (1 - QuadOut(n));
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

var _vec = __webpack_require__(10);

var _vec2 = _interopRequireDefault(_vec);

var _mat = __webpack_require__(63);

var _mat2 = _interopRequireDefault(_mat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Create some spare vectors for use in screenToWorld method
var v = _vec2.default.create();
var rotMat = _mat2.default.create();

/**
 * InputSystem's job is to keep track of most recent user input to provide
 * filtering and rate-limiting etc. Inputs should be passed on the the rest
 * of game in World co-ordinates rather than screen co-ordinates so the
 * InputSystem is responsible for mapping between the two.
 *
 * @todo Right now this is very 2D orientated. Try to make more generic
 * @extends {GameObject}
 * @param {Element} screen - Should be a DOMElement to get size information from
 * @param {any} keyboard - Something to watch for keyboard events on e.g. document
 * @param {CameraSystem} cameraSystem - A camera to be used for mapping co-ordinates
 */

var InputSystem = function (_GameObject) {
  _inherits(InputSystem, _GameObject);

  function InputSystem(screen, keyboard, cameraSystem) {
    _classCallCheck(this, InputSystem);

    var _this = _possibleConstructorReturn(this, (InputSystem.__proto__ || Object.getPrototypeOf(InputSystem)).call(this));

    _this.screen = screen;
    _this.keyboard = keyboard;
    _this.camera = cameraSystem;
    /** @deprecated */
    _this.cameraSystem = cameraSystem;

    _this._nextClick = _vec2.default.create();

    // These values will persist for exactly one frame

    /**
     * If {@link InputSystem#hasClick} is true, this property contains the world co-ordinates of the click.
     * @type {vec2}
     */
    _this.lastClick = _vec2.default.create();
    /**
     * Boolean to indicate if a click has been registered during the last frame.
     * @type {boolean}
     */
    _this.hasClick = false;

    _this._nextKey = null;

    /**
     * The most recent key press if one occured during the previous frame.
     * @type {boolean}
     */
    _this.lastKey = null;

    initScreen.call(_this);
    initKeyboard.call(_this);
    return _this;
  }

  _createClass(InputSystem, [{
    key: 'update',
    value: function update(delta) {
      _get(InputSystem.prototype.__proto__ || Object.getPrototypeOf(InputSystem.prototype), 'update', this).call(this, delta);

      // Cycle the next event to last event property here so that
      // last event persists for exactly one frame.

      // Click
      _vec2.default.copy(this.lastClick, this._nextClick);
      _vec2.default.set(this._nextClick, NaN, NaN);
      this.hasClick = !isNaN(this.lastClick[0]);

      // Keypress
      this.lastKey = this._nextKey;
      // Consumers should interpret (null) as no keypress
      this._nextKey = null;
    }

    /**
     * Set a new screen object and initialse event listening on it.
     * @param {Element} screen - New screen
     */

  }, {
    key: 'setScreen',
    value: function setScreen(screen) {
      this.screen = screen;

      initScreen.call(this);
    }

    /**
     * Convert screen co-ordinates to world co-ordinates.
     * @param {number} screenX - X co-ordinate on screen.
     * @param {number} screenY - Y co-ordinate on screen.
     * @return {vec2} - Vector containing co-ordinates in the world taking into account camera position, rotation etc.
     */

  }, {
    key: 'screenToWorld',
    value: function screenToWorld(screenX, screenY) {
      var cam = this.camera,
          camWidth = cam.width,
          camHeight = cam.height,
          screen = this.screen,
          screenWidth = screen.offsetWidth,
          screenHeight = screen.offsetHeight,
          screenScale = camWidth / screenWidth;

      _vec2.default.set(v, screenX - screenWidth / 2, screenY - screenHeight / 2);

      _vec2.default.scale(v, v, screenScale);

      _vec2.default.set(v, v[0] / cam.scaleX, v[1] / cam.scaleY);

      // Rotation in 2D only makes sense around the Z-axis so that is
      // all that is handled here.
      if (cam.rotationAxis[2] == 1) {
        _mat2.default.rotate(rotMat, rotMat, -cam.rotation);
        _vec2.default.transformMat2(v, v, rotMat);
      }

      _vec2.default.add(v, v, cam.position);
      return v;
    }
  }]);

  return InputSystem;
}(_GameObject3.default);

exports.default = InputSystem;

/**
 * Private method to initialse touch events on screen.
 *
 * Should be invoked as initScreen.call(this);
 * @private
 */

function initScreen() {
  var _this2 = this;

  if (!this.screen) return;

  TouchClick(this.screen, function (e) {
    var offsetLeft = _this2.screen.offsetLeft,
        offsetTop = _this2.screen.offsetTop,
        touch = e.touches && e.touches[0],
        x = (touch ? touch.pageX : e.pageX) - offsetLeft,
        y = (touch ? touch.pageY : e.pageY) - offsetTop;

    _vec2.default.copy(_this2._nextClick, _this2.screenToWorld(x, y));
  });
}

/**
 * Initialse keyboard events
 *
 * Should be invoked as initKeyboard.call(this);
 * @private
 */
function initKeyboard() {
  var _this3 = this;

  if (!this.keyboard) return;

  this.keyboard.addEventListener("keydown", function (e) {
    _this3._nextKey = e.which;
  });
}

/**
 * @callback TouchClickCallback
 * @param {object} event - Generic event object which will be relevant to event type.
 */

/**
 * Helper function to handle both touches and clicks consistently
 * @private
 * @param {Element} sel - Element on which we should look for input
 * @param {TouchClickCallback} fnc - Callback which will be called with event object only once per touch/click
 */
function TouchClick(sel, fnc) {
  var handle = function handle(event) {
    event.stopPropagation();
    event.preventDefault();
    if (event.handled !== true) {
      fnc(event);
      event.handled = true;
    } else {
      return false;
    }
  };

  // Remove previous handler in case this is element being re-initialised
  sel.removeEventListener('touchstart', sel.touchClick);
  sel.removeEventListener('click', sel.touchClick);

  // Add new handler
  sel.addEventListener('touchstart', handle);
  sel.addEventListener('click', handle);

  // We need to keep track of this handler in order to be able to remove it later.
  sel.touchClick = handle;
}

// function worldToScreen(inputSystem, worldX, worldY){
//   // TODO: Check whether or not this code is outdated
//   var cam = inputSystem.cameraSystem,
//       screen = inputSystem.screen,
//       v = cam.worldVec.set(worldX, worldY);
//   v.subtract(cam.position);
//   v.leftMultiply(cam.shearMatrix);
//   v.leftMultiply(cam.scaleMatrix);
//   v.leftMultiply(cam.rotMat);
//   v.add(screen.offsetWidth / 2, screen.offsetHeight / 2);
//   return v;
// };

/**
 * Reference object to convert keys to keycodes
 * @static
 * @type {object}
 */
InputSystem.Keys = {
  "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
  a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77,
  n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90
};

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

var _GameComponent = __webpack_require__(0);

var _GameComponent2 = _interopRequireDefault(_GameComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * <p>The default renderer for 2D canvas renderings. Jobs submitted each frame
 * will get rendered to the canvas.
 * <p>It supports render layers as well.
 * @extends {GameObject}
 * @param {CanvasRenderingContext2D} context - A 2d context from the target canvas. Call <code>canvas.getContext('2d')</code>
 * @param {CameraSystem} cameraSystem - Viewport from which to render from. All drawing calls will be made realtive to the camera position.
 */
var CanvasRenderSystem = function (_GameObject) {
	_inherits(CanvasRenderSystem, _GameObject);

	function CanvasRenderSystem(context, cameraSystem) {
		_classCallCheck(this, CanvasRenderSystem);

		var _this = _possibleConstructorReturn(this, (CanvasRenderSystem.__proto__ || Object.getPrototypeOf(CanvasRenderSystem)).call(this));

		_this.context = context;
		_this.canvas = context && context.canvas;
		_this.camera = cameraSystem;

		/** @deprecated */
		_this.cameraSystem = cameraSystem;

		_this.renderQueue = [];

		/**
   * Should the renderer clear the screen before drawing a frame or just overdraw.
   * @type {boolean}
   */
		_this.clearScreen = true;
		return _this;
	}

	/**
  * @callback CanvasRenderable
  * @param {CanvasRenderingContext2D} context
  */

	/**
  * Add a renderable to the draw queue
  * @param {CanvasRenderable} renderable - Function which will receive drawing context
  * @param {number} layer - Layer to add this drawable to. Default: 1
  */


	_createClass(CanvasRenderSystem, [{
		key: 'push',
		value: function push(renderable, layer) {
			layer = layer == undefined ? 1 : layer;
			if (!this.renderQueue[layer]) {
				this.renderQueue[layer] = [];
			}
			this.renderQueue[layer].push(renderable);
		}
	}, {
		key: 'update',
		value: function update(delta) {
			if (this.clearScreen) {
				this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
			}

			this.context.save();

			var p = this.camera.position,
			    q = this.canvas.width / 2,
			    r = this.canvas.height / 2,
			    i,
			    l,
			    j,
			    n;

			this.context.translate(q, r);
			// this.context.transform(this.camera.skewX,1,1,this.camera.skewY,0,0);
			this.context.scale(this.camera.scaleX, this.camera.scaleY);

			// Only rotation around the Z-axis makes sense for canvas rendering
			if (this.camera.rotationAxis[2] == 1) {
				this.context.rotate(-this.camera.rotation);
			}

			this.context.translate(-p[0], -p[1]);

			for (i = 0, l = this.renderQueue.length; i < l; i++) {
				_renderQueue(this, i);
			}

			this.context.restore();

			// Special case layer renders on top independant of camera
			_renderQueue(this, -1);
		}
	}, {
		key: 'drawPath',
		value: function drawPath(context, path) {
			var i = 2,
			    l = path.length;
			context.beginPath();
			context.moveTo(path[0], path[1]);
			for (; i < l - 1; i += 2) {
				context.lineTo(path[i], path[i + 1]);
			}
		}

		/**
   * Convenience method to stroke a path with the given style and to the given layer.
   * @param {array} path - Array of path co-ordinates [x0, y0, x1, y1, ..., xn, yn]
   * @param {string} style - Colour of line to draw. Default: #000
   * @param {number} layer - Layer this should be drawn on. Default: 1
   */

	}, {
		key: 'strokePath',
		value: function strokePath(path, style, layer) {
			if (typeof style == "undefined") style = '#000';
			if (typeof layer == "undefined") layer = 1;
			this.push(function (context) {
				context.strokeStyle = style;
				this.drawPath(context, path);
				context.stroke();
			}, layer);
		}
	}]);

	return CanvasRenderSystem;
}(_GameObject3.default);

exports.default = CanvasRenderSystem;


function _renderQueue(renderSystem, layer) {
	var context = renderSystem.context,
	    renderQueue = renderSystem.renderQueue;

	var queue = renderQueue[layer];
	if (queue) {
		for (var j = 0, n = queue.length; j < n; j++) {
			context.save();
			queue[j].call(renderSystem, context);
			context.restore();
		}
		queue.length = 0;
	}
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @namespace World */

/**
 * Generic way to access a 'world' with intrinsic bounds.
 * @extends {GameObject}
 * @param {array} bounds - Array containing co-ordinates specifying the world <code>[minX, minY, maxX, maxY, minZ, maxZ]</code>
 * @memberof World
 */
var WorldSystem = function (_GameObject) {
    _inherits(WorldSystem, _GameObject);

    function WorldSystem(bounds) {
        _classCallCheck(this, WorldSystem);

        var _this = _possibleConstructorReturn(this, (WorldSystem.__proto__ || Object.getPrototypeOf(WorldSystem)).call(this));

        _this.bounds = bounds;
        return _this;
    }

    return WorldSystem;
}(_GameObject3.default);

exports.default = WorldSystem;

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.simplifyPaths = simplifyPaths;
exports.parseColor = parseColor;
exports.eventMixin = eventMixin;
/**
 * This function simplifies paths which are really just path segments
 * by joining up adjacent segments.
 * @param {array} paths - Array of arrays of numbers
 * @return {array} Array of arrays of numbers
 */
function simplifyPaths(paths) {
  var out = [],
      current,
      x,
      y;
  paths.forEach(function (path) {
    if (path.length == 4) {
      if (path[0] == x && path[1] == y) {
        x = path[2];
        y = path[3];
        current.push(x, y);
      } else {
        if (current) {
          out.push(current);
        }

        current = path.slice(0);
        x = path[2];
        y = path[3];
      }
    }
  });
  if (current) {
    out.push(current);
  }
  return out;
}

var hexColor = /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i;
var hexColorShort = /#([0-9a-f])([0-9a-f])([0-9a-f])/i;
var rgbRegex = /rgba?\((1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]),(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]),(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:,(0(?:.\d+)|1(?:.0)?))?\)/;

function parseColor(str) {

  var match = str.match(hexColor) || str.match(hexColorShort);
  if (match) {
    var out = [parseInt(match[1], 16), parseInt(match[2], 16), parseInt(match[3], 16), 1];
    out.format = "hex";
    return out;
  }

  match = str.match(rgbRegex);
  if (match) {
    var _out = [parseInt(match[1], 10), parseInt(match[2], 10), parseInt(match[3], 10), match[4] ? parseFloat(match[4]) : 1];
    _out.format = "rgb";
    return _out;
  }
}

function eventMixin(constructor) {

  function on(event, callback) {
    if (!this._events) this._events = {};

    if (!this._events[event]) {
      this._events[event] = [];
    }
    this._events[event].push(callback);
    return this;
  }

  function fire(event) {
    var _this = this;

    for (var _len = arguments.length, params = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
      params[_key - 1] = arguments[_key];
    }

    if (!this._events) this._events = {};

    var callbacks = this._events[event];

    if (callbacks && callbacks.length) {
      callbacks.forEach(function (callback) {
        callback.apply(_this, params);
      });
    }
  }

  constructor.prototype.on = on;
  constructor.prototype.fire = fire;
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(4);

/**
 * @class 2 Dimensional Vector
 * @name vec2
 */
var vec2 = {};

/**
 * Creates a new, empty vec2
 *
 * @returns {vec2} a new 2D vector
 */
vec2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = 0;
    out[1] = 0;
    return out;
};

/**
 * Creates a new vec2 initialized with values from an existing vector
 *
 * @param {vec2} a vector to clone
 * @returns {vec2} a new 2D vector
 */
vec2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Creates a new vec2 initialized with the given values
 *
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} a new 2D vector
 */
vec2.fromValues = function(x, y) {
    var out = new glMatrix.ARRAY_TYPE(2);
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Copy the values from one vec2 to another
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the source vector
 * @returns {vec2} out
 */
vec2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    return out;
};

/**
 * Set the components of a vec2 to the given values
 *
 * @param {vec2} out the receiving vector
 * @param {Number} x X component
 * @param {Number} y Y component
 * @returns {vec2} out
 */
vec2.set = function(out, x, y) {
    out[0] = x;
    out[1] = y;
    return out;
};

/**
 * Adds two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    return out;
};

/**
 * Subtracts vector b from vector a
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    return out;
};

/**
 * Alias for {@link vec2.subtract}
 * @function
 */
vec2.sub = vec2.subtract;

/**
 * Multiplies two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.multiply = function(out, a, b) {
    out[0] = a[0] * b[0];
    out[1] = a[1] * b[1];
    return out;
};

/**
 * Alias for {@link vec2.multiply}
 * @function
 */
vec2.mul = vec2.multiply;

/**
 * Divides two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.divide = function(out, a, b) {
    out[0] = a[0] / b[0];
    out[1] = a[1] / b[1];
    return out;
};

/**
 * Alias for {@link vec2.divide}
 * @function
 */
vec2.div = vec2.divide;

/**
 * Math.ceil the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to ceil
 * @returns {vec2} out
 */
vec2.ceil = function (out, a) {
    out[0] = Math.ceil(a[0]);
    out[1] = Math.ceil(a[1]);
    return out;
};

/**
 * Math.floor the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to floor
 * @returns {vec2} out
 */
vec2.floor = function (out, a) {
    out[0] = Math.floor(a[0]);
    out[1] = Math.floor(a[1]);
    return out;
};

/**
 * Returns the minimum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.min = function(out, a, b) {
    out[0] = Math.min(a[0], b[0]);
    out[1] = Math.min(a[1], b[1]);
    return out;
};

/**
 * Returns the maximum of two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec2} out
 */
vec2.max = function(out, a, b) {
    out[0] = Math.max(a[0], b[0]);
    out[1] = Math.max(a[1], b[1]);
    return out;
};

/**
 * Math.round the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to round
 * @returns {vec2} out
 */
vec2.round = function (out, a) {
    out[0] = Math.round(a[0]);
    out[1] = Math.round(a[1]);
    return out;
};

/**
 * Scales a vec2 by a scalar number
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to scale
 * @param {Number} b amount to scale the vector by
 * @returns {vec2} out
 */
vec2.scale = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    return out;
};

/**
 * Adds two vec2's after scaling the second operand by a scalar value
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} scale the amount to scale b by before adding
 * @returns {vec2} out
 */
vec2.scaleAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    return out;
};

/**
 * Calculates the euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} distance between a and b
 */
vec2.distance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.distance}
 * @function
 */
vec2.dist = vec2.distance;

/**
 * Calculates the squared euclidian distance between two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} squared distance between a and b
 */
vec2.squaredDistance = function(a, b) {
    var x = b[0] - a[0],
        y = b[1] - a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredDistance}
 * @function
 */
vec2.sqrDist = vec2.squaredDistance;

/**
 * Calculates the length of a vec2
 *
 * @param {vec2} a vector to calculate length of
 * @returns {Number} length of a
 */
vec2.length = function (a) {
    var x = a[0],
        y = a[1];
    return Math.sqrt(x*x + y*y);
};

/**
 * Alias for {@link vec2.length}
 * @function
 */
vec2.len = vec2.length;

/**
 * Calculates the squared length of a vec2
 *
 * @param {vec2} a vector to calculate squared length of
 * @returns {Number} squared length of a
 */
vec2.squaredLength = function (a) {
    var x = a[0],
        y = a[1];
    return x*x + y*y;
};

/**
 * Alias for {@link vec2.squaredLength}
 * @function
 */
vec2.sqrLen = vec2.squaredLength;

/**
 * Negates the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to negate
 * @returns {vec2} out
 */
vec2.negate = function(out, a) {
    out[0] = -a[0];
    out[1] = -a[1];
    return out;
};

/**
 * Returns the inverse of the components of a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to invert
 * @returns {vec2} out
 */
vec2.inverse = function(out, a) {
  out[0] = 1.0 / a[0];
  out[1] = 1.0 / a[1];
  return out;
};

/**
 * Normalize a vec2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a vector to normalize
 * @returns {vec2} out
 */
vec2.normalize = function(out, a) {
    var x = a[0],
        y = a[1];
    var len = x*x + y*y;
    if (len > 0) {
        //TODO: evaluate use of glm_invsqrt here?
        len = 1 / Math.sqrt(len);
        out[0] = a[0] * len;
        out[1] = a[1] * len;
    }
    return out;
};

/**
 * Calculates the dot product of two vec2's
 *
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {Number} dot product of a and b
 */
vec2.dot = function (a, b) {
    return a[0] * b[0] + a[1] * b[1];
};

/**
 * Computes the cross product of two vec2's
 * Note that the cross product must by definition produce a 3D vector
 *
 * @param {vec3} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @returns {vec3} out
 */
vec2.cross = function(out, a, b) {
    var z = a[0] * b[1] - a[1] * b[0];
    out[0] = out[1] = 0;
    out[2] = z;
    return out;
};

/**
 * Performs a linear interpolation between two vec2's
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the first operand
 * @param {vec2} b the second operand
 * @param {Number} t interpolation amount between the two inputs
 * @returns {vec2} out
 */
vec2.lerp = function (out, a, b, t) {
    var ax = a[0],
        ay = a[1];
    out[0] = ax + t * (b[0] - ax);
    out[1] = ay + t * (b[1] - ay);
    return out;
};

/**
 * Generates a random vector with the given scale
 *
 * @param {vec2} out the receiving vector
 * @param {Number} [scale] Length of the resulting vector. If ommitted, a unit vector will be returned
 * @returns {vec2} out
 */
vec2.random = function (out, scale) {
    scale = scale || 1.0;
    var r = glMatrix.RANDOM() * 2.0 * Math.PI;
    out[0] = Math.cos(r) * scale;
    out[1] = Math.sin(r) * scale;
    return out;
};

/**
 * Transforms the vec2 with a mat2
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y;
    out[1] = m[1] * x + m[3] * y;
    return out;
};

/**
 * Transforms the vec2 with a mat2d
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat2d} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat2d = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[2] * y + m[4];
    out[1] = m[1] * x + m[3] * y + m[5];
    return out;
};

/**
 * Transforms the vec2 with a mat3
 * 3rd vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat3} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat3 = function(out, a, m) {
    var x = a[0],
        y = a[1];
    out[0] = m[0] * x + m[3] * y + m[6];
    out[1] = m[1] * x + m[4] * y + m[7];
    return out;
};

/**
 * Transforms the vec2 with a mat4
 * 3rd vector component is implicitly '0'
 * 4th vector component is implicitly '1'
 *
 * @param {vec2} out the receiving vector
 * @param {vec2} a the vector to transform
 * @param {mat4} m matrix to transform with
 * @returns {vec2} out
 */
vec2.transformMat4 = function(out, a, m) {
    var x = a[0], 
        y = a[1];
    out[0] = m[0] * x + m[4] * y + m[12];
    out[1] = m[1] * x + m[5] * y + m[13];
    return out;
};

/**
 * Perform some operation over an array of vec2s.
 *
 * @param {Array} a the array of vectors to iterate over
 * @param {Number} stride Number of elements between the start of each vec2. If 0 assumes tightly packed
 * @param {Number} offset Number of elements to skip at the beginning of the array
 * @param {Number} count Number of vec2s to iterate over. If 0 iterates over entire array
 * @param {Function} fn Function to call for each vector in the array
 * @param {Object} [arg] additional argument to pass to fn
 * @returns {Array} a
 * @function
 */
vec2.forEach = (function() {
    var vec = vec2.create();

    return function(a, stride, offset, count, fn, arg) {
        var i, l;
        if(!stride) {
            stride = 2;
        }

        if(!offset) {
            offset = 0;
        }
        
        if(count) {
            l = Math.min((count * stride) + offset, a.length);
        } else {
            l = a.length;
        }

        for(i = offset; i < l; i += stride) {
            vec[0] = a[i]; vec[1] = a[i+1];
            fn(vec, vec, arg);
            a[i] = vec[0]; a[i+1] = vec[1];
        }
        
        return a;
    };
})();

/**
 * Returns a string representation of a vector
 *
 * @param {vec2} vec vector to represent as a string
 * @returns {String} string representation of the vector
 */
vec2.str = function (a) {
    return 'vec2(' + a[0] + ', ' + a[1] + ')';
};

/**
 * Returns whether or not the vectors exactly have the same elements in the same position (when compared with ===)
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1];
};

/**
 * Returns whether or not the vectors have approximately the same elements in the same position.
 *
 * @param {vec2} a The first vector.
 * @param {vec2} b The second vector.
 * @returns {Boolean} True if the vectors are equal, false otherwise.
 */
vec2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1];
    var b0 = b[0], b1 = b[1];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)));
};

module.exports = vec2;


/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Render systems require a camera. Use this class to create one.
 * @extends {GameObject}
 * @param {number} width
 * @param {number} height
 */
var CameraSystem = function (_GameObject) {
	_inherits(CameraSystem, _GameObject);

	function CameraSystem() {
		_classCallCheck(this, CameraSystem);

		var _this = _possibleConstructorReturn(this, (CameraSystem.__proto__ || Object.getPrototypeOf(CameraSystem)).call(this));

		_this.pruneList = [];
		_this.suspendedObjects = [];
		_this.skewX = _this.skew;
		_this.skeyY = _this.skew;
		_this.scaleX = 1;
		_this.scaleY = 1;
		_this.rotation = 0;
		_this.rotationAxis = _vec2.default.create();
		_vec2.default.set(_this.rotationAxis, 0, 0, 1);
		return _this;
	}

	/**
  * Set the scale to render at
  * @param {number} scaleX
  * @param {number} scaleY - Default: scaleX
  */


	_createClass(CameraSystem, [{
		key: 'setScale',
		value: function setScale(scaleX, scaleY) {
			scaleY = scaleY || scaleX;
			this.scaleX = scaleX;
			this.scaleY = scaleY;
		}

		/**
   * Change the size of the camera
   * @param {number} width
   * @param {number} height
   */

	}, {
		key: 'setSize',
		value: function setSize(width, height) {
			this.width = width;
			this.height = height;
		}
	}, {
		key: 'addManagerForPruning',
		value: function addManagerForPruning(objectManager) {
			if (objectManager instanceof GameObjectManager) this.pruneList.push(objectManager);
		}
	}, {
		key: 'getTransformMatrix',
		value: function getTransformMatrix() {
			// var m = new Matrix(this.shearMatrix);
			// m.multiplyBy(this.scaleMatrix);
			// m.multiplyBy(this.rotMat);
			return this.transformMatrix;
		}
	}, {
		key: 'update',
		value: function update(delta) {
			_get(CameraSystem.prototype.__proto__ || Object.getPrototypeOf(CameraSystem.prototype), 'update', this).call(this, delta);
			//this.rotation += 0.0001 * delta;
			//this.rotMat = Matrix.rotationMatrix(-Vector2.angleBetween(suns[0],pointMasses[0]));
			//this.angle += 0.0001 * delta;
			//this.scaleMatrix.values[0][0] = -(Math.sin(this.angle)+0.5)*3;
			//this.scaleMatrix.values[1][1] = (Math.sin(this.angle)+0.5)*3;
			//this.rotMat = Matrix.rotationMatrix(this.rotation);

			/*
   TODO: Pruning objeccts which are off screen could be a component's job?
   var i = 0,
   	l = this.pruneList.length,
   	mgr, objs, j;
   for(; i < l; i++){
   	mgr = this.pruneList[i];
   	if(mgr instanceof GE.GameObjectManager)
   	{
   		objs = mgr.objects;
   		for(j=0;j<objs.length;j++){
   			this.pruneVec.set(objs[j].position).subtract(this.position);
   			if(Math.abs(this.pruneVec.x) > this.screen.width * 2 || Math.abs(this.pruneVec.y) > this.screen.height * 2)
   			{
   				mgr.removeObject(objs[j]);
   				this.suspendedObjects.push({object: objs[j], parent: mgr, position: j});
   			}
   		}
   	}
   }
   */
		}
	}]);

	return CameraSystem;
}(_GameObject3.default);

exports.default = CameraSystem;

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(10);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var u = _vec2.default.create();
var n = _vec2.default.create();
var w = _vec2.default.create();
var p = _vec2.default.create();
var r = _vec2.default.create();
var q = _vec2.default.create();
var s = _vec2.default.create();
var q_p = _vec2.default.create();
var v = _vec2.default.create();

/**
 * Component which interacts with the background system to bounce an object off surfaces.
 * @extends {GameComponent}
 * @param {BackgroundCollisionSystem} backgroundSystem - Where can I find surfaces to collide with.
 * @param {array} collisionBounds - Default bounds array for the parent object
 * @memberof Collision
 */

var BackgroundCollisionComponent = function (_GameComponent) {
	_inherits(BackgroundCollisionComponent, _GameComponent);

	function BackgroundCollisionComponent(backgroundSystem, collisionBounds) {
		_classCallCheck(this, BackgroundCollisionComponent);

		var _this = _possibleConstructorReturn(this, (BackgroundCollisionComponent.__proto__ || Object.getPrototypeOf(BackgroundCollisionComponent)).call(this));

		_this.backgroundSystem = backgroundSystem;
		_this.bounds = collisionBounds;
		_this.coefficientFriction = BackgroundCollisionComponent.COEFFICIENT_FRICTION;
		_this.coefficientRestitution = BackgroundCollisionComponent.COEFFICIENT_RESTITUTION;
		return _this;
	}

	_createClass(BackgroundCollisionComponent, [{
		key: 'update',
		value: function update(parent, delta) {
			// This logic should probably be moved to BackgroundCollisionSystem
			var surfaces = this.backgroundSystem.surfaces,
			    j = 0,
			    m = surfaces.length,
			    c,
			    l,
			    i,
			    p_t,
			    p_u,

			//theta,
			f = this.coefficientFriction,
			    e = this.coefficientRestitution,
			    parentX = parent.position[0],
			    parentY = parent.position[1];
			if (this.lastX && Math.abs(this.lastX - parentX) < 100 && Math.abs(this.lastY - parentY) < 100) {
				for (; j < m; j++) {
					c = surfaces[j], l = c.length;
					for (i = 0; i < l - 3; i += 2) {
						// http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
						_vec2.default.set(p, c[i], c[i + 1]);
						_vec2.default.set(r, c[i + 2], c[i + 3]);
						_vec2.default.subtract(r, r, p);
						_vec2.default.set(q, this.lastX, this.lastY);
						_vec2.default.subtract(s, parent.position, q);
						//theta = s.angle();
						//s.add(0,this.bounds*Math.cos(theta));
						_vec2.default.subtract(q_p, q, p);
						p_t = cross(q_p, s) / cross(r, s);
						p_u = cross(q_p, r) / cross(r, s);
						if (p_t >= 0 && p_t <= 1 && p_u >= 0 && p_u <= 1) {
							parent.position[0] = this.lastX;
							parent.position[1] = this.lastY;
							// http://stackoverflow.com/questions/573084/how-to-calculate-bounce-angle
							_vec2.default.set(n, -r[1], r[0]); // this is the normal to the surface
							_vec2.default.normalize(n, n);
							_vec2.default.copy(v, parent.velocity);
							_vec2.default.scale(u, n, _vec2.default.dot(n, v));
							_vec2.default.subtract(w, v, u);
							_vec2.default.scale(w, w, f);
							_vec2.default.scale(u, u, e);
							_vec2.default.subtract(parent.velocity, w, u);
							break;
						}
					}
				}
			}
			this.lastX = parent.position[0];
			this.lastY = parent.position[1];
		}
	}]);

	return BackgroundCollisionComponent;
}(_GameComponent3.default);

BackgroundCollisionComponent.COEFFICIENT_FRICTION = 0.95;
BackgroundCollisionComponent.COEFFICIENT_RESTITUTION = 0.4;

function cross(a, b) {
	return a[0] * b[1] - a[1] * b[0];
}

exports.default = BackgroundCollisionComponent;

/***/ }),
/* 13 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
				value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var sCBVdelta = _vec2.default.create();
var sCBVmtd = _vec2.default.create();
var sCBVv = _vec2.default.create();
var sCBVmtdNorm = _vec2.default.create();
var sCBVimpulse = _vec2.default.create();

/**
 * Component which allows collided objects to bounce off one-another. Respects
 * conservation of momentum.
 *
 * <p>This component behaves differently from other components. There is no
 * update method. Instead it attaches a listener to the parents' "attack" event.
 *
 * <p><em>Note: There is currently no method for removing listeners so removing
 * this component may have undesired effects.</em></p>
 * @extends {GameComponent}
 * @memberof Collision
 */

var BounceComponent = function (_GameComponent) {
				_inherits(BounceComponent, _GameComponent);

				function BounceComponent() {
								_classCallCheck(this, BounceComponent);

								/** Coefficient of restitution. */
								var _this = _possibleConstructorReturn(this, (BounceComponent.__proto__ || Object.getPrototypeOf(BounceComponent)).call(this));

								_this.cRestitution = 0.9;
								return _this;
				}

				_createClass(BounceComponent, [{
								key: 'init',
								value: function init(parent) {
												var _this2 = this;

												parent.on("attack", function (other) {

																var aWidth = parent.bounds[2] - parent.bounds[0];
																var aHeight = parent.bounds[3] - parent.bounds[1];
																var bWidth = other.bounds[2] - other.bounds[0];
																var bHeight = other.bounds[3] - other.bounds[1];
																var aRad = (aWidth + aHeight) / 2;
																var bRad = (bWidth + bHeight) / 2;

																var minDist = (aRad + bRad) / 2;
																var curDist = _vec2.default.dist(parent.position, other.position);

																if (curDist < minDist) {
																				// http://stackoverflow.com/q/345838
																				// get the mtd
																				_vec2.default.subtract(sCBVdelta, parent.position, other.position);

																				// minimum translation distance to push balls apart after intersecting
																				_vec2.default.scale(sCBVmtd, sCBVdelta, (minDist - curDist) / curDist);

																				// resolve intersection --
																				// inverse mass quantities
																				var im1 = 1 / (parent.mass || 1);
																				var im2 = 1 / (other.mass || 1);

																				// push-pull them apart based off their mass
																				_vec2.default.scaleAndAdd(parent.position, parent.position, sCBVmtd, im1 / (im1 + im2));
																				_vec2.default.scaleAndAdd(other.position, other.position, sCBVmtd, -im2 / (im1 + im2));

																				// impact speed
																				_vec2.default.subtract(sCBVv, parent.velocity, other.velocity);
																				_vec2.default.normalize(sCBVmtdNorm, sCBVmtd);
																				var vn = _vec2.default.dot(sCBVv, sCBVmtdNorm);

																				// sphere intersecting but moving away from each other already
																				if (vn > 0) return;

																				// collision impulse
																				var i = -(1 + _this2.cRestitution) * vn / (im1 + im2);
																				_vec2.default.scale(sCBVimpulse, sCBVmtdNorm, i);

																				// change in momentum
																				_vec2.default.scaleAndAdd(parent.velocity, parent.velocity, sCBVimpulse, im1);
																				_vec2.default.scaleAndAdd(other.velocity, other.velocity, sCBVimpulse, -im2);
																}
												});
								}
				}]);

				return BounceComponent;
}(_GameComponent3.default);

exports.default = BounceComponent;

/***/ }),
/* 14 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component registers the parent object with collision system.
 * It can handle configurations where the parent is both attack and vulnerable.
 * @extends {GameComponent}
 * @param {CollisionSystem} collisionSystem - Which CollisionSystem to report to
 * @param {boolean} attack - Can this object attack?
 * @param {boolean} vulnerable - Is this object vulnerable?
 * @memberof Collision
 */
var CollisionComponent = function (_GameComponent) {
	_inherits(CollisionComponent, _GameComponent);

	function CollisionComponent(collisionSystem, attack, vulnerable) {
		_classCallCheck(this, CollisionComponent);

		var _this = _possibleConstructorReturn(this, (CollisionComponent.__proto__ || Object.getPrototypeOf(CollisionComponent)).call(this));

		_this.collisionSystem = collisionSystem;
		_this.attack = attack;
		_this.vulnerable = vulnerable;
		return _this;
	}

	_createClass(CollisionComponent, [{
		key: 'update',
		value: function update(parent, delta) {
			if (this.attack) this.collisionSystem.addAttackObject(parent);

			if (this.vulnerable) this.collisionSystem.addVulnerableObject(parent);
		}
	}]);

	return CollisionComponent;
}(_GameComponent3.default);

exports.default = CollisionComponent;

/***/ }),
/* 15 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Submit temporary surfaces to BackgroundCollisionSystem every frame.
 * These are added relative to parent object. This is useful if the parent
 * object is a moving platform for example.
 * @extends {GameComponent}
 * @param {BackgroundCollisionSystem} backgroundSystem - Where can I add my surfaces.
 * @param {array} lineSegments - Line segments to add. These are polylines e.g. <code>[x1, y1, x2, y2, ..., xn, yn]</code>
 * @memberof Collision
 */
var SolidComponent = function (_GameComponent) {
    _inherits(SolidComponent, _GameComponent);

    function SolidComponent(backgroundSystem, lineSegments) {
        _classCallCheck(this, SolidComponent);

        var _this = _possibleConstructorReturn(this, (SolidComponent.__proto__ || Object.getPrototypeOf(SolidComponent)).call(this));

        _this.backgroundSystem = backgroundSystem;
        _this.segments = lineSegments;
        return _this;
    }

    _createClass(SolidComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            var lines = [],
                i = 0,
                l = this.segments.length,
                j,
                m,
                seg,
                line;
            for (; i < l; i++) {
                seg = this.segments[i];
                m = seg.length - 1;
                line = [];
                for (j = 0; j < m; j += 2) {
                    line.push(seg[j] + parent.position.x, seg[j + 1] + parent.position.y);
                }
                lines.push(line);
            }
            this.backgroundSystem.addTemporarySurfaces(lines);
        }
    }]);

    return SolidComponent;
}(_GameComponent3.default);

exports.default = SolidComponent;

/***/ }),
/* 16 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * A subclass of {@link GameObject} which manages its own children
 * @extends {GameObject}
 */
var GameObjectManager = function (_GameObject) {
  _inherits(GameObjectManager, _GameObject);

  function GameObjectManager() {
    _classCallCheck(this, GameObjectManager);

    var _this = _possibleConstructorReturn(this, (GameObjectManager.__proto__ || Object.getPrototypeOf(GameObjectManager)).call(this));

    _this.objects = [];

    _this._objectsToBeRemoved = [];

    _this.objects.remove = arrayRemoveItem;
    return _this;
  }

  /**
   * Add an object to be updated as children of this manager. Children are given a
   * property <code>parent</code> pointing to this <code>GameObjectManager</code>.
   * @param {GameObject} object - Game object to be attached to this node in the tree
   * @return {GameObjectManager} Returns a reference to this for chainability
   */


  _createClass(GameObjectManager, [{
    key: "addObject",
    value: function addObject(object) {
      if (object instanceof _GameObject3.default) this.objects.push(object);
      object.parent = this;
      return this;
    }

    /**
     * Add an object to be updated as children of this manager at particular place
     * in the list of children.
     * @param {GameObject} object - Game object to be attached to this node in the tree
     * @param {number} index - Position in the list
     * @return {GameObjectManager} Returns a reference to this for chainability
     */

  }, {
    key: "addObjectAt",
    value: function addObjectAt(object, index) {
      if (object instanceof _GameObject3.default) this.objects.splice(index, 0, object);
      object.parent = this;
      return this;
    }

    /**
     * Remove a previously added object from this manager.
     * @param {GameObject} object - Game object to be removed
     * @return {GameObjectManager} Returns a reference to this for chainability
     */

  }, {
    key: "removeObject",
    value: function removeObject(object) {
      if (object instanceof _GameObject3.default) this._objectsToBeRemoved.push(object);
      if (object.parent == this) {
        object.parent = null;
      }
      return this;
    }

    /**
     * Remove all previously added objects from this manager.
     * @return {GameObjectManager} Returns a reference to this for chainability
     */

  }, {
    key: "removeAll",
    value: function removeAll() {
      this.objects.length = 0;
    }

    /**
     * This method is inherited from {@link GameObject}. It will first call update
     * on each of its components like an ordinary {@link GameObject} but then it
     * will start updating all of its child nodes.
     * @param {number} delta - Time since last frame in milliseconds
     */

  }, {
    key: "update",
    value: function update(delta) {
      _get(GameObjectManager.prototype.__proto__ || Object.getPrototypeOf(GameObjectManager.prototype), "update", this).call(this, delta);

      var i = 0,
          l = this.objects.length,
          m,
          j = 0;

      for (i = 0; i < l; i++) {
        this.objects[i].update(delta);
      }

      m = this._objectsToBeRemoved.length;

      for (; j < m; j++) {
        i = 0;
        for (; i < l; i++) {
          if (this.objects[i] == this._objectsToBeRemoved[j]) {
            this.objects.remove(i);
            l--;
            break;
          }
        }
      }
      this._objectsToBeRemoved.length = 0;
    }

    /**
     * This method is used to produce a html representation of the manage for
     * things such as debugging trees. It will include components as well as child
     * objects in its rendering. Similar to the toString method.
     * @return {string} Representation of this component in HTML
     */

  }, {
    key: "toHTML",
    value: function toHTML() {
      var html = this.name,
          i;
      if (this.objects.length > 1) html += " (" + this.objects.length + " items)";
      if (this.components.length) {
        html += "<ul>";
        for (i = 0; i < this.components.length; i++) {
          html += "<li>" + this.components[i].toHTML();
        }html += "</ul>";
      }
      if (this.objects.length) {
        html += "<ul>";
        for (i = 0; i < this.objects.length; i++) {
          html += "<li>" + this.objects[i].toHTML();
        }html += "</ul>";
      }
      return html;
    }
  }]);

  return GameObjectManager;
}(_GameObject3.default);

exports.default = GameObjectManager;


function arrayRemoveItem(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
}

/***/ }),
/* 17 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Commponent which checks the input system for clicks which occured with
 * its parents bounds then reports such click to the parent.
 * @class ClickComponent
 * @extends {GameComponent}
 * @param {InputSystem} inputSystem - Where to listen to for clicks
 */
var ClickComponent = function (_GameComponent) {
  _inherits(ClickComponent, _GameComponent);

  function ClickComponent(inputSystem) {
    _classCallCheck(this, ClickComponent);

    var _this = _possibleConstructorReturn(this, (ClickComponent.__proto__ || Object.getPrototypeOf(ClickComponent)).call(this));

    _this.inputSystem = inputSystem;
    return _this;
  }

  _createClass(ClickComponent, [{
    key: 'update',
    value: function update(parent, delta) {
      if (parent.bounds && this.inputSystem.hasClick) {
        var click = this.inputSystem.lastClick;
        var pos = parent.position;
        var bounds = parent.bounds;

        if (bounds[0] + pos[0] < click[0] && bounds[1] + pos[1] < click[1] && bounds[2] + pos[0] > click[0] && bounds[3] + pos[1] > click[1]) {
          this.fire('click', parent);
        }
      }
    }
  }]);

  return ClickComponent;
}(_GameComponent3.default);

exports.default = ClickComponent;

/***/ }),
/* 18 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var DotRenderComponent = function (_GameComponent) {
    _inherits(DotRenderComponent, _GameComponent);

    function DotRenderComponent(renderSystem) {
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#000";

        _classCallCheck(this, DotRenderComponent);

        var _this = _possibleConstructorReturn(this, (DotRenderComponent.__proto__ || Object.getPrototypeOf(DotRenderComponent)).call(this));

        _this.renderSystem = renderSystem;
        _this.color = color;
        return _this;
    }

    _createClass(DotRenderComponent, [{
        key: "update",
        value: function update(parent, delta) {
            var b = parent.bounds;
            var p = parent.position;
            var s = parent.size;
            var c = parent.color || parent.colour || this.color;

            this.renderSystem.push(function (ctx) {
                ctx.beginPath();
                ctx.fillStyle = c;
                ctx.translate(p[0], p[1]);
                if (b) ctx.scale(b[2] - b[0], b[3] - b[1]);else if (s) ctx.scale(s, s);
                ctx.arc(0, 0, 0.5, 0, Math.PI * 2, false);
                ctx.fill();
            });
        }
    }]);

    return DotRenderComponent;
}(_GameComponent3.default);

exports.default = DotRenderComponent;

/***/ }),
/* 19 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RectangleRenderComponent = function (_GameComponent) {
    _inherits(RectangleRenderComponent, _GameComponent);

    function RectangleRenderComponent(renderSystem) {
        var color = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "#000";

        _classCallCheck(this, RectangleRenderComponent);

        var _this = _possibleConstructorReturn(this, (RectangleRenderComponent.__proto__ || Object.getPrototypeOf(RectangleRenderComponent)).call(this));

        _this.renderSystem = renderSystem;
        _this.color = color;
        return _this;
    }

    _createClass(RectangleRenderComponent, [{
        key: "update",
        value: function update(parent, delta) {
            var b = parent.bounds;
            var p = parent.position;
            var s = parent.size;
            var c = parent.color || parent.colour || this.color;

            this.renderSystem.push(function (ctx) {
                ctx.beginPath();
                ctx.fillStyle = c;
                ctx.translate(p[0], p[1]);
                if (b) ctx.rect(b[0], b[1], b[2] - b[0], b[3] - b[1]);else if (s) ctx.rect(-s / 2, -s / 2, s, s);
                ctx.fill();
            });
        }
    }]);

    return RectangleRenderComponent;
}(_GameComponent3.default);

exports.default = RectangleRenderComponent;

/***/ }),
/* 20 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var TextRenderComponent = function (_GameComponent) {
  _inherits(TextRenderComponent, _GameComponent);

  function TextRenderComponent(renderSystem, text, x, y) {
    var font = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : "10px sans-serif";
    var color = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : "#000";

    _classCallCheck(this, TextRenderComponent);

    var _this = _possibleConstructorReturn(this, (TextRenderComponent.__proto__ || Object.getPrototypeOf(TextRenderComponent)).call(this));

    _this.renderSystem = renderSystem;
    _this.text = text;
    _this.font = font;
    _this.color = color;
    _this.setPosition(x, y);
    return _this;
  }

  _createClass(TextRenderComponent, [{
    key: "update",
    value: function update(parent, delta) {
      var _this2 = this;

      this.renderSystem.push(function (ctx) {
        ctx.translate(parent.position[0], parent.position[1]);
        ctx.translate(_this2.position[0], _this2.position[1]);
        ctx.fillStyle = _this2.color;
        ctx.font = _this2.font;
        ctx.fillText(_this2.text, 0, 0);
      });
    }
  }]);

  return TextRenderComponent;
}(_GameComponent3.default);

exports.default = TextRenderComponent;

/***/ }),
/* 21 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

var _mat = __webpack_require__(25);

var _mat2 = _interopRequireDefault(_mat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var WebGLRenderSystem = function (_GameObject) {
    _inherits(WebGLRenderSystem, _GameObject);

    function WebGLRenderSystem(context, canvasWidth, canvasHeight, cameraSystem, shaderProgram) {
        _classCallCheck(this, WebGLRenderSystem);

        var _this = _possibleConstructorReturn(this, (WebGLRenderSystem.__proto__ || Object.getPrototypeOf(WebGLRenderSystem)).call(this));

        _this.context = context;
        _this.canvasWidth = canvasWidth;
        _this.canvasHeight = canvasHeight;
        _this.cameraSystem = cameraSystem;
        _this.shaderProgram = shaderProgram;
        _this.mvMatrix = _mat2.default.create();
        _this.pMatrix = _mat2.default.create();
        _this.renderQueue = [];
        _this.spareVector = _vec2.default.create();
        _this.ambientLight = 0.3;
        _this.pointLighting = 1.4;
        return _this;
    }

    _createClass(WebGLRenderSystem, [{
        key: 'push',
        value: function push(renderable) {
            this.renderQueue.push(renderable);
        }
    }, {
        key: 'update',
        value: function update(delta) {
            var gl = this.context,
                cam = this.cameraSystem,
                i,
                l;

            gl.viewport(0, 0, gl.viewportWidth, gl.viewportHeight);
            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

            _mat2.default.perspective(this.pMatrix, 45 * Math.PI / 180, gl.viewportWidth / gl.viewportHeight, 0.1, 10000.0);

            _mat2.default.translate(this.pMatrix, this.pMatrix, _vec2.default.negate(this.spareVector, cam.position));

            if (cam.rotation && cam.rotationAxis) {
                _mat2.default.rotate(this.pMatrix, this.pMatrix, cam.rotation, cam.rotationAxis);
            }

            gl.uniformMatrix4fv(this.shaderProgram.pMatrixUniform, false, this.pMatrix);

            for (i = 0, l = this.renderQueue.length; i < l; i++) {

                _mat2.default.identity(this.mvMatrix);

                this.renderQueue[i].call(this, this.context, this.mvMatrix);
            }

            this.renderQueue.length = 0;
        }
    }, {
        key: 'setCanvasSize',
        value: function setCanvasSize(width, height) {
            this.canvasWidth = width;
            this.canvasHeight = height;
        }
    }]);

    return WebGLRenderSystem;
}(_GameObject3.default);

exports.default = WebGLRenderSystem;

/***/ }),
/* 22 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Bounce off the walls of a world.
 * @extends {GameComponent}
 * @param {WorldSystem} worldSystem - The world the parent object is in.
 * @param {number} width - Default width if parent has no bounds
 * @param {number} height - Default height if parent has no bounds
 * @param {number} thickness - Default thickness if parent has no bounds
 * @memberof World
 */
var WorldBounceComponent = function (_GameComponent) {
    _inherits(WorldBounceComponent, _GameComponent);

    function WorldBounceComponent(worldSystem, width, height, thickness) {
        _classCallCheck(this, WorldBounceComponent);

        var _this = _possibleConstructorReturn(this, (WorldBounceComponent.__proto__ || Object.getPrototypeOf(WorldBounceComponent)).call(this));

        _this.worldSystem = worldSystem;
        _this.ax = (width || 0) / 2;
        _this.ay = (height || 0) / 2;
        _this.az = (thickness || 0) / 2;

        _this.cRestitution = 1;
        _this.cFriction = 1;
        return _this;
    }

    _createClass(WorldBounceComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            var coef = this.cRestitution,
                friction = this.cFriction;

            if (parent.bounds) {
                this.bx1 = this.worldSystem.bounds[0] - parent.bounds[0];
                this.by1 = this.worldSystem.bounds[1] - parent.bounds[1];
                this.bx2 = this.worldSystem.bounds[2] - parent.bounds[2];
                this.by2 = this.worldSystem.bounds[3] - parent.bounds[3];
                this.bz1 = this.worldSystem.bounds[4] - parent.bounds[4];
                this.bz2 = this.worldSystem.bounds[5] - parent.bounds[5];
            } else {
                this.bx1 = this.worldSystem.bounds[0] + this.ax;
                this.by1 = this.worldSystem.bounds[1] + this.ay;
                this.bx2 = this.worldSystem.bounds[2] - this.ax;
                this.by2 = this.worldSystem.bounds[3] - this.ay;
                this.bz1 = this.worldSystem.bounds[4] + this.az;
                this.bz2 = this.worldSystem.bounds[5] - this.az;
            }

            // hasBounced: 1: x, 2: y, 3: z
            parent.hasBounced = false;

            if (parent.position[0] < this.bx1) {
                parent.position[0] = this.bx1;
                parent.velocity[0] = -parent.velocity[0] * coef;
                parent.velocity[1] = parent.velocity[1] * friction;
                parent.velocity[2] = parent.velocity[2] * friction;

                parent.hasBounced = 1;
            } else if (parent.position[0] > this.bx2) {
                parent.position[0] = this.bx2;
                parent.velocity[0] = -parent.velocity[0] * coef;
                parent.velocity[1] = parent.velocity[1] * friction;
                parent.velocity[2] = parent.velocity[2] * friction;

                parent.hasBounced = 1;
            }

            if (parent.position[1] < this.by1) {
                parent.position[1] = this.by1;
                parent.velocity[1] = -parent.velocity[1] * coef;
                parent.velocity[0] = parent.velocity[0] * friction;
                parent.velocity[2] = parent.velocity[2] * friction;

                parent.hasBounced = 2;
            } else if (parent.position[1] > this.by2) {
                parent.position[1] = this.by2;
                parent.velocity[1] = -parent.velocity[1] * coef;
                parent.velocity[0] = parent.velocity[0] * friction;
                parent.velocity[2] = parent.velocity[2] * friction;

                parent.hasBounced = 2;
            }

            if (parent.position[2] < this.bz1) {
                parent.position[2] = this.bz1;
                parent.velocity[2] = -parent.velocity[2] * coef;
                parent.velocity[0] = parent.velocity[0] * friction;
                parent.velocity[1] = parent.velocity[1] * friction;

                parent.hasBounced = 3;
            } else if (parent.position[2] > this.bz2) {
                parent.position[2] = this.bz2;
                parent.velocity[2] = -parent.velocity[2] * coef;
                parent.velocity[0] = parent.velocity[0] * friction;
                parent.velocity[1] = parent.velocity[1] * friction;

                parent.hasBounced = 3;
            }
        }
    }]);

    return WorldBounceComponent;
}(_GameComponent3.default);

exports.default = WorldBounceComponent;

/***/ }),
/* 23 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * When parent goes outside of world bounds wrap to the opposite wall.
 * @extends {GameComponent}
 * @param {WorldSystem} worldSystem - Which world is the parent in.
 * @memberof World
 */
var WorldWrapComponent = function (_GameComponent) {
	_inherits(WorldWrapComponent, _GameComponent);

	function WorldWrapComponent(worldSystem) {
		_classCallCheck(this, WorldWrapComponent);

		var _this = _possibleConstructorReturn(this, (WorldWrapComponent.__proto__ || Object.getPrototypeOf(WorldWrapComponent)).call(this));

		_this.worldSystem = worldSystem;
		return _this;
	}

	_createClass(WorldWrapComponent, [{
		key: "update",
		value: function update(parent, delta) {
			this.ax = this.worldSystem.bounds[0];
			this.ay = this.worldSystem.bounds[1];
			this.bx = this.worldSystem.bounds[2];
			this.by = this.worldSystem.bounds[3];
			this.az = this.worldSystem.bounds[4];
			this.bz = this.worldSystem.bounds[5];

			if (parent.position[0] < this.ax && parent.velocity[0] < 0) {
				parent.position[0] = this.bx;
				this.fire("wrap", parent);
			} else if (parent.position[0] > this.bx && parent.velocity[0] > 0) {
				parent.position[0] = this.ax;
				this.fire("wrap", parent);
			}
			if (parent.position[1] < this.ay && parent.velocity[1] < 0) {
				parent.position[1] = this.by;
				this.fire("wrap", parent);
			} else if (parent.position[1] > this.by && parent.velocity[1] > 0) {
				parent.position[1] = this.ay;
				this.fire("wrap", parent);
			}
			if (parent.position[2] < this.az && parent.velocity[2] < 0) {
				parent.position[2] = this.bz;
				this.fire("wrap", parent);
			} else if (parent.position[2] > this.bz && parent.velocity[2] > 0) {
				parent.position[2] = this.az;
				this.fire("wrap", parent);
			}
		}
	}]);

	return WorldWrapComponent;
}(_GameComponent3.default);

exports.default = WorldWrapComponent;

/***/ }),
/* 24 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

// Working Vectors
var vecSeparation = _vec2.default.create();
var vecAlign = _vec2.default.create();
var vecCohesion = _vec2.default.create();
var vecSpare = _vec2.default.create();

/**
 * <p>Objects with this component will try to 'flock' together. There are three effects Working
 * together to produce flocking behaviour.
 * <p>The parent object will be attracted to the average position of objects within the
 * {@link FlockingComponent.NEIGHBOUR_RADIUS}, this is called cohesion.
 * <p>The parent object wil try to move in the average direction of all the other objects within
 * the neighbourhood, this is called alignment.
 * <p>The parent object will try to move away from object with the
 * {@link FlockingComponent.SEPARATION_RADIUS}, this is called separation.
 * @extends {GameComponent}
 * @param {array} flock - An array of game objects which are considered to be in the same flock.
 * @memberof Behaviour
 */

var FlockingComponent = function (_GameComponent) {
    _inherits(FlockingComponent, _GameComponent);

    function FlockingComponent(flock) {
        _classCallCheck(this, FlockingComponent);

        var _this = _possibleConstructorReturn(this, (FlockingComponent.__proto__ || Object.getPrototypeOf(FlockingComponent)).call(this));

        _this.flock = flock;
        return _this;
    }

    _createClass(FlockingComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            _vec2.default.set(vecCohesion, 0, 0, 0);
            _vec2.default.set(vecAlign, 0, 0, 0);
            _vec2.default.set(vecSeparation, 0, 0, 0);
            _vec2.default.set(vecSpare, 0, 0, 0);

            var count = 0;
            var length = this.flock.length;

            for (var i = 0; i < length; i++) {
                var other = this.flock[i];
                var dist = _vec2.default.dist(other.position, parent.position);

                if (dist > 0 && dist < FlockingComponent.NEIGHBOUR_RADIUS) {
                    _vec2.default.add(vecCohesion, vecCohesion, other.position);
                    _vec2.default.add(vecAlign, vecAlign, other.velocity);

                    if (dist < FlockingComponent.SEPARATION_RADIUS) {
                        _vec2.default.subtract(vecSpare, parent.position, other.position);
                        _vec2.default.normalize(vecSpare, vecSpare);
                        _vec2.default.scaleAndAdd(vecSeparation, vecSeparation, vecSpare, 1 / dist);
                    }

                    count++;
                }
            }

            if (count > 0) {
                _vec2.default.scale(vecCohesion, vecCohesion, 1 / count);
                _vec2.default.subtract(vecCohesion, vecCohesion, parent.position);
                _vec2.default.scaleAndAdd(parent.velocity, parent.velocity, vecCohesion, FlockingComponent.COHESION_WEIGHT);

                _vec2.default.scaleAndAdd(parent.velocity, parent.velocity, vecAlign, FlockingComponent.ALIGN_WEIGHT / count);

                _vec2.default.scaleAndAdd(parent.velocity, parent.velocity, vecSeparation, FlockingComponent.SEPARATION_WEIGHT / count);

                var mag = _vec2.default.length(parent.velocity);

                if (mag > FlockingComponent.MAX_SPEED) {
                    _vec2.default.scale(parent.velocity, parent.velocity, FlockingComponent.MAX_SPEED / mag);
                }
            }
        }
    }]);

    return FlockingComponent;
}(_GameComponent3.default);

exports.default = FlockingComponent;

// FlockingComponent Constants

/** Size of sphere of influence. */

FlockingComponent.NEIGHBOUR_RADIUS = 200;
/** Size of replulsion sphere. */
FlockingComponent.SEPARATION_RADIUS = 150;
/** Lock speed to maximum magnitude. */
FlockingComponent.MAX_SPEED = 0.1;
/** Coefficient controlling desire to move to same position. */
FlockingComponent.COHESION_WEIGHT = 0.1 * FlockingComponent.MAX_SPEED / FlockingComponent.NEIGHBOUR_RADIUS;
/** Coefficient controlling desire to match velocity. */
FlockingComponent.ALIGN_WEIGHT = 30 * FlockingComponent.MAX_SPEED / FlockingComponent.NEIGHBOUR_RADIUS;
/** Coefficient controlling desire to move away from others. */
FlockingComponent.SEPARATION_WEIGHT = 100 / FlockingComponent.SEPARATION_RADIUS;

/***/ }),
/* 25 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(4);

/**
 * @class 4x4 Matrix
 * @name mat4
 */
var mat4 = {
  scalar: {},
  SIMD: {},
};

/**
 * Creates a new identity mat4
 *
 * @returns {mat4} a new 4x4 matrix
 */
mat4.create = function() {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Creates a new mat4 initialized with values from an existing matrix
 *
 * @param {mat4} a matrix to clone
 * @returns {mat4} a new 4x4 matrix
 */
mat4.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Copy the values from one mat4 to another
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    out[9] = a[9];
    out[10] = a[10];
    out[11] = a[11];
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Create a new mat4 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} A new mat4
 */
mat4.fromValues = function(m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    var out = new glMatrix.ARRAY_TYPE(16);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};

/**
 * Set the components of a mat4 to the given values
 *
 * @param {mat4} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m03 Component in column 0, row 3 position (index 3)
 * @param {Number} m10 Component in column 1, row 0 position (index 4)
 * @param {Number} m11 Component in column 1, row 1 position (index 5)
 * @param {Number} m12 Component in column 1, row 2 position (index 6)
 * @param {Number} m13 Component in column 1, row 3 position (index 7)
 * @param {Number} m20 Component in column 2, row 0 position (index 8)
 * @param {Number} m21 Component in column 2, row 1 position (index 9)
 * @param {Number} m22 Component in column 2, row 2 position (index 10)
 * @param {Number} m23 Component in column 2, row 3 position (index 11)
 * @param {Number} m30 Component in column 3, row 0 position (index 12)
 * @param {Number} m31 Component in column 3, row 1 position (index 13)
 * @param {Number} m32 Component in column 3, row 2 position (index 14)
 * @param {Number} m33 Component in column 3, row 3 position (index 15)
 * @returns {mat4} out
 */
mat4.set = function(out, m00, m01, m02, m03, m10, m11, m12, m13, m20, m21, m22, m23, m30, m31, m32, m33) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m03;
    out[4] = m10;
    out[5] = m11;
    out[6] = m12;
    out[7] = m13;
    out[8] = m20;
    out[9] = m21;
    out[10] = m22;
    out[11] = m23;
    out[12] = m30;
    out[13] = m31;
    out[14] = m32;
    out[15] = m33;
    return out;
};


/**
 * Set a mat4 to the identity matrix
 *
 * @param {mat4} out the receiving matrix
 * @returns {mat4} out
 */
mat4.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
};

/**
 * Transpose the values of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a03 = a[3],
            a12 = a[6], a13 = a[7],
            a23 = a[11];

        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a01;
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a02;
        out[9] = a12;
        out[11] = a[14];
        out[12] = a03;
        out[13] = a13;
        out[14] = a23;
    } else {
        out[0] = a[0];
        out[1] = a[4];
        out[2] = a[8];
        out[3] = a[12];
        out[4] = a[1];
        out[5] = a[5];
        out[6] = a[9];
        out[7] = a[13];
        out[8] = a[2];
        out[9] = a[6];
        out[10] = a[10];
        out[11] = a[14];
        out[12] = a[3];
        out[13] = a[7];
        out[14] = a[11];
        out[15] = a[15];
    }

    return out;
};

/**
 * Transpose the values of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.transpose = function(out, a) {
    var a0, a1, a2, a3,
        tmp01, tmp23,
        out0, out1, out2, out3;

    a0 = SIMD.Float32x4.load(a, 0);
    a1 = SIMD.Float32x4.load(a, 4);
    a2 = SIMD.Float32x4.load(a, 8);
    a3 = SIMD.Float32x4.load(a, 12);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
    out0  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out1  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 0,  out0);
    SIMD.Float32x4.store(out, 4,  out1);

    tmp01 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
    tmp23 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
    out2  = SIMD.Float32x4.shuffle(tmp01, tmp23, 0, 2, 4, 6);
    out3  = SIMD.Float32x4.shuffle(tmp01, tmp23, 1, 3, 5, 7);
    SIMD.Float32x4.store(out, 8,  out2);
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Transpse a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.transpose = glMatrix.USE_SIMD ? mat4.SIMD.transpose : mat4.scalar.transpose;

/**
 * Inverts a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) {
        return null;
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
    out[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
    out[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
    out[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
    out[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
    out[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
    out[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
    out[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
    out[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
    out[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;

    return out;
};

/**
 * Inverts a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.invert = function(out, a) {
  var row0, row1, row2, row3,
      tmp1,
      minor0, minor1, minor2, minor3,
      det,
      a0 = SIMD.Float32x4.load(a, 0),
      a1 = SIMD.Float32x4.load(a, 4),
      a2 = SIMD.Float32x4.load(a, 8),
      a3 = SIMD.Float32x4.load(a, 12);

  // Compute matrix adjugate
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  // Compute matrix determinant
  det   = SIMD.Float32x4.mul(row0, minor0);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 2, 3, 0, 1), det);
  det   = SIMD.Float32x4.add(SIMD.Float32x4.swizzle(det, 1, 0, 3, 2), det);
  tmp1  = SIMD.Float32x4.reciprocalApproximation(det);
  det   = SIMD.Float32x4.sub(
               SIMD.Float32x4.add(tmp1, tmp1),
               SIMD.Float32x4.mul(det, SIMD.Float32x4.mul(tmp1, tmp1)));
  det   = SIMD.Float32x4.swizzle(det, 0, 0, 0, 0);
  if (!det) {
      return null;
  }

  // Compute matrix inverse
  SIMD.Float32x4.store(out, 0,  SIMD.Float32x4.mul(det, minor0));
  SIMD.Float32x4.store(out, 4,  SIMD.Float32x4.mul(det, minor1));
  SIMD.Float32x4.store(out, 8,  SIMD.Float32x4.mul(det, minor2));
  SIMD.Float32x4.store(out, 12, SIMD.Float32x4.mul(det, minor3));
  return out;
}

/**
 * Inverts a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.invert = glMatrix.USE_SIMD ? mat4.SIMD.invert : mat4.scalar.invert;

/**
 * Calculates the adjugate of a mat4 not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.scalar.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    out[0]  =  (a11 * (a22 * a33 - a23 * a32) - a21 * (a12 * a33 - a13 * a32) + a31 * (a12 * a23 - a13 * a22));
    out[1]  = -(a01 * (a22 * a33 - a23 * a32) - a21 * (a02 * a33 - a03 * a32) + a31 * (a02 * a23 - a03 * a22));
    out[2]  =  (a01 * (a12 * a33 - a13 * a32) - a11 * (a02 * a33 - a03 * a32) + a31 * (a02 * a13 - a03 * a12));
    out[3]  = -(a01 * (a12 * a23 - a13 * a22) - a11 * (a02 * a23 - a03 * a22) + a21 * (a02 * a13 - a03 * a12));
    out[4]  = -(a10 * (a22 * a33 - a23 * a32) - a20 * (a12 * a33 - a13 * a32) + a30 * (a12 * a23 - a13 * a22));
    out[5]  =  (a00 * (a22 * a33 - a23 * a32) - a20 * (a02 * a33 - a03 * a32) + a30 * (a02 * a23 - a03 * a22));
    out[6]  = -(a00 * (a12 * a33 - a13 * a32) - a10 * (a02 * a33 - a03 * a32) + a30 * (a02 * a13 - a03 * a12));
    out[7]  =  (a00 * (a12 * a23 - a13 * a22) - a10 * (a02 * a23 - a03 * a22) + a20 * (a02 * a13 - a03 * a12));
    out[8]  =  (a10 * (a21 * a33 - a23 * a31) - a20 * (a11 * a33 - a13 * a31) + a30 * (a11 * a23 - a13 * a21));
    out[9]  = -(a00 * (a21 * a33 - a23 * a31) - a20 * (a01 * a33 - a03 * a31) + a30 * (a01 * a23 - a03 * a21));
    out[10] =  (a00 * (a11 * a33 - a13 * a31) - a10 * (a01 * a33 - a03 * a31) + a30 * (a01 * a13 - a03 * a11));
    out[11] = -(a00 * (a11 * a23 - a13 * a21) - a10 * (a01 * a23 - a03 * a21) + a20 * (a01 * a13 - a03 * a11));
    out[12] = -(a10 * (a21 * a32 - a22 * a31) - a20 * (a11 * a32 - a12 * a31) + a30 * (a11 * a22 - a12 * a21));
    out[13] =  (a00 * (a21 * a32 - a22 * a31) - a20 * (a01 * a32 - a02 * a31) + a30 * (a01 * a22 - a02 * a21));
    out[14] = -(a00 * (a11 * a32 - a12 * a31) - a10 * (a01 * a32 - a02 * a31) + a30 * (a01 * a12 - a02 * a11));
    out[15] =  (a00 * (a11 * a22 - a12 * a21) - a10 * (a01 * a22 - a02 * a21) + a20 * (a01 * a12 - a02 * a11));
    return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
mat4.SIMD.adjoint = function(out, a) {
  var a0, a1, a2, a3;
  var row0, row1, row2, row3;
  var tmp1;
  var minor0, minor1, minor2, minor3;

  var a0 = SIMD.Float32x4.load(a, 0);
  var a1 = SIMD.Float32x4.load(a, 4);
  var a2 = SIMD.Float32x4.load(a, 8);
  var a3 = SIMD.Float32x4.load(a, 12);

  // Transpose the source matrix.  Sort of.  Not a true transpose operation
  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 0, 1, 4, 5);
  row1 = SIMD.Float32x4.shuffle(a2, a3, 0, 1, 4, 5);
  row0 = SIMD.Float32x4.shuffle(tmp1, row1, 0, 2, 4, 6);
  row1 = SIMD.Float32x4.shuffle(row1, tmp1, 1, 3, 5, 7);

  tmp1 = SIMD.Float32x4.shuffle(a0, a1, 2, 3, 6, 7);
  row3 = SIMD.Float32x4.shuffle(a2, a3, 2, 3, 6, 7);
  row2 = SIMD.Float32x4.shuffle(tmp1, row3, 0, 2, 4, 6);
  row3 = SIMD.Float32x4.shuffle(row3, tmp1, 1, 3, 5, 7);

  tmp1   = SIMD.Float32x4.mul(row2, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.mul(row1, tmp1);
  minor1 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row1, tmp1), minor0);
  minor1 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor1);
  minor1 = SIMD.Float32x4.swizzle(minor1, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row1, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor0);
  minor3 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor3);
  minor3 = SIMD.Float32x4.swizzle(minor3, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(row1, 2, 3, 0, 1), row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  row2   = SIMD.Float32x4.swizzle(row2, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor0);
  minor2 = SIMD.Float32x4.mul(row0, tmp1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor0 = SIMD.Float32x4.sub(minor0, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row0, tmp1), minor2);
  minor2 = SIMD.Float32x4.swizzle(minor2, 2, 3, 0, 1);

  tmp1   = SIMD.Float32x4.mul(row0, row1);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row2, tmp1), minor3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor2 = SIMD.Float32x4.sub(SIMD.Float32x4.mul(row3, tmp1), minor2);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row2, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row3);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row2, tmp1));
  minor2 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row2, tmp1), minor1);
  minor2 = SIMD.Float32x4.sub(minor2, SIMD.Float32x4.mul(row1, tmp1));

  tmp1   = SIMD.Float32x4.mul(row0, row2);
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 1, 0, 3, 2);
  minor1 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row3, tmp1), minor1);
  minor3 = SIMD.Float32x4.sub(minor3, SIMD.Float32x4.mul(row1, tmp1));
  tmp1   = SIMD.Float32x4.swizzle(tmp1, 2, 3, 0, 1);
  minor1 = SIMD.Float32x4.sub(minor1, SIMD.Float32x4.mul(row3, tmp1));
  minor3 = SIMD.Float32x4.add(SIMD.Float32x4.mul(row1, tmp1), minor3);

  SIMD.Float32x4.store(out, 0,  minor0);
  SIMD.Float32x4.store(out, 4,  minor1);
  SIMD.Float32x4.store(out, 8,  minor2);
  SIMD.Float32x4.store(out, 12, minor3);
  return out;
};

/**
 * Calculates the adjugate of a mat4 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the source matrix
 * @returns {mat4} out
 */
 mat4.adjoint = glMatrix.USE_SIMD ? mat4.SIMD.adjoint : mat4.scalar.adjoint;

/**
 * Calculates the determinant of a mat4
 *
 * @param {mat4} a the source matrix
 * @returns {Number} determinant of a
 */
mat4.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32;

    // Calculate the determinant
    return b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
};

/**
 * Multiplies two mat4's explicitly using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand, must be a Float32Array
 * @param {mat4} b the second operand, must be a Float32Array
 * @returns {mat4} out
 */
mat4.SIMD.multiply = function (out, a, b) {
    var a0 = SIMD.Float32x4.load(a, 0);
    var a1 = SIMD.Float32x4.load(a, 4);
    var a2 = SIMD.Float32x4.load(a, 8);
    var a3 = SIMD.Float32x4.load(a, 12);

    var b0 = SIMD.Float32x4.load(b, 0);
    var out0 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b0, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 0, out0);

    var b1 = SIMD.Float32x4.load(b, 4);
    var out1 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 2, 2, 2, 2), a2),
                           SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b1, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 4, out1);

    var b2 = SIMD.Float32x4.load(b, 8);
    var out2 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                       SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 1, 1, 1, 1), a1),
                       SIMD.Float32x4.add(
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 2, 2, 2, 2), a2),
                               SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b2, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 8, out2);

    var b3 = SIMD.Float32x4.load(b, 12);
    var out3 = SIMD.Float32x4.add(
                   SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 0, 0, 0, 0), a0),
                   SIMD.Float32x4.add(
                        SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 1, 1, 1, 1), a1),
                        SIMD.Float32x4.add(
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 2, 2, 2, 2), a2),
                            SIMD.Float32x4.mul(SIMD.Float32x4.swizzle(b3, 3, 3, 3, 3), a3))));
    SIMD.Float32x4.store(out, 12, out3);

    return out;
};

/**
 * Multiplies two mat4's explicitly not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.scalar.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];

    // Cache only the current line of the second matrix
    var b0  = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[1] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[2] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[3] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[4]; b1 = b[5]; b2 = b[6]; b3 = b[7];
    out[4] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[5] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[6] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[7] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[8]; b1 = b[9]; b2 = b[10]; b3 = b[11];
    out[8] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[9] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[10] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[11] = b0*a03 + b1*a13 + b2*a23 + b3*a33;

    b0 = b[12]; b1 = b[13]; b2 = b[14]; b3 = b[15];
    out[12] = b0*a00 + b1*a10 + b2*a20 + b3*a30;
    out[13] = b0*a01 + b1*a11 + b2*a21 + b3*a31;
    out[14] = b0*a02 + b1*a12 + b2*a22 + b3*a32;
    out[15] = b0*a03 + b1*a13 + b2*a23 + b3*a33;
    return out;
};

/**
 * Multiplies two mat4's using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.multiply = glMatrix.USE_SIMD ? mat4.SIMD.multiply : mat4.scalar.multiply;

/**
 * Alias for {@link mat4.multiply}
 * @function
 */
mat4.mul = mat4.multiply;

/**
 * Translate a mat4 by the given vector not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.scalar.translate = function (out, a, v) {
    var x = v[0], y = v[1], z = v[2],
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23;

    if (a === out) {
        out[12] = a[0] * x + a[4] * y + a[8] * z + a[12];
        out[13] = a[1] * x + a[5] * y + a[9] * z + a[13];
        out[14] = a[2] * x + a[6] * y + a[10] * z + a[14];
        out[15] = a[3] * x + a[7] * y + a[11] * z + a[15];
    } else {
        a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
        a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
        a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

        out[0] = a00; out[1] = a01; out[2] = a02; out[3] = a03;
        out[4] = a10; out[5] = a11; out[6] = a12; out[7] = a13;
        out[8] = a20; out[9] = a21; out[10] = a22; out[11] = a23;

        out[12] = a00 * x + a10 * y + a20 * z + a[12];
        out[13] = a01 * x + a11 * y + a21 * z + a[13];
        out[14] = a02 * x + a12 * y + a22 * z + a[14];
        out[15] = a03 * x + a13 * y + a23 * z + a[15];
    }

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.SIMD.translate = function (out, a, v) {
    var a0 = SIMD.Float32x4.load(a, 0),
        a1 = SIMD.Float32x4.load(a, 4),
        a2 = SIMD.Float32x4.load(a, 8),
        a3 = SIMD.Float32x4.load(a, 12),
        vec = SIMD.Float32x4(v[0], v[1], v[2] , 0);

    if (a !== out) {
        out[0] = a[0]; out[1] = a[1]; out[2] = a[2]; out[3] = a[3];
        out[4] = a[4]; out[5] = a[5]; out[6] = a[6]; out[7] = a[7];
        out[8] = a[8]; out[9] = a[9]; out[10] = a[10]; out[11] = a[11];
    }

    a0 = SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0));
    a1 = SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1));
    a2 = SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2));

    var t0 = SIMD.Float32x4.add(a0, SIMD.Float32x4.add(a1, SIMD.Float32x4.add(a2, a3)));
    SIMD.Float32x4.store(out, 12, t0);

    return out;
};

/**
 * Translates a mat4 by the given vector using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to translate
 * @param {vec3} v vector to translate by
 * @returns {mat4} out
 */
mat4.translate = glMatrix.USE_SIMD ? mat4.SIMD.translate : mat4.scalar.translate;

/**
 * Scales the mat4 by the dimensions in the given vec3 not using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.scalar.scale = function(out, a, v) {
    var x = v[0], y = v[1], z = v[2];

    out[0] = a[0] * x;
    out[1] = a[1] * x;
    out[2] = a[2] * x;
    out[3] = a[3] * x;
    out[4] = a[4] * y;
    out[5] = a[5] * y;
    out[6] = a[6] * y;
    out[7] = a[7] * y;
    out[8] = a[8] * z;
    out[9] = a[9] * z;
    out[10] = a[10] * z;
    out[11] = a[11] * z;
    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using vectorization
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 **/
mat4.SIMD.scale = function(out, a, v) {
    var a0, a1, a2;
    var vec = SIMD.Float32x4(v[0], v[1], v[2], 0);

    a0 = SIMD.Float32x4.load(a, 0);
    SIMD.Float32x4.store(
        out, 0, SIMD.Float32x4.mul(a0, SIMD.Float32x4.swizzle(vec, 0, 0, 0, 0)));

    a1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(
        out, 4, SIMD.Float32x4.mul(a1, SIMD.Float32x4.swizzle(vec, 1, 1, 1, 1)));

    a2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(
        out, 8, SIMD.Float32x4.mul(a2, SIMD.Float32x4.swizzle(vec, 2, 2, 2, 2)));

    out[12] = a[12];
    out[13] = a[13];
    out[14] = a[14];
    out[15] = a[15];
    return out;
};

/**
 * Scales the mat4 by the dimensions in the given vec3 using SIMD if available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {vec3} v the vec3 to scale the matrix by
 * @returns {mat4} out
 */
mat4.scale = glMatrix.USE_SIMD ? mat4.SIMD.scale : mat4.scalar.scale;

/**
 * Rotates a mat4 by the given angle around the given axis
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.rotate = function (out, a, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t,
        a00, a01, a02, a03,
        a10, a11, a12, a13,
        a20, a21, a22, a23,
        b00, b01, b02,
        b10, b11, b12,
        b20, b21, b22;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    a00 = a[0]; a01 = a[1]; a02 = a[2]; a03 = a[3];
    a10 = a[4]; a11 = a[5]; a12 = a[6]; a13 = a[7];
    a20 = a[8]; a21 = a[9]; a22 = a[10]; a23 = a[11];

    // Construct the elements of the rotation matrix
    b00 = x * x * t + c; b01 = y * x * t + z * s; b02 = z * x * t - y * s;
    b10 = x * y * t - z * s; b11 = y * y * t + c; b12 = z * y * t + x * s;
    b20 = x * z * t + y * s; b21 = y * z * t - x * s; b22 = z * z * t + c;

    // Perform rotation-specific matrix multiplication
    out[0] = a00 * b00 + a10 * b01 + a20 * b02;
    out[1] = a01 * b00 + a11 * b01 + a21 * b02;
    out[2] = a02 * b00 + a12 * b01 + a22 * b02;
    out[3] = a03 * b00 + a13 * b01 + a23 * b02;
    out[4] = a00 * b10 + a10 * b11 + a20 * b12;
    out[5] = a01 * b10 + a11 * b11 + a21 * b12;
    out[6] = a02 * b10 + a12 * b11 + a22 * b12;
    out[7] = a03 * b10 + a13 * b11 + a23 * b12;
    out[8] = a00 * b20 + a10 * b21 + a20 * b22;
    out[9] = a01 * b20 + a11 * b21 + a21 * b22;
    out[10] = a02 * b20 + a12 * b21 + a22 * b22;
    out[11] = a03 * b20 + a13 * b21 + a23 * b22;

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateX = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[0]  = a[0];
        out[1]  = a[1];
        out[2]  = a[2];
        out[3]  = a[3];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[4] = a10 * c + a20 * s;
    out[5] = a11 * c + a21 * s;
    out[6] = a12 * c + a22 * s;
    out[7] = a13 * c + a23 * s;
    out[8] = a20 * c - a10 * s;
    out[9] = a21 * c - a11 * s;
    out[10] = a22 * c - a12 * s;
    out[11] = a23 * c - a13 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateX = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
      out[0]  = a[0];
      out[1]  = a[1];
      out[2]  = a[2];
      out[3]  = a[3];
      out[12] = a[12];
      out[13] = a[13];
      out[14] = a[14];
      out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_1 = SIMD.Float32x4.load(a, 4);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_2, c), SIMD.Float32x4.mul(a_1, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the X axis using SIMD if availabe and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.rotateX = glMatrix.USE_SIMD ? mat4.SIMD.rotateX : mat4.scalar.rotateX;

/**
 * Rotates a matrix by the given angle around the Y axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateY = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a20 = a[8],
        a21 = a[9],
        a22 = a[10],
        a23 = a[11];

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c - a20 * s;
    out[1] = a01 * c - a21 * s;
    out[2] = a02 * c - a22 * s;
    out[3] = a03 * c - a23 * s;
    out[8] = a00 * s + a20 * c;
    out[9] = a01 * s + a21 * c;
    out[10] = a02 * s + a22 * c;
    out[11] = a03 * s + a23 * c;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateY = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged rows
        out[4]  = a[4];
        out[5]  = a[5];
        out[6]  = a[6];
        out[7]  = a[7];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_2 = SIMD.Float32x4.load(a, 8);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_2, s)));
    SIMD.Float32x4.store(out, 8,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, s), SIMD.Float32x4.mul(a_2, c)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Y axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateY = glMatrix.USE_SIMD ? mat4.SIMD.rotateY : mat4.scalar.rotateY;

/**
 * Rotates a matrix by the given angle around the Z axis not using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.scalar.rotateZ = function (out, a, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad),
        a00 = a[0],
        a01 = a[1],
        a02 = a[2],
        a03 = a[3],
        a10 = a[4],
        a11 = a[5],
        a12 = a[6],
        a13 = a[7];

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    out[0] = a00 * c + a10 * s;
    out[1] = a01 * c + a11 * s;
    out[2] = a02 * c + a12 * s;
    out[3] = a03 * c + a13 * s;
    out[4] = a10 * c - a00 * s;
    out[5] = a11 * c - a01 * s;
    out[6] = a12 * c - a02 * s;
    out[7] = a13 * c - a03 * s;
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis using SIMD
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.SIMD.rotateZ = function (out, a, rad) {
    var s = SIMD.Float32x4.splat(Math.sin(rad)),
        c = SIMD.Float32x4.splat(Math.cos(rad));

    if (a !== out) { // If the source and destination differ, copy the unchanged last row
        out[8]  = a[8];
        out[9]  = a[9];
        out[10] = a[10];
        out[11] = a[11];
        out[12] = a[12];
        out[13] = a[13];
        out[14] = a[14];
        out[15] = a[15];
    }

    // Perform axis-specific matrix multiplication
    var a_0 = SIMD.Float32x4.load(a, 0);
    var a_1 = SIMD.Float32x4.load(a, 4);
    SIMD.Float32x4.store(out, 0,
                         SIMD.Float32x4.add(SIMD.Float32x4.mul(a_0, c), SIMD.Float32x4.mul(a_1, s)));
    SIMD.Float32x4.store(out, 4,
                         SIMD.Float32x4.sub(SIMD.Float32x4.mul(a_1, c), SIMD.Float32x4.mul(a_0, s)));
    return out;
};

/**
 * Rotates a matrix by the given angle around the Z axis if SIMD available and enabled
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
 mat4.rotateZ = glMatrix.USE_SIMD ? mat4.SIMD.rotateZ : mat4.scalar.rotateZ;

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.scale(dest, dest, vec);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {vec3} v Scaling vector
 * @returns {mat4} out
 */
mat4.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = v[1];
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = v[2];
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle around a given axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotate(dest, dest, rad, axis);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @param {vec3} axis the axis to rotate around
 * @returns {mat4} out
 */
mat4.fromRotation = function(out, rad, axis) {
    var x = axis[0], y = axis[1], z = axis[2],
        len = Math.sqrt(x * x + y * y + z * z),
        s, c, t;

    if (Math.abs(len) < glMatrix.EPSILON) { return null; }

    len = 1 / len;
    x *= len;
    y *= len;
    z *= len;

    s = Math.sin(rad);
    c = Math.cos(rad);
    t = 1 - c;

    // Perform rotation-specific matrix multiplication
    out[0] = x * x * t + c;
    out[1] = y * x * t + z * s;
    out[2] = z * x * t - y * s;
    out[3] = 0;
    out[4] = x * y * t - z * s;
    out[5] = y * y * t + c;
    out[6] = z * y * t + x * s;
    out[7] = 0;
    out[8] = x * z * t + y * s;
    out[9] = y * z * t - x * s;
    out[10] = z * z * t + c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the X axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateX(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromXRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = 1;
    out[1]  = 0;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = 0;
    out[5] = c;
    out[6] = s;
    out[7] = 0;
    out[8] = 0;
    out[9] = -s;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Y axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateY(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromYRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = 0;
    out[2]  = -s;
    out[3]  = 0;
    out[4] = 0;
    out[5] = 1;
    out[6] = 0;
    out[7] = 0;
    out[8] = s;
    out[9] = 0;
    out[10] = c;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from the given angle around the Z axis
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.rotateZ(dest, dest, rad);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat4} out
 */
mat4.fromZRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);

    // Perform axis-specific matrix multiplication
    out[0]  = c;
    out[1]  = s;
    out[2]  = 0;
    out[3]  = 0;
    out[4] = -s;
    out[5] = c;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 1;
    out[11] = 0;
    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;
    return out;
}

/**
 * Creates a matrix from a quaternion rotation and vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslation = function (out, q, v) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - (yy + zz);
    out[1] = xy + wz;
    out[2] = xz - wy;
    out[3] = 0;
    out[4] = xy - wz;
    out[5] = 1 - (xx + zz);
    out[6] = yz + wx;
    out[7] = 0;
    out[8] = xz + wy;
    out[9] = yz - wx;
    out[10] = 1 - (xx + yy);
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Returns the translation vector component of a transformation
 *  matrix. If a matrix is built with fromRotationTranslation,
 *  the returned vector will be the same as the translation vector
 *  originally supplied.
 * @param  {vec3} out Vector to receive translation component
 * @param  {mat4} mat Matrix to be decomposed (input)
 * @return {vec3} out
 */
mat4.getTranslation = function (out, mat) {
  out[0] = mat[12];
  out[1] = mat[13];
  out[2] = mat[14];

  return out;
};

/**
 * Returns a quaternion representing the rotational component
 *  of a transformation matrix. If a matrix is built with
 *  fromRotationTranslation, the returned quaternion will be the
 *  same as the quaternion originally supplied.
 * @param {quat} out Quaternion to receive the rotation component
 * @param {mat4} mat Matrix to be decomposed (input)
 * @return {quat} out
 */
mat4.getRotation = function (out, mat) {
  // Algorithm taken from http://www.euclideanspace.com/maths/geometry/rotations/conversions/matrixToQuaternion/index.htm
  var trace = mat[0] + mat[5] + mat[10];
  var S = 0;

  if (trace > 0) { 
    S = Math.sqrt(trace + 1.0) * 2;
    out[3] = 0.25 * S;
    out[0] = (mat[6] - mat[9]) / S;
    out[1] = (mat[8] - mat[2]) / S; 
    out[2] = (mat[1] - mat[4]) / S; 
  } else if ((mat[0] > mat[5])&(mat[0] > mat[10])) { 
    S = Math.sqrt(1.0 + mat[0] - mat[5] - mat[10]) * 2;
    out[3] = (mat[6] - mat[9]) / S;
    out[0] = 0.25 * S;
    out[1] = (mat[1] + mat[4]) / S; 
    out[2] = (mat[8] + mat[2]) / S; 
  } else if (mat[5] > mat[10]) { 
    S = Math.sqrt(1.0 + mat[5] - mat[0] - mat[10]) * 2;
    out[3] = (mat[8] - mat[2]) / S;
    out[0] = (mat[1] + mat[4]) / S; 
    out[1] = 0.25 * S;
    out[2] = (mat[6] + mat[9]) / S; 
  } else { 
    S = Math.sqrt(1.0 + mat[10] - mat[0] - mat[5]) * 2;
    out[3] = (mat[1] - mat[4]) / S;
    out[0] = (mat[8] + mat[2]) / S;
    out[1] = (mat[6] + mat[9]) / S;
    out[2] = 0.25 * S;
  }

  return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScale = function (out, q, v, s) {
    // Quaternion math
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        xy = x * y2,
        xz = x * z2,
        yy = y * y2,
        yz = y * z2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2,
        sx = s[0],
        sy = s[1],
        sz = s[2];

    out[0] = (1 - (yy + zz)) * sx;
    out[1] = (xy + wz) * sx;
    out[2] = (xz - wy) * sx;
    out[3] = 0;
    out[4] = (xy - wz) * sy;
    out[5] = (1 - (xx + zz)) * sy;
    out[6] = (yz + wx) * sy;
    out[7] = 0;
    out[8] = (xz + wy) * sz;
    out[9] = (yz - wx) * sz;
    out[10] = (1 - (xx + yy)) * sz;
    out[11] = 0;
    out[12] = v[0];
    out[13] = v[1];
    out[14] = v[2];
    out[15] = 1;

    return out;
};

/**
 * Creates a matrix from a quaternion rotation, vector translation and vector scale, rotating and scaling around the given origin
 * This is equivalent to (but much faster than):
 *
 *     mat4.identity(dest);
 *     mat4.translate(dest, vec);
 *     mat4.translate(dest, origin);
 *     var quatMat = mat4.create();
 *     quat4.toMat4(quat, quatMat);
 *     mat4.multiply(dest, quatMat);
 *     mat4.scale(dest, scale)
 *     mat4.translate(dest, negativeOrigin);
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat4} q Rotation quaternion
 * @param {vec3} v Translation vector
 * @param {vec3} s Scaling vector
 * @param {vec3} o The origin vector around which to scale and rotate
 * @returns {mat4} out
 */
mat4.fromRotationTranslationScaleOrigin = function (out, q, v, s, o) {
  // Quaternion math
  var x = q[0], y = q[1], z = q[2], w = q[3],
      x2 = x + x,
      y2 = y + y,
      z2 = z + z,

      xx = x * x2,
      xy = x * y2,
      xz = x * z2,
      yy = y * y2,
      yz = y * z2,
      zz = z * z2,
      wx = w * x2,
      wy = w * y2,
      wz = w * z2,

      sx = s[0],
      sy = s[1],
      sz = s[2],

      ox = o[0],
      oy = o[1],
      oz = o[2];

  out[0] = (1 - (yy + zz)) * sx;
  out[1] = (xy + wz) * sx;
  out[2] = (xz - wy) * sx;
  out[3] = 0;
  out[4] = (xy - wz) * sy;
  out[5] = (1 - (xx + zz)) * sy;
  out[6] = (yz + wx) * sy;
  out[7] = 0;
  out[8] = (xz + wy) * sz;
  out[9] = (yz - wx) * sz;
  out[10] = (1 - (xx + yy)) * sz;
  out[11] = 0;
  out[12] = v[0] + ox - (out[0] * ox + out[4] * oy + out[8] * oz);
  out[13] = v[1] + oy - (out[1] * ox + out[5] * oy + out[9] * oz);
  out[14] = v[2] + oz - (out[2] * ox + out[6] * oy + out[10] * oz);
  out[15] = 1;

  return out;
};

/**
 * Calculates a 4x4 matrix from the given quaternion
 *
 * @param {mat4} out mat4 receiving operation result
 * @param {quat} q Quaternion to create matrix from
 *
 * @returns {mat4} out
 */
mat4.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[1] = yx + wz;
    out[2] = zx - wy;
    out[3] = 0;

    out[4] = yx - wz;
    out[5] = 1 - xx - zz;
    out[6] = zy + wx;
    out[7] = 0;

    out[8] = zx + wy;
    out[9] = zy - wx;
    out[10] = 1 - xx - yy;
    out[11] = 0;

    out[12] = 0;
    out[13] = 0;
    out[14] = 0;
    out[15] = 1;

    return out;
};

/**
 * Generates a frustum matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Number} left Left bound of the frustum
 * @param {Number} right Right bound of the frustum
 * @param {Number} bottom Bottom bound of the frustum
 * @param {Number} top Top bound of the frustum
 * @param {Number} near Near bound of the frustum
 * @param {Number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.frustum = function (out, left, right, bottom, top, near, far) {
    var rl = 1 / (right - left),
        tb = 1 / (top - bottom),
        nf = 1 / (near - far);
    out[0] = (near * 2) * rl;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = (near * 2) * tb;
    out[6] = 0;
    out[7] = 0;
    out[8] = (right + left) * rl;
    out[9] = (top + bottom) * tb;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (far * near * 2) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} fovy Vertical field of view in radians
 * @param {number} aspect Aspect ratio. typically viewport width/height
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspective = function (out, fovy, aspect, near, far) {
    var f = 1.0 / Math.tan(fovy / 2),
        nf = 1 / (near - far);
    out[0] = f / aspect;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = f;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = (far + near) * nf;
    out[11] = -1;
    out[12] = 0;
    out[13] = 0;
    out[14] = (2 * far * near) * nf;
    out[15] = 0;
    return out;
};

/**
 * Generates a perspective projection matrix with the given field of view.
 * This is primarily useful for generating projection matrices to be used
 * with the still experiemental WebVR API.
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {Object} fov Object containing the following values: upDegrees, downDegrees, leftDegrees, rightDegrees
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.perspectiveFromFieldOfView = function (out, fov, near, far) {
    var upTan = Math.tan(fov.upDegrees * Math.PI/180.0),
        downTan = Math.tan(fov.downDegrees * Math.PI/180.0),
        leftTan = Math.tan(fov.leftDegrees * Math.PI/180.0),
        rightTan = Math.tan(fov.rightDegrees * Math.PI/180.0),
        xScale = 2.0 / (leftTan + rightTan),
        yScale = 2.0 / (upTan + downTan);

    out[0] = xScale;
    out[1] = 0.0;
    out[2] = 0.0;
    out[3] = 0.0;
    out[4] = 0.0;
    out[5] = yScale;
    out[6] = 0.0;
    out[7] = 0.0;
    out[8] = -((leftTan - rightTan) * xScale * 0.5);
    out[9] = ((upTan - downTan) * yScale * 0.5);
    out[10] = far / (near - far);
    out[11] = -1.0;
    out[12] = 0.0;
    out[13] = 0.0;
    out[14] = (far * near) / (near - far);
    out[15] = 0.0;
    return out;
}

/**
 * Generates a orthogonal projection matrix with the given bounds
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {number} left Left bound of the frustum
 * @param {number} right Right bound of the frustum
 * @param {number} bottom Bottom bound of the frustum
 * @param {number} top Top bound of the frustum
 * @param {number} near Near bound of the frustum
 * @param {number} far Far bound of the frustum
 * @returns {mat4} out
 */
mat4.ortho = function (out, left, right, bottom, top, near, far) {
    var lr = 1 / (left - right),
        bt = 1 / (bottom - top),
        nf = 1 / (near - far);
    out[0] = -2 * lr;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 0;
    out[5] = -2 * bt;
    out[6] = 0;
    out[7] = 0;
    out[8] = 0;
    out[9] = 0;
    out[10] = 2 * nf;
    out[11] = 0;
    out[12] = (left + right) * lr;
    out[13] = (top + bottom) * bt;
    out[14] = (far + near) * nf;
    out[15] = 1;
    return out;
};

/**
 * Generates a look-at matrix with the given eye position, focal point, and up axis
 *
 * @param {mat4} out mat4 frustum matrix will be written into
 * @param {vec3} eye Position of the viewer
 * @param {vec3} center Point the viewer is looking at
 * @param {vec3} up vec3 pointing up
 * @returns {mat4} out
 */
mat4.lookAt = function (out, eye, center, up) {
    var x0, x1, x2, y0, y1, y2, z0, z1, z2, len,
        eyex = eye[0],
        eyey = eye[1],
        eyez = eye[2],
        upx = up[0],
        upy = up[1],
        upz = up[2],
        centerx = center[0],
        centery = center[1],
        centerz = center[2];

    if (Math.abs(eyex - centerx) < glMatrix.EPSILON &&
        Math.abs(eyey - centery) < glMatrix.EPSILON &&
        Math.abs(eyez - centerz) < glMatrix.EPSILON) {
        return mat4.identity(out);
    }

    z0 = eyex - centerx;
    z1 = eyey - centery;
    z2 = eyez - centerz;

    len = 1 / Math.sqrt(z0 * z0 + z1 * z1 + z2 * z2);
    z0 *= len;
    z1 *= len;
    z2 *= len;

    x0 = upy * z2 - upz * z1;
    x1 = upz * z0 - upx * z2;
    x2 = upx * z1 - upy * z0;
    len = Math.sqrt(x0 * x0 + x1 * x1 + x2 * x2);
    if (!len) {
        x0 = 0;
        x1 = 0;
        x2 = 0;
    } else {
        len = 1 / len;
        x0 *= len;
        x1 *= len;
        x2 *= len;
    }

    y0 = z1 * x2 - z2 * x1;
    y1 = z2 * x0 - z0 * x2;
    y2 = z0 * x1 - z1 * x0;

    len = Math.sqrt(y0 * y0 + y1 * y1 + y2 * y2);
    if (!len) {
        y0 = 0;
        y1 = 0;
        y2 = 0;
    } else {
        len = 1 / len;
        y0 *= len;
        y1 *= len;
        y2 *= len;
    }

    out[0] = x0;
    out[1] = y0;
    out[2] = z0;
    out[3] = 0;
    out[4] = x1;
    out[5] = y1;
    out[6] = z1;
    out[7] = 0;
    out[8] = x2;
    out[9] = y2;
    out[10] = z2;
    out[11] = 0;
    out[12] = -(x0 * eyex + x1 * eyey + x2 * eyez);
    out[13] = -(y0 * eyex + y1 * eyey + y2 * eyez);
    out[14] = -(z0 * eyex + z1 * eyey + z2 * eyez);
    out[15] = 1;

    return out;
};

/**
 * Returns a string representation of a mat4
 *
 * @param {mat4} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat4.str = function (a) {
    return 'mat4(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ', ' +
                    a[4] + ', ' + a[5] + ', ' + a[6] + ', ' + a[7] + ', ' +
                    a[8] + ', ' + a[9] + ', ' + a[10] + ', ' + a[11] + ', ' +
                    a[12] + ', ' + a[13] + ', ' + a[14] + ', ' + a[15] + ')';
};

/**
 * Returns Frobenius norm of a mat4
 *
 * @param {mat4} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat4.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2) + Math.pow(a[9], 2) + Math.pow(a[10], 2) + Math.pow(a[11], 2) + Math.pow(a[12], 2) + Math.pow(a[13], 2) + Math.pow(a[14], 2) + Math.pow(a[15], 2) ))
};

/**
 * Adds two mat4's
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    out[9] = a[9] + b[9];
    out[10] = a[10] + b[10];
    out[11] = a[11] + b[11];
    out[12] = a[12] + b[12];
    out[13] = a[13] + b[13];
    out[14] = a[14] + b[14];
    out[15] = a[15] + b[15];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @returns {mat4} out
 */
mat4.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    out[9] = a[9] - b[9];
    out[10] = a[10] - b[10];
    out[11] = a[11] - b[11];
    out[12] = a[12] - b[12];
    out[13] = a[13] - b[13];
    out[14] = a[14] - b[14];
    out[15] = a[15] - b[15];
    return out;
};

/**
 * Alias for {@link mat4.subtract}
 * @function
 */
mat4.sub = mat4.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat4} out the receiving matrix
 * @param {mat4} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat4} out
 */
mat4.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    out[9] = a[9] * b;
    out[10] = a[10] * b;
    out[11] = a[11] * b;
    out[12] = a[12] * b;
    out[13] = a[13] * b;
    out[14] = a[14] * b;
    out[15] = a[15] * b;
    return out;
};

/**
 * Adds two mat4's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat4} out the receiving vector
 * @param {mat4} a the first operand
 * @param {mat4} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat4} out
 */
mat4.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    out[9] = a[9] + (b[9] * scale);
    out[10] = a[10] + (b[10] * scale);
    out[11] = a[11] + (b[11] * scale);
    out[12] = a[12] + (b[12] * scale);
    out[13] = a[13] + (b[13] * scale);
    out[14] = a[14] + (b[14] * scale);
    out[15] = a[15] + (b[15] * scale);
    return out;
};

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3] && 
           a[4] === b[4] && a[5] === b[5] && a[6] === b[6] && a[7] === b[7] && 
           a[8] === b[8] && a[9] === b[9] && a[10] === b[10] && a[11] === b[11] &&
           a[12] === b[12] && a[13] === b[13] && a[14] === b[14] && a[15] === b[15];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat4} a The first matrix.
 * @param {mat4} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat4.equals = function (a, b) {
    var a0  = a[0],  a1  = a[1],  a2  = a[2],  a3  = a[3],
        a4  = a[4],  a5  = a[5],  a6  = a[6],  a7  = a[7], 
        a8  = a[8],  a9  = a[9],  a10 = a[10], a11 = a[11], 
        a12 = a[12], a13 = a[13], a14 = a[14], a15 = a[15];

    var b0  = b[0],  b1  = b[1],  b2  = b[2],  b3  = b[3],
        b4  = b[4],  b5  = b[5],  b6  = b[6],  b7  = b[7], 
        b8  = b[8],  b9  = b[9],  b10 = b[10], b11 = b[11], 
        b12 = b[12], b13 = b[13], b14 = b[14], b15 = b[15];

    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)) &&
            Math.abs(a9 - b9) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a9), Math.abs(b9)) &&
            Math.abs(a10 - b10) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a10), Math.abs(b10)) &&
            Math.abs(a11 - b11) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a11), Math.abs(b11)) &&
            Math.abs(a12 - b12) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a12), Math.abs(b12)) &&
            Math.abs(a13 - b13) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a13), Math.abs(b13)) &&
            Math.abs(a14 - b14) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a14), Math.abs(b14)) &&
            Math.abs(a15 - b15) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a15), Math.abs(b15)));
};



module.exports = mat4;


/***/ }),
/* 26 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class to play audio at specific points during gameplay
 *
 * This is a very basic implementaion which is limited to one sound effect at a time.
 * It is possible to enhance this class to provide multi-track playback.
 * @extends {GameObject}
 */
var AudioSystem = function (_GameObject) {
    _inherits(AudioSystem, _GameObject);

    function AudioSystem() {
        _classCallCheck(this, AudioSystem);

        return _possibleConstructorReturn(this, (AudioSystem.__proto__ || Object.getPrototypeOf(AudioSystem)).call(this));

        // this.context = new AudioContext();
    }

    /**
     * Queue a sound to be played at the start of the next frame
     * @param {object} res - Audio "texture" containing Audio resource
     */


    _createClass(AudioSystem, [{
        key: 'playSound',
        value: function playSound(res) {
            // Real implementation should add audio to queue to play at start of next frame etc.
            if (res.audio) {
                res.audio.play();
            }
        }
    }]);

    return AudioSystem;
}(_GameObject3.default);

exports.default = AudioSystem;

/***/ }),
/* 27 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.RotationAnimationComponent = exports.ColorAnimationComponent = exports.BoundsAnimationComponent = exports.PositionAnimationComponent = exports.PropertyAnimationComponent = undefined;

var _PropertyAnimationComponent = __webpack_require__(3);

var _PropertyAnimationComponent2 = _interopRequireDefault(_PropertyAnimationComponent);

var _PositionAnimationComponent = __webpack_require__(37);

var _PositionAnimationComponent2 = _interopRequireDefault(_PositionAnimationComponent);

var _BoundsAnimationComponent = __webpack_require__(35);

var _BoundsAnimationComponent2 = _interopRequireDefault(_BoundsAnimationComponent);

var _ColorAnimationComponent = __webpack_require__(36);

var _ColorAnimationComponent2 = _interopRequireDefault(_ColorAnimationComponent);

var _RotationAnimationComponent = __webpack_require__(38);

var _RotationAnimationComponent2 = _interopRequireDefault(_RotationAnimationComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.PropertyAnimationComponent = _PropertyAnimationComponent2.default;
exports.PositionAnimationComponent = _PositionAnimationComponent2.default;
exports.BoundsAnimationComponent = _BoundsAnimationComponent2.default;
exports.ColorAnimationComponent = _ColorAnimationComponent2.default;
exports.RotationAnimationComponent = _RotationAnimationComponent2.default;

/***/ }),
/* 28 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _MoveComponent = __webpack_require__(41);

Object.defineProperty(exports, 'MoveComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_MoveComponent).default;
  }
});

var _PhysicsComponent = __webpack_require__(42);

Object.defineProperty(exports, 'PhysicsComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PhysicsComponent).default;
  }
});

var _GravityComponent = __webpack_require__(40);

Object.defineProperty(exports, 'GravityComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GravityComponent).default;
  }
});

var _PointGravityComponent = __webpack_require__(43);

Object.defineProperty(exports, 'PointGravityComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PointGravityComponent).default;
  }
});

var _TerminalVelocityComponent = __webpack_require__(52);

Object.defineProperty(exports, 'TerminalVelocityComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TerminalVelocityComponent).default;
  }
});

var _FollowComponent = __webpack_require__(39);

Object.defineProperty(exports, 'FollowComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FollowComponent).default;
  }
});

var _RotationComponent = __webpack_require__(49);

Object.defineProperty(exports, 'RotationComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RotationComponent).default;
  }
});

var _RotateToHeadingComponent = __webpack_require__(48);

Object.defineProperty(exports, 'RotateToHeadingComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RotateToHeadingComponent).default;
  }
});

var _TrackRotationComponent = __webpack_require__(53);

Object.defineProperty(exports, 'TrackRotationComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TrackRotationComponent).default;
  }
});

var _RandomPositionComponent = __webpack_require__(46);

Object.defineProperty(exports, 'RandomPositionComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RandomPositionComponent).default;
  }
});

var _RandomVelocityComponent = __webpack_require__(47);

Object.defineProperty(exports, 'RandomVelocityComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RandomVelocityComponent).default;
  }
});

var _RandomImpulseComponent = __webpack_require__(45);

Object.defineProperty(exports, 'RandomImpulseComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RandomImpulseComponent).default;
  }
});

var _FlockingComponent = __webpack_require__(24);

Object.defineProperty(exports, 'FlockingComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_FlockingComponent).default;
  }
});

var _SwitchComponent = __webpack_require__(51);

Object.defineProperty(exports, 'SwitchComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SwitchComponent).default;
  }
});

var _PositionInterpolatorComponent = __webpack_require__(44);

Object.defineProperty(exports, 'PositionInterpolatorComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PositionInterpolatorComponent).default;
  }
});

var _RotationInterpolatorComponent = __webpack_require__(50);

Object.defineProperty(exports, 'RotationInterpolatorComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RotationInterpolatorComponent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 29 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CollisionSystem = __webpack_require__(55);

Object.defineProperty(exports, 'CollisionSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CollisionSystem).default;
  }
});

var _CollisionComponent = __webpack_require__(14);

Object.defineProperty(exports, 'CollisionComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CollisionComponent).default;
  }
});

var _BounceComponent = __webpack_require__(13);

Object.defineProperty(exports, 'BounceComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BounceComponent).default;
  }
});

var _BackgroundCollisionSystem = __webpack_require__(54);

Object.defineProperty(exports, 'BackgroundCollisionSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BackgroundCollisionSystem).default;
  }
});

var _BackgroundCollisionComponent = __webpack_require__(12);

Object.defineProperty(exports, 'BackgroundCollisionComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_BackgroundCollisionComponent).default;
  }
});

var _SolidComponent = __webpack_require__(15);

Object.defineProperty(exports, 'SolidComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_SolidComponent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 30 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject = __webpack_require__(2);

var _GameObject2 = _interopRequireDefault(_GameObject);

var _GameObjectManager = __webpack_require__(16);

var _GameObjectManager2 = _interopRequireDefault(_GameObjectManager);

var _GameComponent = __webpack_require__(0);

var _GameComponent2 = _interopRequireDefault(_GameComponent);

var _CameraSystem = __webpack_require__(11);

var _CameraSystem2 = _interopRequireDefault(_CameraSystem);

var _CanvasRenderSystem = __webpack_require__(7);

var _CanvasRenderSystem2 = _interopRequireDefault(_CanvasRenderSystem);

var _WorldSystem = __webpack_require__(8);

var _WorldSystem2 = _interopRequireDefault(_WorldSystem);

var _InputSystem = __webpack_require__(6);

var _InputSystem2 = _interopRequireDefault(_InputSystem);

var _util = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STATE_PAUSED = 0;
var STATE_PLAYING = 1;
var STATE_STOPPED = 2;
var STATE_DEAD = 3;

var _lastTime = 0;
var _raf = typeof window !== "undefined" && window.requestAnimationFrame || function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - _lastTime));
    var id = setTimeout(function () {
        callback(currTime + timeToCall);
    }, timeToCall);
    _lastTime = currTime + timeToCall;
    return id;
};

/**
 * Utility class for things such as bootstrapping.
 *
 * <p>Providing width and height in options object as well as a canvas will set
 * the intrinsic rendering size of the canvas.
 * @param {object} options
 * @param {HTMLCanvasElement} options.canvas - HTML5 <code>&lt;canvas></code> element
 * @param {number} options.width - Render width.
 * @param {number} options.height - Render height.
 * @param {boolean} options.autosize - Whether or not to resize the world with the canvas.
 * @param {number} options.score - Initial score
 * @param {number} options.level - Initial level
 * @param {number} options.lives - Initial lives
 */

var Game = function () {
    function Game() {
        var _this = this;

        var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

        _classCallCheck(this, Game);

        /**
         * Canvas this game will render to.
         * @type {HTMLCanvasElement}
         */
        this.canvas = options.canvas;

        /**
         * Width of game canvas. Use {@link Game#setSize} to change.
         * Explicit width takes priority.
         * @readonly
         */
        this.width = options.width || this.canvas && this.canvas.width || 0;

        /**
         * Height of game canvas. Use {@link Game#setSize} to change.
         * Explicit height takes priority.
         * @readonly
         */
        this.height = options.height || this.canvas && this.canvas.height || 0;

        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }

        // Init some properties

        /** The root {@link GameObject} from which the object tree grows. This is the
         * input point for the loop to inject the time delta. All objects wanting updated
         * need to be a child or grandchild of this object.
         * @type {GameObject}
         */
        this.root = new _GameObjectManager2.default();

        this.textures = [];
        this.sounds = [];

        /**
         * Counter of how many frames have been rendered so far.
         * @type {number}
         */
        this.frame = 0;

        /**
         * Current game time in milliseconds.
         * @type {number}
         */
        this.time = 0;

        /**
         * Keeps track of an arbritary score.
         * @type {number}
         */
        this.score = options.score || 0;

        /**
         * Keeps track of an arbritary number of lives.
         * @type {number}
         */
        this.lives = options.lives || 0;

        /**
         * Tracks what level the game is running. Don't change this directly use
         * {@link Game#setLevel} instead.
         * @readonly
         * @type {number}
         */
        this.level = options.level || 0;

        /**
         * Number of resources currently pending.
         * @private
         * */
        this._toLoad = 0;

        this._lastTime = 0;
        this._loaded = 0;

        this._autosizeCallback = function () {

            if (!_this.canvas) return;

            var width = _this.canvas.offsetWidth;
            var height = _this.canvas.offsetHeight;

            _this.setSize(width, height);

            // Keep Camera centred
            if (_this.cameraSystem) {
                _this.cameraSystem.setPosition(width / 2, height / 2);
            }

            // Update bounds of the world
            // WARN: Does not retain previous world 'padding'
            if (_this.worldSystem) {
                _this.worldSystem.setBounds(0, 0, width, height);
            }
        };

        if (options.autosize) {
            this.setAutosize(true);
        }
    }

    /**
     * Replace the canvas of this game.
     *
     * <p>If there is a height and width set the new canvas will be intialised with them.
     *
     * <p>If height and width are unset they will be taken from the canvas size.
     * @param {HTMLCanvasElement} canvas - New canvas
     */


    _createClass(Game, [{
        key: 'setCanvas',
        value: function setCanvas(canvas) {
            this.canvas = canvas;

            if (this.canvas) {
                this.width = this.width || this.canvas.width;
                this.height = this.height || this.canvas.height;

                this.canvas.width = this.width;
                this.canvas.height = this.height;
            }
        }

        /**
         * @typedef {object} Texture
         * @property {Image} image - HTML <code>&ltimage></code> Element
         * @property {number} width - Natural width of image
         * @property {number} height - Natural height of image
         * @property {boolean} loaded - If image has loaded width and height properties should be available.
         */

        /**
         * Provide an array of urls pointing to image resources and they will be loaded.
         *
         * <p>The return value of this method is a mapped array of texture objects.
         * @param {string[]} texturePaths - Array of urls
         * @return {Texture[]}
         */

    }, {
        key: 'loadTextures',
        value: function loadTextures(texturePaths) {
            this._toLoad += texturePaths.length;
            var self = this;
            return texturePaths.map(function (path) {
                var texture = {
                    image: new Image(),
                    width: 0,
                    height: 0,
                    loaded: false
                };
                texture.image.onload = function () {
                    texture.width = texture.image.width;
                    texture.height = texture.image.height;
                    texture.loaded = true;
                    _resourceLoaded(self, texture);
                };
                texture.image.onerror = function () {
                    throw new Error("Failed to load a texture: " + path);
                };
                texture.image.src = path;
                self.textures.push(texture);
                return texture;
            });
        }

        /**
         * @typedef {object} AudioTexture
         * @property {Audio} audio - HTML <code>&lt;audio></code> element
         * @property {number} length - Total length of audio
         * @property {boolean} loaded - If loaded is <code>true</code> length should be available.
         */

        /**
         * Provide an array of urls pointing to audio resources and they will be loaded.
         *
         * <p>The return value of this method is a mapped array of 'audio texture' objects.
         * @param {string[]} texturePaths - Array of urls
         * @return {AudioTexture[]}
         */

    }, {
        key: 'loadAudio',
        value: function loadAudio(audioPaths) {
            this._toLoad += audioPaths.length;
            var self = this;
            return audioPaths.map(function (path) {
                var sound = {
                    audio: new Audio(),
                    length: 0,
                    laoded: false
                };
                sound.audio.addEventListener("canplaythrough", function () {
                    if (!sound.loaded) {
                        sound.length = sound.audio.duration;
                        sound.loaded = true;
                        _resourceLoaded(self, sound);
                    }
                });
                sound.audio.onerror = function () {
                    throw new Error("Failed to load a sound: " + path);
                };
                sound.audio.src = path;
                self.sounds.push(sound);
                return sound;
            });
        }

        /**
         * Start the loop.
         */

    }, {
        key: 'start',
        value: function start() {
            this.nextLevel();

            this.state = STATE_PLAYING;

            _loop(this);
        }

        /**
         * Stop the loop after the current frame.
         */

    }, {
        key: 'stop',
        value: function stop() {
            this.state = STATE_STOPPED;
        }

        /**
         * Generate a default {@link CameraSystem} based on properties of this game
         * @return {CameraSystem}
         */

    }, {
        key: 'getDefaultCamera',
        value: function getDefaultCamera() {
            if (!this.cameraSystem) {
                this.cameraSystem = new _CameraSystem2.default();
                this.cameraSystem.setPosition(this.width / 2, this.height / 2);
            }
            return this.cameraSystem;
        }

        /**
         * <p>Generate a default {@link CanvasRenderSystem} based on properties set on
         * this game instance.
         * @return {CanvasRenderSystem}
         */

    }, {
        key: 'getDefaultRenderer',
        value: function getDefaultRenderer() {
            if (!this.renderSystem) {
                if (!this.cameraSystem) {
                    this.getDefaultCamera();
                }

                var context = void 0;

                if (this.canvas) context = this.canvas.getContext("2d");

                this.renderSystem = new _CanvasRenderSystem2.default(context, this.cameraSystem);
            }
            return this.renderSystem;
        }

        /**
         * <p>Generate a default {@link WorldSystem} based on properties set on
         * this game instance.
         * @param {number} paddingX - (optional) Additional padding outside of canvas size. Default: 0
         * @param {number} paddingY - (optional) Additional padding outside of canvas size. Default: same as paddingX
         * @return {WorldSystem}
         */

    }, {
        key: 'getDefaultWorld',
        value: function getDefaultWorld() {
            var paddingX = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
            var paddingY = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : paddingX;

            var bounds = [-paddingX, -paddingY, this.width + paddingX, this.height + paddingY];
            if (!this.worldSystem) {
                this.worldSystem = new _WorldSystem2.default(bounds);
            } else {
                var _worldSystem;

                (_worldSystem = this.worldSystem).setBounds.apply(_worldSystem, bounds);
            }
            return this.worldSystem;
        }

        /**
         * <p>Generate a default {@link InputSystem} based on properties set on
         * this game instance.
         * @return {InputSystem}
         */

    }, {
        key: 'getDefaultInput',
        value: function getDefaultInput() {
            if (!this.inputSystem) {
                if (!this.cameraSystem) {
                    this.getDefaultCamera();
                }
                // params are: (screen, keyboard, camera)
                this.inputSystem = new _InputSystem2.default(this.canvas, typeof document !== "undefined" && document, this.cameraSystem);
            }
            return this.inputSystem;
        }

        /** Specify a new score
         * @param {number} score - New score.
         */

    }, {
        key: 'setScore',
        value: function setScore(score) {
            this.score = score;
            this.fire("score", this.score);
        }

        /** Move to the next level */

    }, {
        key: 'nextLevel',
        value: function nextLevel() {
            this.level++;
            this.fire("loadLevel", this.level);
        }

        /** Specify a level to jump to.
         * @param {number} level - Level number to jump to.
         */

    }, {
        key: 'setLevel',
        value: function setLevel(level) {
            this.level = level;
            this.fire("loadLevel", this.level);
        }

        /**
         * <p>Send an event notifiying listeners that the level has been completed.
         * <p>This does not automatically move to the next level.
         */

    }, {
        key: 'completeLevel',
        value: function completeLevel() {
            this.fire("levelComplete", this.level);
        }

        /**
         * Set the size of the game. This will also set the canvas size.
         * @param {number} width - Size in pixels
         * @param {number} height - Size in pixels
         */

    }, {
        key: 'setSize',
        value: function setSize(width, height) {
            this.width = width;
            this.height = height;

            if (this.canvas) {
                this.canvas.width = width;
                this.canvas.height = height;
            }
        }

        /**
         * Set whether or not to update the world dimensions with changes to the canvas dimensions.
         * @param {boolean} enable
         */

    }, {
        key: 'setAutosize',
        value: function setAutosize(enable) {
            if (enable) {
                window.addEventListener("resize", this._autosizeCallback);
            } else {
                window.removeEventListener("resize", this._autosizeCallback);
            }
        }
    }]);

    return Game;
}();

exports.default = Game;


(0, _util.eventMixin)(Game);

// Export constants
Game.STATE_PAUSED = STATE_PAUSED;
Game.STATE_PLAYING = STATE_PLAYING;
Game.STATE_STOPPED = STATE_STOPPED;
Game.STATE_DEAD = STATE_DEAD;

function _loop(self) {

    loop(self._lastTime);

    function loop(time) {
        if (time && self.time == time) {
            console.log("Multiple calls: " + time);
            return;
        }
        self.time = time;
        self.frame++;
        try {
            self.root.update(Math.min(time - self._lastTime, 100));

            if (self.state == STATE_PLAYING) {
                _raf(loop);
            }
            self._lastTime = time;
        } catch (e) {
            if (window.console) {
                console.error(e.stack || e);
            }
        }
    }
}

function _resourceLoaded(self, resource) {
    self._loaded++;
    self.fire("resourcesProgress", self._loaded / self._toLoad);
    if (self._toLoad - self._loaded <= 0) {
        self.fire("resourcesLoaded");
    }
};

/***/ }),
/* 31 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _DebugDrawBoundsComponent = __webpack_require__(56);

Object.defineProperty(exports, 'DebugDrawBoundsComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DebugDrawBoundsComponent).default;
  }
});

var _DebugDrawPathComponent = __webpack_require__(57);

Object.defineProperty(exports, 'DebugDrawPathComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DebugDrawPathComponent).default;
  }
});

var _DebugDrawSurfacesComponent = __webpack_require__(58);

Object.defineProperty(exports, 'DebugDrawSurfacesComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DebugDrawSurfacesComponent).default;
  }
});

var _DebugFlockingComponent = __webpack_require__(59);

Object.defineProperty(exports, 'DebugFlockingComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DebugFlockingComponent).default;
  }
});

var _PositionRenderComponent = __webpack_require__(60);

Object.defineProperty(exports, 'PositionRenderComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PositionRenderComponent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 32 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _InputSystem = __webpack_require__(6);

Object.defineProperty(exports, 'InputSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InputSystem).default;
  }
});

var _ClickComponent = __webpack_require__(17);

Object.defineProperty(exports, 'ClickComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_ClickComponent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 33 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CanvasRenderSystem = __webpack_require__(7);

Object.defineProperty(exports, 'CanvasRenderSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CanvasRenderSystem).default;
  }
});

var _DotRenderComponent = __webpack_require__(18);

Object.defineProperty(exports, 'DotRenderComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_DotRenderComponent).default;
  }
});

var _RectangleRenderComponent = __webpack_require__(19);

Object.defineProperty(exports, 'RectangleRenderComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_RectangleRenderComponent).default;
  }
});

var _TextRenderComponent = __webpack_require__(20);

Object.defineProperty(exports, 'TextRenderComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_TextRenderComponent).default;
  }
});

var _WebGLRenderSystem = __webpack_require__(21);

Object.defineProperty(exports, 'WebGLRenderSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WebGLRenderSystem).default;
  }
});

var _PolyShapeRenderComponent = __webpack_require__(61);

Object.defineProperty(exports, 'PolyShapeRenderComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_PolyShapeRenderComponent).default;
  }
});

var _sprite = __webpack_require__(62);

Object.keys(_sprite).forEach(function (key) {
  if (key === "default" || key === "__esModule") return;
  Object.defineProperty(exports, key, {
    enumerable: true,
    get: function get() {
      return _sprite[key];
    }
  });
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 34 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _WorldSystem = __webpack_require__(8);

Object.defineProperty(exports, 'WorldSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WorldSystem).default;
  }
});

var _WorldBounceComponent = __webpack_require__(22);

Object.defineProperty(exports, 'WorldBounceComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WorldBounceComponent).default;
  }
});

var _WorldWrapComponent = __webpack_require__(23);

Object.defineProperty(exports, 'WorldWrapComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WorldWrapComponent).default;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/***/ }),
/* 35 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PropertyAnimationComponent = __webpack_require__(3);

var _PropertyAnimationComponent2 = _interopRequireDefault(_PropertyAnimationComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var boundsFormatter = function boundsFormatter(parent, out) {
  parent.setBounds.apply(parent, _toConsumableArray(out));
};

var BoundsAnimationComponent = function (_PropertyAnimationCom) {
  _inherits(BoundsAnimationComponent, _PropertyAnimationCom);

  function BoundsAnimationComponent(start, end) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _classCallCheck(this, BoundsAnimationComponent);

    return _possibleConstructorReturn(this, (BoundsAnimationComponent.__proto__ || Object.getPrototypeOf(BoundsAnimationComponent)).call(this, boundsFormatter, start, end, duration, easing));
  }

  return BoundsAnimationComponent;
}(_PropertyAnimationComponent2.default);

exports.default = BoundsAnimationComponent;

/***/ }),
/* 36 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PropertyAnimationComponent = __webpack_require__(3);

var _PropertyAnimationComponent2 = _interopRequireDefault(_PropertyAnimationComponent);

var _util = __webpack_require__(9);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function colorFormatter(parent, color) {
  parent.color = 'rgba(' + (color[0] | 0) + ', ' + (color[1] | 0) + ', ' + (color[2] | 0) + ', ' + color[3] + ')';
}

var ColorAnimationComponent = function (_PropertyAnimationCom) {
  _inherits(ColorAnimationComponent, _PropertyAnimationCom);

  function ColorAnimationComponent(start, end) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _classCallCheck(this, ColorAnimationComponent);

    return _possibleConstructorReturn(this, (ColorAnimationComponent.__proto__ || Object.getPrototypeOf(ColorAnimationComponent)).call(this, colorFormatter, (0, _util.parseColor)(start), (0, _util.parseColor)(end), duration, easing));
  }

  return ColorAnimationComponent;
}(_PropertyAnimationComponent2.default);

exports.default = ColorAnimationComponent;

/***/ }),
/* 37 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _PropertyAnimationComponent = __webpack_require__(3);

var _PropertyAnimationComponent2 = _interopRequireDefault(_PropertyAnimationComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var positionFormatter = function positionFormatter(parent, out) {
  parent.setPosition.apply(parent, _toConsumableArray(out));
};

var PositionAnimationComponent = function (_PropertyAnimationCom) {
  _inherits(PositionAnimationComponent, _PropertyAnimationCom);

  function PositionAnimationComponent(start, end) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;

    _classCallCheck(this, PositionAnimationComponent);

    return _possibleConstructorReturn(this, (PositionAnimationComponent.__proto__ || Object.getPrototypeOf(PositionAnimationComponent)).call(this, positionFormatter, start, end, duration, easing));
  }

  return PositionAnimationComponent;
}(_PropertyAnimationComponent2.default);

exports.default = PositionAnimationComponent;

/***/ }),
/* 38 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _PropertyAnimationComponent = __webpack_require__(3);

var _PropertyAnimationComponent2 = _interopRequireDefault(_PropertyAnimationComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var rotationFormatter = function rotationFormatter(parent, out) {
  parent.setRotation(out[0]);
};

var RotationAnimationComponent = function (_PropertyAnimationCom) {
  _inherits(RotationAnimationComponent, _PropertyAnimationCom);

  function RotationAnimationComponent(start, end) {
    var duration = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
    var easing = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : undefined;
    var loop = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : undefined;

    _classCallCheck(this, RotationAnimationComponent);

    return _possibleConstructorReturn(this, (RotationAnimationComponent.__proto__ || Object.getPrototypeOf(RotationAnimationComponent)).call(this, rotationFormatter, start, end, duration, easing, loop));
  }

  _createClass(RotationAnimationComponent, [{
    key: 'update',
    value: function update(parent, delta) {
      this.end[0] = this.rotation;

      _get(RotationAnimationComponent.prototype.__proto__ || Object.getPrototypeOf(RotationAnimationComponent.prototype), 'update', this).call(this, parent, delta);
    }
  }, {
    key: 'setRotation',
    value: function setRotation(rotation) {
      this.start[0] = this.rotation;
      this.end[0] = rotation;

      this.reset();

      _get(RotationAnimationComponent.prototype.__proto__ || Object.getPrototypeOf(RotationAnimationComponent.prototype), 'setRotation', this).call(this, rotation);
    }
  }]);

  return RotationAnimationComponent;
}(_PropertyAnimationComponent2.default);

exports.default = RotationAnimationComponent;

/***/ }),
/* 39 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Track another object's position
 * Also works like old FollowAtDistnaceComponent by setting a position on this component
 * @param {GameObject} object - Target object to follow
 */
var FollowComponent = function (_GameComponent) {
    _inherits(FollowComponent, _GameComponent);

    function FollowComponent(object) {
        _classCallCheck(this, FollowComponent);

        var _this = _possibleConstructorReturn(this, (FollowComponent.__proto__ || Object.getPrototypeOf(FollowComponent)).call(this));

        _this.target = object;
        return _this;
    }

    _createClass(FollowComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            _vec2.default.add(parent.position, this.target.position, this.position);
        }
    }, {
        key: 'setTarget',
        value: function setTarget(object) {
            this.target = object;
        }
    }]);

    return FollowComponent;
}(_GameComponent3.default);

exports.default = FollowComponent;

/***/ }),
/* 40 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Objects with this component will fall to the floor.
 * @extends {GameComponent}
 * @memberof Behaviour
 */
var GravityComponent = function (_GameComponent) {
    _inherits(GravityComponent, _GameComponent);

    function GravityComponent() {
        _classCallCheck(this, GravityComponent);

        return _possibleConstructorReturn(this, (GravityComponent.__proto__ || Object.getPrototypeOf(GravityComponent)).apply(this, arguments));
    }

    _createClass(GravityComponent, [{
        key: "update",
        value: function update(parent, delta) {
            if (typeof parent.velocity[1] == "undefined") parent.velocity[1] = 0;
            parent.velocity[1] += GravityComponent.GRAVITATIONAL_CONSTANT * delta;
        }
    }]);

    return GravityComponent;
}(_GameComponent3.default);

exports.default = GravityComponent;

/** Gravitational Constant is the acceleration object will head towards the ground with. */

GravityComponent.GRAVITATIONAL_CONSTANT = 0.0003;

/***/ }),
/* 41 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Objects cannot move without this component.
 * @extends {GameComponent}
 */
var MoveComponent = function (_GameComponent) {
    _inherits(MoveComponent, _GameComponent);

    function MoveComponent() {
        _classCallCheck(this, MoveComponent);

        return _possibleConstructorReturn(this, (MoveComponent.__proto__ || Object.getPrototypeOf(MoveComponent)).apply(this, arguments));
    }

    _createClass(MoveComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            _vec2.default.scaleAndAdd(parent.position, parent.position, parent.velocity, delta);
        }
    }]);

    return MoveComponent;
}(_GameComponent3.default);

exports.default = MoveComponent;

/***/ }),
/* 42 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * This component allows objects to respond to impulses.
 *
 * @example <caption>If parent has an impulse vector its contents will be added to the velocity.</caption>
 * // Apply impulse of 0.05 pixels per second in direction of x-axis
 * vec3.set(gameObject.impulse, 0.05, 0, 0);
 * @extends {GameComponent}
 */
var PhysicsComponent = function (_GameComponent) {
    _inherits(PhysicsComponent, _GameComponent);

    function PhysicsComponent() {
        _classCallCheck(this, PhysicsComponent);

        return _possibleConstructorReturn(this, (PhysicsComponent.__proto__ || Object.getPrototypeOf(PhysicsComponent)).apply(this, arguments));
    }

    _createClass(PhysicsComponent, [{
        key: 'init',
        value: function init(parent) {
            parent.impulse = _vec2.default.create();
        }
    }, {
        key: 'update',
        value: function update(parent, delta) {
            _vec2.default.add(parent.velocity, parent.velocity, parent.impulse);
            _vec2.default.set(parent.impulse, 0, 0, 0);
        }
    }]);

    return PhysicsComponent;
}(_GameComponent3.default);

exports.default = PhysicsComponent;

/***/ }),
/* 43 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PointGravityComponent = function (_GameComponent) {
    _inherits(PointGravityComponent, _GameComponent);

    function PointGravityComponent(target) {
        _classCallCheck(this, PointGravityComponent);

        var _this = _possibleConstructorReturn(this, (PointGravityComponent.__proto__ || Object.getPrototypeOf(PointGravityComponent)).call(this));

        _this.target = target;
        _this.vector = _vec2.default.create();
        return _this;
    }

    _createClass(PointGravityComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            _vec2.default.subtract(this.vector, this.target.position, parent.position);
            var scale = this.target.mass * delta / _vec2.default.squaredLength(this.vector);
            _vec2.default.normalize(this.vector, this.vector);
            _vec2.default.scaleAndAdd(parent.velocity, parent.velocity, this.vector, scale);
        }
    }]);

    return PointGravityComponent;
}(_GameComponent3.default);

exports.default = PointGravityComponent;

/***/ }),
/* 44 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

var _Easing = __webpack_require__(5);

var Easing = _interopRequireWildcard(_Easing);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Use more generic [X]AnimationComponents
 * @deprecated
 */
var PositionInterpolatorComponent = function (_GameComponent) {
  _inherits(PositionInterpolatorComponent, _GameComponent);

  function PositionInterpolatorComponent(duration, easing) {
    _classCallCheck(this, PositionInterpolatorComponent);

    var _this = _possibleConstructorReturn(this, (PositionInterpolatorComponent.__proto__ || Object.getPrototypeOf(PositionInterpolatorComponent)).call(this));

    _this.duration = duration;
    _this.easing = easing || Easing.Linear;
    _this.elapsed = 0;
    _this.running = false;
    _this.starting = false;
    _this.start = _vec2.default.create();
    _this.position = _vec2.default.create();
    return _this;
  }

  _createClass(PositionInterpolatorComponent, [{
    key: 'update',
    value: function update(parent, delta) {
      // The first frame we run after being told to interpolate somewhere
      // we need to gather some information from our parent
      if (this.starting) {

        // If any co-ordinate is NaN this means the consumer wants to
        // retain those values from the parent
        if (isNaN(this.position[0])) this.position[0] = parent.position[0];
        if (isNaN(this.position[1])) this.position[1] = parent.position[1];
        if (isNaN(this.position[2])) this.position[2] = parent.position[2];

        // Linear interpolation requires that we remember where we started
        _vec2.default.copy(this.start, parent.position);

        this.running = true;
        this.starting = false;
        this.elapsed = 0;
      }

      if (this.running) {
        var x = this.elapsed / this.duration,
            t = this.easing(x);

        if (x > 1) {
          _vec2.default.copy(parent.position, this.position);
          this.running = false;
        } else {
          _vec2.default.lerp(parent.position, this.start, this.position, t);
          this.elapsed += delta;
        }
      }
    }
  }, {
    key: 'setPosition',
    value: function setPosition(x, y, z) {
      _get(PositionInterpolatorComponent.prototype.__proto__ || Object.getPrototypeOf(PositionInterpolatorComponent.prototype), 'setPosition', this).call(this, x, y, z);
      this.starting = true;
    }
  }]);

  return PositionInterpolatorComponent;
}(_GameComponent3.default);

exports.default = PositionInterpolatorComponent;

/***/ }),
/* 45 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RandomImpulseComponent = function (_GameComponent) {
    _inherits(RandomImpulseComponent, _GameComponent);

    function RandomImpulseComponent() {
        var probability = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.001;
        var maximumImpulse = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

        _classCallCheck(this, RandomImpulseComponent);

        var _this = _possibleConstructorReturn(this, (RandomImpulseComponent.__proto__ || Object.getPrototypeOf(RandomImpulseComponent)).call(this));

        _this.probability = probability;
        _this.maximumImpulse = maximumImpulse;
        return _this;
    }

    _createClass(RandomImpulseComponent, [{
        key: 'init',
        value: function init(parent) {
            parent.impulse = parent.impulse || _vec2.default.create();
        }
    }, {
        key: 'update',
        value: function update(parent, delta) {
            if (Math.random() < this.probability) _vec2.default.random(parent.impulse, Math.random() * this.maximumImpulse);
        }
    }]);

    return RandomImpulseComponent;
}(_GameComponent3.default);

exports.default = RandomImpulseComponent;

/***/ }),
/* 46 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RandomPositionComponent = function (_GameComponent) {
    _inherits(RandomPositionComponent, _GameComponent);

    function RandomPositionComponent(world) {
        var probability = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.001;

        _classCallCheck(this, RandomPositionComponent);

        var _this = _possibleConstructorReturn(this, (RandomPositionComponent.__proto__ || Object.getPrototypeOf(RandomPositionComponent)).call(this));

        _this.world = world;
        _this.probability = probability;
        return _this;
    }

    _createClass(RandomPositionComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            if (Math.random() < this.probability) {
                var b = this.world.bounds;
                var x = Math.random() * (b[2] - b[0]);
                var y = Math.random() * (b[3] - b[1]);
                var z = Math.random() * (b[5] - b[4]);
                _vec2.default.set(parent.position, x, y, z);
            }
        }
    }]);

    return RandomPositionComponent;
}(_GameComponent3.default);

exports.default = RandomPositionComponent;

/***/ }),
/* 47 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RandomVelocityComponent = function (_GameComponent) {
    _inherits(RandomVelocityComponent, _GameComponent);

    function RandomVelocityComponent() {
        var probability = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0.001;
        var maximumVelocity = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.1;

        _classCallCheck(this, RandomVelocityComponent);

        var _this = _possibleConstructorReturn(this, (RandomVelocityComponent.__proto__ || Object.getPrototypeOf(RandomVelocityComponent)).call(this));

        _this.probability = probability;
        _this.maximumVelocity = maximumVelocity;
        return _this;
    }

    _createClass(RandomVelocityComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            if (Math.random() < this.probability) _vec2.default.random(parent.velocity, Math.random() * this.maximumVelocity);
        }
    }]);

    return RandomVelocityComponent;
}(_GameComponent3.default);

exports.default = RandomVelocityComponent;

/***/ }),
/* 48 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RotateToHeadingComponent = function (_GameComponent) {
    _inherits(RotateToHeadingComponent, _GameComponent);

    function RotateToHeadingComponent() {
        _classCallCheck(this, RotateToHeadingComponent);

        return _possibleConstructorReturn(this, (RotateToHeadingComponent.__proto__ || Object.getPrototypeOf(RotateToHeadingComponent)).apply(this, arguments));
    }

    _createClass(RotateToHeadingComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            parent.setRotation(Math.atan2(parent.velocity[0], -parent.velocity[1]));
        }
    }]);

    return RotateToHeadingComponent;
}(_GameComponent3.default);

exports.default = RotateToHeadingComponent;

/***/ }),
/* 49 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var RotationComponent = function (_GameComponent) {
    _inherits(RotationComponent, _GameComponent);

    function RotationComponent(dth) {
        _classCallCheck(this, RotationComponent);

        var _this = _possibleConstructorReturn(this, (RotationComponent.__proto__ || Object.getPrototypeOf(RotationComponent)).call(this));

        _this.rotationSpeed = dth;
        return _this;
    }

    _createClass(RotationComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            var w = parent.rotationSpeed || this.rotationSpeed || 0;
            parent.setRotation(parent.rotation + w * delta);
        }
    }]);

    return RotationComponent;
}(_GameComponent3.default);

exports.default = RotationComponent;

/***/ }),
/* 50 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Use generic [*]AnimationComponents instead
 * @deprecated
 */
var RotationInterpolatorComponent = function (_GameComponent) {
    _inherits(RotationInterpolatorComponent, _GameComponent);

    function RotationInterpolatorComponent() {
        _classCallCheck(this, RotationInterpolatorComponent);

        return _possibleConstructorReturn(this, (RotationInterpolatorComponent.__proto__ || Object.getPrototypeOf(RotationInterpolatorComponent)).apply(this, arguments));
    }

    _createClass(RotationInterpolatorComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            var rotation = parent.rotation,
                target = this.rotation,
                diff = target - rotation,
                speed = 0.01;
            if (diff > Math.PI) {
                diff -= Math.PI * 2;
            } else if (diff < -Math.PI) {
                diff += Math.PI * 2;
            }
            parent.rotation = rotation + diff * delta * speed;
        }
    }]);

    return RotationInterpolatorComponent;
}(_GameComponent3.default);

exports.default = RotationInterpolatorComponent;

/***/ }),
/* 51 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject = __webpack_require__(2);

var _GameObject2 = _interopRequireDefault(_GameObject);

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _addComponent = _GameObject2.default.prototype.addComponent;

/**
  * Component which conditionally activates child components.
  * @extends {GameComponent}
  */

var SwitchComponent = function (_GameComponent) {
  _inherits(SwitchComponent, _GameComponent);

  function SwitchComponent(switchObject, switchProperty) {
    _classCallCheck(this, SwitchComponent);

    var _this = _possibleConstructorReturn(this, (SwitchComponent.__proto__ || Object.getPrototypeOf(SwitchComponent)).call(this));

    _this.positiveComponents = [];
    _this.negativeComponents = [];

    /**
      * The switch for whether the positive components are active or the negative ones. Default: true
      * @type {boolean}
      */
    _this.active = true;

    _this.object = switchObject;
    _this.prop = switchProperty;
    return _this;
  }

  /**
    * Add a positive component. Synonomous with {@link SwitchComponent#addPositiveComponent}
    * @param {GameComponent} component - The component to add.
    */


  _createClass(SwitchComponent, [{
    key: 'addComponent',
    value: function addComponent(component) {
      this.components = this.positiveComponents;
      _addComponent.call(this, component);
      this.components = undefined;
    }

    /**
      * Add a positive component
      * @param {GameComponent} component - The component to add.
      */

  }, {
    key: 'addPositiveComponent',
    value: function addPositiveComponent(component) {
      this.components = this.positiveComponents;
      _addComponent.call(this, component);
      this.components = undefined;
    }

    /**
      * Add a negative component
      * @param {GameComponent} component - The component to add.
      */

  }, {
    key: 'addNegativeComponent',
    value: function addNegativeComponent(component) {
      this.components = this.negativeComponents;
      _addComponent.call(this, component);
      this.components = undefined;
    }

    /**
      * Add an array of positive components and negativeComponents
      * @param {GameComponent[]} positiveComponents - The components to add to the positive side.
      * @param {GameComponent[]} negativeComponents - The components to add to the negative side.
      */

  }, {
    key: 'addComponents',
    value: function addComponents(positiveComponents, negativeComponents) {
      positiveComponents.forEach(this.addPositiveComponent.bind(this));
      negativeComponents.forEach(this.addNegativeComponent.bind(this));
    }

    /**
      * Swap the active state from positive to negative or vice-versa.
      */

  }, {
    key: 'flip',
    value: function flip() {
      this.setActive(!this.active);
    }

    /**
      * Explicitly set the active state.
      * @param {boolean} active - True means positive components will become active.
      */

  }, {
    key: 'setActive',
    value: function setActive(active) {
      this.active = active;

      if (this.object) {
        this.object[this.prop] = this.active;
      }
    }
  }, {
    key: 'update',
    value: function update(parent, delta) {
      var i = 0,
          l;

      if (this.object) {
        this.active = this.object[this.prop];
      }

      if (this.active) {
        l = this.positiveComponents.length;
        for (; i < l; i++) {
          this.positiveComponents[i].update(parent, delta);
        }
      } else {
        l = this.negativeComponents.length;
        for (; i < l; i++) {
          this.negativeComponents[i].update(parent, delta);
        }
      }
    }
  }]);

  return SwitchComponent;
}(_GameComponent3.default);

exports.default = SwitchComponent;

/***/ }),
/* 52 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Limit the velocity of an object.
 * @extends {GameComponent}
 * @param {number} velocity - Scalar maximum velocity.
 */
var TerminalVelocityComponent = function (_GameComponent) {
	_inherits(TerminalVelocityComponent, _GameComponent);

	function TerminalVelocityComponent(velocity) {
		_classCallCheck(this, TerminalVelocityComponent);

		var _this = _possibleConstructorReturn(this, (TerminalVelocityComponent.__proto__ || Object.getPrototypeOf(TerminalVelocityComponent)).call(this));

		_this.velocityMagnitude = velocity;
		return _this;
	}

	_createClass(TerminalVelocityComponent, [{
		key: 'update',
		value: function update(parent, delta) {
			var v = _vec2.default.length(parent.velocity);

			if (v > this.velocityMagnitude) {
				var scale = this.velocityMagnitude / v;
				_vec2.default.scale(parent.velocity, parent.velocity, scale);
			}
		}
	}]);

	return TerminalVelocityComponent;
}(_GameComponent3.default);

exports.default = TerminalVelocityComponent;

/***/ }),
/* 53 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(1);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Match a target object's rotation
 *
 * Rotation can bbe offset by setting this component's rotation as well
 * @param {GameObject} object - Target object
 */
var TrackRotationComponent = function (_GameComponent) {
    _inherits(TrackRotationComponent, _GameComponent);

    function TrackRotationComponent(object) {
        _classCallCheck(this, TrackRotationComponent);

        var _this = _possibleConstructorReturn(this, (TrackRotationComponent.__proto__ || Object.getPrototypeOf(TrackRotationComponent)).call(this));

        _this.target = object;
        return _this;
    }

    _createClass(TrackRotationComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            parent.rotation = this.target.rotation + this.rotation;
        }
    }]);

    return TrackRotationComponent;
}(_GameComponent3.default);

exports.default = TrackRotationComponent;

/***/ }),
/* 54 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * System to maintain list of polylines for collision detection.
 * @extends {GameObject}
 * @memberof Collision
 */
var BackgroundCollisionSystem = function (_GameObject) {
  _inherits(BackgroundCollisionSystem, _GameObject);

  function BackgroundCollisionSystem() {
    _classCallCheck(this, BackgroundCollisionSystem);

    var _this = _possibleConstructorReturn(this, (BackgroundCollisionSystem.__proto__ || Object.getPrototypeOf(BackgroundCollisionSystem)).call(this));

    _this.surfaces = [];
    _this.temporarySurfaces = [];
    return _this;
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


  _createClass(BackgroundCollisionSystem, [{
    key: 'addSurface',
    value: function addSurface(surface) {
      this.surfaces.push(surface);
    }

    /**
     * Add multiple permanent surfaces at once.
     * @param {array} surfaces - Array of arrays defining surfaces.
     */

  }, {
    key: 'addSurfaces',
    value: function addSurfaces(surfaces) {
      for (var i = 0; i < surfaces.length; i++) {
        this.surfaces.push(surfaces[i]);
      }
    }

    /**
     * Remove all permanent surfaces.
     */

  }, {
    key: 'clearSurfaces',
    value: function clearSurfaces() {
      this.surfaces.length = 0;
    }

    /**
     * Add a temporary (single frame) surface
     * @param {array} surface - Array defining surface
     */

  }, {
    key: 'addTemporarySurface',
    value: function addTemporarySurface(surface) {
      this.temporarySurfaces.push(surface);
    }
  }, {
    key: 'update',
    value: function update(delta) {
      _get(BackgroundCollisionSystem.prototype.__proto__ || Object.getPrototypeOf(BackgroundCollisionSystem.prototype), 'update', this).call(this, delta);

      this.temporarySurfaces.length = 0;
    }
  }]);

  return BackgroundCollisionSystem;
}(_GameObject3.default);

exports.default = BackgroundCollisionSystem;

/***/ }),
/* 55 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject2 = __webpack_require__(2);

var _GameObject3 = _interopRequireDefault(_GameObject2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/** @namespace Collision */

/**
 * This system's purpose is to accept 'attack' and 'vulnerable' bounds to be submitted
 * then once per frame sweep these to find intersections. Any which are found are then
 * reported to the respective objects.
 * @extends {GameObject}
 * @memberof Collision
 */
var CollisionSystem = function (_GameObject) {
	_inherits(CollisionSystem, _GameObject);

	function CollisionSystem() {
		_classCallCheck(this, CollisionSystem);

		var _this = _possibleConstructorReturn(this, (CollisionSystem.__proto__ || Object.getPrototypeOf(CollisionSystem)).call(this));

		_this.attackObjects = [];
		_this.vulnerableObjects = [];
		return _this;
	}

	/**
  * Add an object which can 'attack'
  * @param {GameObject} object
  */


	_createClass(CollisionSystem, [{
		key: "addAttackObject",
		value: function addAttackObject(object) {
			this.attackObjects.push(object);
		}

		/**
   * Add an object which is 'vulnerable'
   * @param {GameObject} object
   */

	}, {
		key: "addVulnerableObject",
		value: function addVulnerableObject(object) {
			this.vulnerableObjects.push(object);
		}
	}, {
		key: "update",
		value: function update(delta) {
			var attackCount = this.attackObjects.length;
			var vulnerableCount = this.vulnerableObjects.length;

			for (var i = 0; i < attackCount; i++) {
				var attack = this.attackObjects[i];
				var ax = attack.position[0];
				var ay = attack.position[1];
				var ab = attack.bounds;
				var attackBounds = [ax + ab[0], ay + ab[1], ax + ab[2], ay + ab[3]];

				for (var j = 0; j < vulnerableCount; j++) {
					var vulnerable = this.vulnerableObjects[j];
					var vx = vulnerable.position[0];
					var vy = vulnerable.position[1];
					var vb = vulnerable.bounds;
					var vulnerableBounds = [vx + vb[0], vy + vb[1], vx + vb[2], vy + vb[3]];

					if (attack === vulnerable) {
						continue;
					}

					if (attackBounds[0] < vulnerableBounds[2] && attackBounds[1] < vulnerableBounds[3] && attackBounds[2] > vulnerableBounds[0] && attackBounds[3] > vulnerableBounds[1]) {

						attack.fire("attack", vulnerable);
						vulnerable.fire("attackedBy", attack);
					}
				}
			}
			this.attackObjects.length = 0;
			this.vulnerableObjects.length = 0;
		}
	}]);

	return CollisionSystem;
}(_GameObject3.default);

exports.default = CollisionSystem;

/***/ }),
/* 56 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * It is sometimes useful to draw the bounds of an object or world for example.
 * @class DebugDrawBoundsComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where to draw the bounds
 */
var DebugDrawBoundsComponent = function (_GameComponent) {
	_inherits(DebugDrawBoundsComponent, _GameComponent);

	function DebugDrawBoundsComponent(renderSystem) {
		_classCallCheck(this, DebugDrawBoundsComponent);

		var _this = _possibleConstructorReturn(this, (DebugDrawBoundsComponent.__proto__ || Object.getPrototypeOf(DebugDrawBoundsComponent)).call(this));

		_this.renderSystem = renderSystem;
		return _this;
	}

	_createClass(DebugDrawBoundsComponent, [{
		key: "update",
		value: function update(parent, delta) {
			var bounds = parent.bounds;
			if (bounds) {
				this.renderSystem.push(function (ctx) {
					ctx.translate(parent.position[0], parent.position[1]);
					ctx.beginPath();
					ctx.rect(parent.bounds[0], parent.bounds[1], parent.bounds[2] - parent.bounds[0], parent.bounds[3] - parent.bounds[1]);
					ctx.strokeStyle = "#000";
					ctx.stroke();
				});
			}
		}
	}]);

	return DebugDrawBoundsComponent;
}(_GameComponent3.default);

exports.default = DebugDrawBoundsComponent;

/***/ }),
/* 57 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameObject = __webpack_require__(2);

var _GameObject2 = _interopRequireDefault(_GameObject);

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _vec = __webpack_require__(10);

var _vec2 = _interopRequireDefault(_vec);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PATH_SIZE = 1000;

/**
 * Component which traces out the path of an object
 * @class DebugDrawPathComponent
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Where to draw the path
 */

var DebugDrawPathComponent = function (_GameComponent) {
    _inherits(DebugDrawPathComponent, _GameComponent);

    function DebugDrawPathComponent(renderSystem) {
        _classCallCheck(this, DebugDrawPathComponent);

        var _this = _possibleConstructorReturn(this, (DebugDrawPathComponent.__proto__ || Object.getPrototypeOf(DebugDrawPathComponent)).call(this));

        _this.path = [];
        _this.currIndex = 0;
        _this.lastVx = 0;
        _this.lastVy = 0;
        _this.renderSystem = renderSystem;

        _this.path.length = PATH_SIZE;
        return _this;
    }

    _createClass(DebugDrawPathComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            var _this2 = this;

            var px = parent.position[0],
                py = parent.position[1],
                vx = parent.velocity[0],
                vy = parent.velocity[1],
                ax = (vx - this.lastVx) / delta,
                ay = (vy - this.lastVy) / delta,
                p = this.path,
                prevIndex = (this.currIndex - 2 + PATH_SIZE) % PATH_SIZE,
                dx = Math.abs(p[prevIndex] - px),
                dy = Math.abs(p[prevIndex + 1] - py);

            if (dx > 100 || dy > 100) {
                p[this.currIndex] = NaN;
                p[this.currIndex + 1] = NaN;
                this.currIndex = (this.currIndex + 2) % PATH_SIZE;
            }

            p[this.currIndex] = px;
            p[this.currIndex + 1] = py;

            // Draw Path

            this.renderSystem.push(function (ctx) {
                ctx.beginPath();

                ctx.moveTo(p[_this2.currIndex], p[_this2.currIndex + 1]);

                for (var i = 2; i < PATH_SIZE; i += 2) {
                    var index = (_this2.currIndex + i) % PATH_SIZE;
                    if (p[index]) {
                        ctx.lineTo(p[index], p[index + 1]);
                    } else {
                        i += 2;
                        index = (_this2.currIndex + i) % PATH_SIZE;
                        ctx.moveTo(p[index], p[index + 1]);
                    }
                }

                ctx.strokeStyle = "#CCC";
                ctx.stroke();
            });

            this.currIndex = (this.currIndex + 2) % PATH_SIZE;

            // Draw Velocity
            this.renderSystem.strokePath([px, py, px + vx * 100, py + vy * 100], "rgba(0,128,255,0.7)", 0);

            // Draw Acceleration
            this.renderSystem.strokePath([px, py, px + ax * 4e5, py + ay * 4e5], "rgba(0,255,0,0.7)", 0);
            this.lastVx = vx;
            this.lastVy = vy;
        }
    }]);

    return DebugDrawPathComponent;
}(_GameComponent3.default);

exports.default = DebugDrawPathComponent;

/***/ }),
/* 58 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component to draw surfaces from a BackgroundCollisionSystem. Will also draw surface normals.
 * @class DebugDrawSurfacesComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where to draw to.
 * @param {string} colour - Colour of surfaces
 */
var DebugDrawSurfacesComponent = function (_GameComponent) {
    _inherits(DebugDrawSurfacesComponent, _GameComponent);

    function DebugDrawSurfacesComponent(renderSystem, colour) {
        _classCallCheck(this, DebugDrawSurfacesComponent);

        var _this = _possibleConstructorReturn(this, (DebugDrawSurfacesComponent.__proto__ || Object.getPrototypeOf(DebugDrawSurfacesComponent)).call(this));

        _this.renderSystem = renderSystem;
        _this.colour = colour || "#000";
        return _this;
    }

    _createClass(DebugDrawSurfacesComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            var s = parent.surfaces,
                j = 0,
                m = s.length,
                i,
                c,
                l;
            for (; j < m; j++) {
                this.renderSystem.strokePath(s[j], parent.colour || this.colour);
            }

            // Draw Normals
            for (j = 0; j < m; j++) {
                c = parent.surfaces[j];
                l = c.length;
                for (i = 0; i < l - 3; i += 2) {
                    var x1 = c[i],
                        y1 = c[i + 1],
                        x2 = c[i + 2],
                        y2 = c[i + 3],
                        dx = x2 - x1,
                        dy = y2 - y1,
                        mx = x1 + dx * 0.5,
                        my = y1 + dy * 0.5,
                        nx = dy / Math.sqrt(dy * dy + dx * dx),
                        ny = -dx / Math.sqrt(dy * dy + dx * dx);
                    this.renderSystem.strokePath([mx, my, mx + nx * 30, my + ny * 30], '#08f');
                }
            }
        }
    }]);

    return DebugDrawSurfacesComponent;
}(_GameComponent3.default);

exports.default = DebugDrawSurfacesComponent;

/***/ }),
/* 59 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _FlockingComponent = __webpack_require__(24);

var _FlockingComponent2 = _interopRequireDefault(_FlockingComponent);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Class to draw NEIGHBOUR_RADIUS and SEPARATION_RADIUS around objects
 * @class DebugFlockingComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where should this be drawn
 */
var DebugFlockingComponent = function (_GameComponent) {
    _inherits(DebugFlockingComponent, _GameComponent);

    function DebugFlockingComponent(renderSystem) {
        _classCallCheck(this, DebugFlockingComponent);

        var _this = _possibleConstructorReturn(this, (DebugFlockingComponent.__proto__ || Object.getPrototypeOf(DebugFlockingComponent)).call(this));

        _this.renderSystem = renderSystem;
        return _this;
    }

    _createClass(DebugFlockingComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            this.renderSystem.push(function (ctx) {
                ctx.translate(parent.position[0], parent.position[1]);
                ctx.beginPath();
                ctx.arc(0, 0, _FlockingComponent2.default.NEIGHBOUR_RADIUS, 0, Math.PI * 2, false);
                ctx.strokeStyle = "#008";
                ctx.stroke();
                ctx.beginPath();
                ctx.arc(0, 0, _FlockingComponent2.default.SEPARATION_RADIUS, 0, Math.PI * 2, false);
                ctx.strokeStyle = "#800";
                ctx.stroke();
            });
        }
    }]);

    return DebugFlockingComponent;
}(_GameComponent3.default);

exports.default = DebugFlockingComponent;

/***/ }),
/* 60 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PositionRenderComponent = function (_GameComponent) {
  _inherits(PositionRenderComponent, _GameComponent);

  function PositionRenderComponent(renderSystem) {
    var font = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : "10px sans-serif";
    var color = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "#000";

    _classCallCheck(this, PositionRenderComponent);

    var _this = _possibleConstructorReturn(this, (PositionRenderComponent.__proto__ || Object.getPrototypeOf(PositionRenderComponent)).call(this));

    _this.renderSystem = renderSystem;
    _this.font = font;
    _this.color = color;
    // Font should start with an integer we can use as a size for the crosshairs
    _this.size = parseInt(font, 10);
    return _this;
  }

  _createClass(PositionRenderComponent, [{
    key: "update",
    value: function update(parent, delta) {
      var _this2 = this;

      var p = parent.position;
      var size = this.size;

      this.renderSystem.push(function (ctx) {
        ctx.translate(p[0], p[1]);
        ctx.strokeStyle = "#888";
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(-size, 0);
        ctx.lineTo(size, 0);
        ctx.moveTo(0, -size);
        ctx.lineTo(0, size);
        ctx.stroke();
        ctx.fillStyle = _this2.color;
        ctx.font = _this2.font;
        ctx.fillText((p[0] | 0) + ", " + (p[1] | 0), size / 2, -size / 2);
      });
    }
  }]);

  return PositionRenderComponent;
}(_GameComponent3.default);

exports.default = PositionRenderComponent;

/***/ }),
/* 61 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _GameComponent2 = __webpack_require__(0);

var _GameComponent3 = _interopRequireDefault(_GameComponent2);

var _mat = __webpack_require__(64);

var _mat2 = _interopRequireDefault(_mat);

var _mat3 = __webpack_require__(25);

var _mat4 = _interopRequireDefault(_mat3);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PolyShapeRenderingComponent = function (_GameComponent) {
    _inherits(PolyShapeRenderingComponent, _GameComponent);

    function PolyShapeRenderingComponent(renderSystem, vertices, textureCoords, vertexNormals, vertexIndices) {
        _classCallCheck(this, PolyShapeRenderingComponent);

        var _this = _possibleConstructorReturn(this, (PolyShapeRenderingComponent.__proto__ || Object.getPrototypeOf(PolyShapeRenderingComponent)).call(this));

        var gl = renderSystem.context;
        _this.renderSystem = renderSystem;

        _this.vertexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.vertexBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
        _this.vertexBuffer.itemSize = 3;
        _this.vertexBuffer.numItems = Math.floor(vertices.length / _this.vertexBuffer.itemSize);

        _this.textureBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.textureBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(textureCoords), gl.STATIC_DRAW);
        _this.textureBuffer.itemSize = 2;
        _this.textureBuffer.numItems = Math.floor(textureCoords.length / _this.textureBuffer.itemSize);

        _this.vertexNormalBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ARRAY_BUFFER, _this.vertexNormalBuffer);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertexNormals), gl.STATIC_DRAW);
        _this.vertexNormalBuffer.itemSize = 3;
        _this.vertexNormalBuffer.numItems = Math.floor(vertexNormals.length / _this.vertexNormalBuffer.itemSize);

        _this.vertexIndexBuffer = gl.createBuffer();
        gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, _this.vertexIndexBuffer);
        gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array(vertexIndices), gl.STATIC_DRAW);
        _this.vertexIndexBuffer.itemSize = 1;
        _this.vertexIndexBuffer.numItems = vertexIndices.length;
        return _this;
    }

    _createClass(PolyShapeRenderingComponent, [{
        key: 'update',
        value: function update(parent, delta) {
            var vBuff = this.vertexBuffer,
                tBuff = this.textureBuffer,
                nBuff = this.vertexNormalBuffer,
                iBuff = this.vertexIndexBuffer,
                lighting = this.lighting || parent.lighting,
                shaderProgram = this.renderSystem.shaderProgram,
                texture = this.texture || parent.texture;
            this.renderSystem.push(function (gl, mvMatrix) {
                _mat4.default.translate(mvMatrix, mvMatrix, parent.position);

                if (parent.rotation && parent.rotationAxis) {
                    _mat4.default.rotate(mvMatrix, mvMatrix, parent.rotation, parent.rotationAxis);
                }

                var normalMatrix = _mat2.default.create();
                _mat2.default.fromMat4(normalMatrix, mvMatrix);
                _mat2.default.invert(normalMatrix, normalMatrix);
                _mat2.default.transpose(normalMatrix, normalMatrix);
                gl.uniformMatrix3fv(shaderProgram.nMatrixUniform, false, normalMatrix);

                if (parent.size) {
                    _mat4.default.scale(mvMatrix, mvMatrix, parent.size);
                }

                gl.bindBuffer(gl.ARRAY_BUFFER, vBuff);
                gl.vertexAttribPointer(shaderProgram.vertexPositionAttribute, vBuff.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, tBuff);
                gl.vertexAttribPointer(shaderProgram.textureCoordAttribute, tBuff.itemSize, gl.FLOAT, false, 0, 0);

                gl.bindBuffer(gl.ARRAY_BUFFER, nBuff);
                gl.vertexAttribPointer(shaderProgram.vertexNormalAttribute, nBuff.itemSize, gl.FLOAT, false, 0, 0);

                gl.activeTexture(gl.TEXTURE0);
                gl.bindTexture(gl.TEXTURE_2D, texture);
                gl.uniform1i(shaderProgram.samplerUniform, 0);

                gl.uniform1i(shaderProgram.useLightingUniform, lighting);
                if (lighting) {
                    gl.uniform3f(shaderProgram.ambientColorUniform, this.ambientLight, this.ambientLight, this.ambientLight);

                    gl.uniform3f(shaderProgram.pointLightingLocationUniform, 0.0, 0.0, 0.0);

                    gl.uniform3f(shaderProgram.pointLightingColorUniform, this.pointLighting, this.pointLighting, this.pointLighting);
                }

                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, iBuff);

                gl.uniformMatrix4fv(shaderProgram.mvMatrixUniform, false, mvMatrix);
                gl.drawElements(gl.TRIANGLES, iBuff.numItems, gl.UNSIGNED_SHORT, 0);
            });
        }
    }]);

    return PolyShapeRenderingComponent;
}(_GameComponent3.default);

/**
 * Static method to create cubic polyshape.
 * @static
 * @param {WebGLRenderSystem} renderSystem
 * @return {PolyShapeRenderingComponent}
 */


exports.default = PolyShapeRenderingComponent;
PolyShapeRenderingComponent.createCube = function (renderSystem) {
    var vertices = [
    // Front face
    -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0, 1.0,

    // Back face
    -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0, -1.0,

    // Top face
    -1.0, 1.0, -1.0, -1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 1.0, -1.0,

    // Bottom face
    -1.0, -1.0, -1.0, 1.0, -1.0, -1.0, 1.0, -1.0, 1.0, -1.0, -1.0, 1.0,

    // Right face
    1.0, -1.0, -1.0, 1.0, 1.0, -1.0, 1.0, 1.0, 1.0, 1.0, -1.0, 1.0,

    // Left face
    -1.0, -1.0, -1.0, -1.0, -1.0, 1.0, -1.0, 1.0, 1.0, -1.0, 1.0, -1.0],
        textureCoords = [
    // Front
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Back
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Top
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Bottom
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Right
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0,
    // Left
    0.0, 0.0, 1.0, 0.0, 1.0, 1.0, 0.0, 1.0],
        vertexNormals = [
    // Front face
    0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0,

    // Back face
    0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0,

    // Top face
    0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0,

    // Bottom face
    0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0,

    // Right face
    1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0, 1.0, 0.0, 0.0,

    // Left face
    -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0, -1.0, 0.0, 0.0],
        vertexIndices = [0, 1, 2, 0, 2, 3, // Front face
    4, 5, 6, 4, 6, 7, // Back face
    8, 9, 10, 8, 10, 11, // Top face
    12, 13, 14, 12, 14, 15, // Bottom face
    16, 17, 18, 16, 18, 19, // Right face
    20, 21, 22, 20, 22, 23 // Left face
    ];
    return new PolyShapeRenderingComponent(renderSystem, vertices, textureCoords, vertexNormals, vertexIndices);
};

/**
 * Static method to create spherical polyshape.
 * @static
 * @param {WebGLRenderSystem} renderSystem
 * @param {number} latitudeBands
 * @param {number} longitudeBands
 * @return {PolyShapeRenderingComponent}
 */
PolyShapeRenderingComponent.createSphere = function (renderSystem, latitudeBands, longitudeBands) {
    var vertexPositionData = [],
        normalData = [],
        textureCoordData = [],
        latNumber,
        theta,
        sinTheta,
        cosTheta,
        longNumber,
        phi,
        sinPhi,
        cosPhi,
        x,
        y,
        z,
        u,
        v,
        indexData,
        first,
        second;
    for (latNumber = 0; latNumber <= latitudeBands; latNumber++) {
        theta = latNumber * Math.PI / latitudeBands;
        sinTheta = Math.sin(theta);
        cosTheta = Math.cos(theta);

        for (longNumber = 0; longNumber <= longitudeBands; longNumber++) {
            phi = longNumber * 2 * Math.PI / longitudeBands;
            sinPhi = Math.sin(phi);
            cosPhi = Math.cos(phi);

            x = cosPhi * sinTheta;
            y = cosTheta;
            z = sinPhi * sinTheta;
            u = 1 - longNumber / longitudeBands;
            v = 1 - latNumber / latitudeBands;

            normalData.push(x);
            normalData.push(y);
            normalData.push(z);
            textureCoordData.push(u);
            textureCoordData.push(v);
            vertexPositionData.push(x);
            vertexPositionData.push(y);
            vertexPositionData.push(z);
        }
    }
    indexData = [];
    for (latNumber = 0; latNumber < latitudeBands; latNumber++) {
        for (longNumber = 0; longNumber < longitudeBands; longNumber++) {
            first = latNumber * (longitudeBands + 1) + longNumber;
            second = first + longitudeBands + 1;
            indexData.push(first);
            indexData.push(second);
            indexData.push(first + 1);

            indexData.push(second);
            indexData.push(second + 1);
            indexData.push(first + 1);
        }
    }
    return new PolyShapeRenderingComponent(renderSystem, vertexPositionData, textureCoordData, vertexPositionData, indexData);
};

/***/ }),
/* 62 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Sprite = exports.SpriteAnimationComponent = exports.SpriteRenderingComponent = exports.TileComponent = undefined;

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

exports.AnimatedSpriteComponent = AnimatedSpriteComponent;
exports.CanvasSpriteRenderingComponent = CanvasSpriteRenderingComponent;

var _GameComponent4 = __webpack_require__(0);

var _GameComponent5 = _interopRequireDefault(_GameComponent4);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * Component for rendering backgrounds for example.
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Where to draw.
 * @param {object} texture - A texture object i.e {image: new Image(), width: 0, height: 0}
 * @param {array} bounds - How far and wide to render the images. Guaranteed to cover bounds.
 * @memberof Sprite
 */
var TileComponent = exports.TileComponent = function (_GameComponent) {
  _inherits(TileComponent, _GameComponent);

  function TileComponent(renderSystem, texture, bounds) {
    _classCallCheck(this, TileComponent);

    var _this = _possibleConstructorReturn(this, (TileComponent.__proto__ || Object.getPrototypeOf(TileComponent)).call(this));

    _this.renderSystem = renderSystem;
    _this.texture = texture;
    _this.bounds = bounds;
    return _this;
  }

  _createClass(TileComponent, [{
    key: 'update',
    value: function update(parent, delta) {
      var renderSystem = this.renderSystem,
          texture = this.texture,
          bounds = this.bounds,
          dx = texture.width,
          dy = texture.height,
          startX = parent.position[0] % dx,
          startY = parent.position[1] % dy,
          x,
          y = bounds[1],
          // + startY - dy,
      width = bounds[2],
          height = bounds[3],
          render = function render(texture, x, y) {
        return function (context) {
          context.drawImage(texture.image, x, y);
        };
      };
      for (; y < height + dy; y += dy) {
        for (x = bounds[0] + startX - dx; x < width + dx; x += dx) {
          renderSystem.push(render(texture, x, y));
        }
      }
    }
  }]);

  return TileComponent;
}(_GameComponent5.default);

/**
 * Component renders a sprite for a parent object.
 *
 * Component can either contain its own sprite or use one provided on the parent.
 * In the case where both component and parent have sprites, the one on the parent
 * is prefered.
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Target renderer
 * @param {number} layer - optional layer to render this sprite on to.
 * @param {Sprite} sprite - Sprite object
 * @memberof Sprite
 */


var SpriteRenderingComponent = exports.SpriteRenderingComponent = function (_GameComponent2) {
  _inherits(SpriteRenderingComponent, _GameComponent2);

  function SpriteRenderingComponent(renderSystem, layer, sprite) {
    _classCallCheck(this, SpriteRenderingComponent);

    /** @type {RenderSystem} */
    var _this2 = _possibleConstructorReturn(this, (SpriteRenderingComponent.__proto__ || Object.getPrototypeOf(SpriteRenderingComponent)).call(this));

    _this2.renderSystem = renderSystem;

    /** @type {number} */
    _this2.layer = layer;

    /** @type {Sprite} */
    _this2.sprite = sprite;
    return _this2;
  }

  _createClass(SpriteRenderingComponent, [{
    key: 'update',
    value: function update(parent, delta) {
      _get(SpriteRenderingComponent.prototype.__proto__ || Object.getPrototypeOf(SpriteRenderingComponent.prototype), 'update', this).call(this, delta);

      var sprite = this.sprite || parent.sprite,
          image = sprite && sprite.t.image;

      if (sprite) {
        this.renderSystem.push(function (context) {
          var x = parent.position[0],
              y = parent.position[1],
              w = sprite.w,
              h = sprite.h;
          context.translate(x, y);
          context.rotate(parent.rotation);
          context.drawImage(image, sprite.x, sprite.y, w, h, -sprite.ox, -sprite.oy, w, h);
        }, this.layer);
      }
    }
  }]);

  return SpriteRenderingComponent;
}(_GameComponent5.default);

/**
 * Animate through a sequence of sprites.
 * @extends {GameComponent}
 * @param {number} duration - Default duration if sprites do no contain their own intrinsic duration.
 * @param {Sprite[]} sprites - Array of sprite objects.
 * @memberof Sprite
 */


var SpriteAnimationComponent = exports.SpriteAnimationComponent = function (_GameComponent3) {
  _inherits(SpriteAnimationComponent, _GameComponent3);

  function SpriteAnimationComponent(duration, sprites) {
    _classCallCheck(this, SpriteAnimationComponent);

    var _this3 = _possibleConstructorReturn(this, (SpriteAnimationComponent.__proto__ || Object.getPrototypeOf(SpriteAnimationComponent)).call(this));

    _this3.duration = duration;
    _this3.spriteIndex = 0;
    _this3.playing = true;
    _this3.sprites = sprites;
    return _this3;
  }

  _createClass(SpriteAnimationComponent, [{
    key: 'init',
    value: function init(parent) {
      if (this.sprites) {
        parent.sprites = this.sprites;
      }
      if (parent.sprites.length) {
        parent.sprite = parent.sprites[0];
      }
      parent.spriteCountdown = parent.sprite && parent.sprite.d || this.duration;
    }
  }, {
    key: 'update',
    value: function update(parent, delta) {
      var spriteCount = parent.sprites.length,
          sprite,
          duration;

      if (this.playing) {
        parent.spriteCountdown -= delta;
        if (parent.spriteCountdown <= 0) {
          // TODO: Possible divide by zero
          this.spriteIndex = (this.spriteIndex + 1) % spriteCount;
          sprite = parent.sprites[this.spriteIndex];
          parent.sprite = sprite;
          duration = sprite.d || this.duration;
          parent.spriteCountdown = duration;
        }
      }
    }

    /**
     * Start the animation.
     */

  }, {
    key: 'play',
    value: function play() {
      this.playing = true;
    }

    /**
     * Stop the animation and reset the frame to the first sprite.
     */

  }, {
    key: 'stop',
    value: function stop() {
      this.playing = false;
      this.spriteIndex = 0;
    }

    /**
     * Pause the animation.
     */

  }, {
    key: 'pause',
    value: function pause() {
      this.playing = false;
    }
  }]);

  return SpriteAnimationComponent;
}(_GameComponent5.default);

/** @namespace
 * @property {Texture} t - texture object
 * @property {number} x - X-offset of sprite in spritesheet
 * @property {number} y - Y-offset of sprite in spritesheet
 * @property {number} width - width of sprite
 * @property {number} height - height of sprite
 * @property {number} ox - origin x-offset, so sprite can be centred on parent's position
 * @property {number} oy - origin y-offset, so sprite can be centred on parent's position
 * @property {number} d - (optional) duration of sprite for animation
 */


var Sprite = exports.Sprite = {};

/**
 * Convenience method to generate a set of sprite objects based on a template and a spritesheet.
 * @static
 * @param {object} sprite - The sprite template.
 * @param {number} rows - Number of rows in the sprite sheet.
 * @param {number} cols - Number of columns in the sprite sheet.
 */
Sprite.generateSpriteSheet = function (sprite, rows, cols) {
  var out = [],
      i,
      j;
  for (i = 0; i < rows; i++) {
    for (j = 0; j < cols; j++) {
      out.push({
        t: sprite.t,
        x: j * sprite.w,
        y: i * sprite.h,
        w: sprite.w,
        h: sprite.h,
        ox: sprite.ox,
        oy: sprite.oy,
        d: sprite.d
      });
    }
  }
  return out;
};

/**
 * This component is not to be used any more. Use {@link SpriteAnimationComponent} instead
 * @constructor
 * @deprecated
 * @extends {GameComponent}
 * @memberof Sprite
 */
function AnimatedSpriteComponent(images, speed) {
  this.images = images;
  this.delay = 1000 / speed;
  this.lastChange = 0;
  this.imageIndex = 0;
}
AnimatedSpriteComponent.prototype = new _GameComponent5.default();
AnimatedSpriteComponent.prototype.update = function (parent, delta) {
  if (this.lastChange > this.delay) {
    this.imageIndex = (this.imageIndex + 1) % this.images.length;
    parent.sprite = this.images[this.imageIndex];
    this.lastChange = 0;
  } else {
    this.lastChange += delta;
  }
};

/**
 * This component is not to be used any more. Use other components instead
 * @constructor
 * @deprecated
 * @extends {GameComponent}
 * @memberof Sprite
 */
function CanvasSpriteRenderingComponent(renderSystem) {
  this.renderSystem = renderSystem;
}
CanvasSpriteRenderingComponent.prototype = new _GameComponent5.default();
CanvasSpriteRenderingComponent.prototype.update = function (parent, delta) {
  this.renderSystem.push(function (context) {
    var x = parent.position[0],
        y = parent.position[1],
        w = parent.sprite.width,
        h = parent.sprite.height;
    context.translate(x, y);
    context.rotate(parent.rotation);
    context.drawImage(parent.sprite, -w / 2, -h / 2);
  });
};

/***/ }),
/* 63 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(4);

/**
 * @class 2x2 Matrix
 * @name mat2
 */
var mat2 = {};

/**
 * Creates a new identity mat2
 *
 * @returns {mat2} a new 2x2 matrix
 */
mat2.create = function() {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Creates a new mat2 initialized with values from an existing matrix
 *
 * @param {mat2} a matrix to clone
 * @returns {mat2} a new 2x2 matrix
 */
mat2.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Copy the values from one mat2 to another
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    return out;
};

/**
 * Set a mat2 to the identity matrix
 *
 * @param {mat2} out the receiving matrix
 * @returns {mat2} out
 */
mat2.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 1;
    return out;
};

/**
 * Create a new mat2 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out A new 2x2 matrix
 */
mat2.fromValues = function(m00, m01, m10, m11) {
    var out = new glMatrix.ARRAY_TYPE(4);
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};

/**
 * Set the components of a mat2 to the given values
 *
 * @param {mat2} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m10 Component in column 1, row 0 position (index 2)
 * @param {Number} m11 Component in column 1, row 1 position (index 3)
 * @returns {mat2} out
 */
mat2.set = function(out, m00, m01, m10, m11) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m10;
    out[3] = m11;
    return out;
};


/**
 * Transpose the values of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a1 = a[1];
        out[1] = a[2];
        out[2] = a1;
    } else {
        out[0] = a[0];
        out[1] = a[2];
        out[2] = a[1];
        out[3] = a[3];
    }
    
    return out;
};

/**
 * Inverts a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.invert = function(out, a) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],

        // Calculate the determinant
        det = a0 * a3 - a2 * a1;

    if (!det) {
        return null;
    }
    det = 1.0 / det;
    
    out[0] =  a3 * det;
    out[1] = -a1 * det;
    out[2] = -a2 * det;
    out[3] =  a0 * det;

    return out;
};

/**
 * Calculates the adjugate of a mat2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the source matrix
 * @returns {mat2} out
 */
mat2.adjoint = function(out, a) {
    // Caching this value is nessecary if out == a
    var a0 = a[0];
    out[0] =  a[3];
    out[1] = -a[1];
    out[2] = -a[2];
    out[3] =  a0;

    return out;
};

/**
 * Calculates the determinant of a mat2
 *
 * @param {mat2} a the source matrix
 * @returns {Number} determinant of a
 */
mat2.determinant = function (a) {
    return a[0] * a[3] - a[2] * a[1];
};

/**
 * Multiplies two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.multiply = function (out, a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    out[0] = a0 * b0 + a2 * b1;
    out[1] = a1 * b0 + a3 * b1;
    out[2] = a0 * b2 + a2 * b3;
    out[3] = a1 * b2 + a3 * b3;
    return out;
};

/**
 * Alias for {@link mat2.multiply}
 * @function
 */
mat2.mul = mat2.multiply;

/**
 * Rotates a mat2 by the given angle
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.rotate = function (out, a, rad) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = a0 *  c + a2 * s;
    out[1] = a1 *  c + a3 * s;
    out[2] = a0 * -s + a2 * c;
    out[3] = a1 * -s + a3 * c;
    return out;
};

/**
 * Scales the mat2 by the dimensions in the given vec2
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat2} out
 **/
mat2.scale = function(out, a, v) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3],
        v0 = v[0], v1 = v[1];
    out[0] = a0 * v0;
    out[1] = a1 * v0;
    out[2] = a2 * v1;
    out[3] = a3 * v1;
    return out;
};

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.rotate(dest, dest, rad);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat2} out
 */
mat2.fromRotation = function(out, rad) {
    var s = Math.sin(rad),
        c = Math.cos(rad);
    out[0] = c;
    out[1] = s;
    out[2] = -s;
    out[3] = c;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat2.identity(dest);
 *     mat2.scale(dest, dest, vec);
 *
 * @param {mat2} out mat2 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat2} out
 */
mat2.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;
    out[3] = v[1];
    return out;
}

/**
 * Returns a string representation of a mat2
 *
 * @param {mat2} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat2.str = function (a) {
    return 'mat2(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + a[3] + ')';
};

/**
 * Returns Frobenius norm of a mat2
 *
 * @param {mat2} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat2.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2)))
};

/**
 * Returns L, D and U matrices (Lower triangular, Diagonal and Upper triangular) by factorizing the input matrix
 * @param {mat2} L the lower triangular matrix 
 * @param {mat2} D the diagonal matrix 
 * @param {mat2} U the upper triangular matrix 
 * @param {mat2} a the input matrix to factorize
 */

mat2.LDU = function (L, D, U, a) { 
    L[2] = a[2]/a[0]; 
    U[0] = a[0]; 
    U[1] = a[1]; 
    U[3] = a[3] - L[2] * U[1]; 
    return [L, D, U];       
}; 

/**
 * Adds two mat2's
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @returns {mat2} out
 */
mat2.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    return out;
};

/**
 * Alias for {@link mat2.subtract}
 * @function
 */
mat2.sub = mat2.subtract;

/**
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && a[3] === b[3];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat2} a The first matrix.
 * @param {mat2} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat2.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)));
};

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat2} out the receiving matrix
 * @param {mat2} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat2} out
 */
mat2.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    return out;
};

/**
 * Adds two mat2's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat2} out the receiving vector
 * @param {mat2} a the first operand
 * @param {mat2} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat2} out
 */
mat2.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    return out;
};

module.exports = mat2;


/***/ }),
/* 64 */
/***/ (function(module, exports, __webpack_require__) {

/* Copyright (c) 2015, Brandon Jones, Colin MacKenzie IV.

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE. */

var glMatrix = __webpack_require__(4);

/**
 * @class 3x3 Matrix
 * @name mat3
 */
var mat3 = {};

/**
 * Creates a new identity mat3
 *
 * @returns {mat3} a new 3x3 matrix
 */
mat3.create = function() {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Copies the upper-left 3x3 values into the given mat3.
 *
 * @param {mat3} out the receiving 3x3 matrix
 * @param {mat4} a   the source 4x4 matrix
 * @returns {mat3} out
 */
mat3.fromMat4 = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[4];
    out[4] = a[5];
    out[5] = a[6];
    out[6] = a[8];
    out[7] = a[9];
    out[8] = a[10];
    return out;
};

/**
 * Creates a new mat3 initialized with values from an existing matrix
 *
 * @param {mat3} a matrix to clone
 * @returns {mat3} a new 3x3 matrix
 */
mat3.clone = function(a) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Copy the values from one mat3 to another
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.copy = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = a[2];
    out[3] = a[3];
    out[4] = a[4];
    out[5] = a[5];
    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Create a new mat3 with the given values
 *
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} A new mat3
 */
mat3.fromValues = function(m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    var out = new glMatrix.ARRAY_TYPE(9);
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set the components of a mat3 to the given values
 *
 * @param {mat3} out the receiving matrix
 * @param {Number} m00 Component in column 0, row 0 position (index 0)
 * @param {Number} m01 Component in column 0, row 1 position (index 1)
 * @param {Number} m02 Component in column 0, row 2 position (index 2)
 * @param {Number} m10 Component in column 1, row 0 position (index 3)
 * @param {Number} m11 Component in column 1, row 1 position (index 4)
 * @param {Number} m12 Component in column 1, row 2 position (index 5)
 * @param {Number} m20 Component in column 2, row 0 position (index 6)
 * @param {Number} m21 Component in column 2, row 1 position (index 7)
 * @param {Number} m22 Component in column 2, row 2 position (index 8)
 * @returns {mat3} out
 */
mat3.set = function(out, m00, m01, m02, m10, m11, m12, m20, m21, m22) {
    out[0] = m00;
    out[1] = m01;
    out[2] = m02;
    out[3] = m10;
    out[4] = m11;
    out[5] = m12;
    out[6] = m20;
    out[7] = m21;
    out[8] = m22;
    return out;
};

/**
 * Set a mat3 to the identity matrix
 *
 * @param {mat3} out the receiving matrix
 * @returns {mat3} out
 */
mat3.identity = function(out) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
};

/**
 * Transpose the values of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.transpose = function(out, a) {
    // If we are transposing ourselves we can skip a few steps but have to cache some values
    if (out === a) {
        var a01 = a[1], a02 = a[2], a12 = a[5];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a01;
        out[5] = a[7];
        out[6] = a02;
        out[7] = a12;
    } else {
        out[0] = a[0];
        out[1] = a[3];
        out[2] = a[6];
        out[3] = a[1];
        out[4] = a[4];
        out[5] = a[7];
        out[6] = a[2];
        out[7] = a[5];
        out[8] = a[8];
    }
    
    return out;
};

/**
 * Inverts a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.invert = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b01 = a22 * a11 - a12 * a21,
        b11 = -a22 * a10 + a12 * a20,
        b21 = a21 * a10 - a11 * a20,

        // Calculate the determinant
        det = a00 * b01 + a01 * b11 + a02 * b21;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = b01 * det;
    out[1] = (-a22 * a01 + a02 * a21) * det;
    out[2] = (a12 * a01 - a02 * a11) * det;
    out[3] = b11 * det;
    out[4] = (a22 * a00 - a02 * a20) * det;
    out[5] = (-a12 * a00 + a02 * a10) * det;
    out[6] = b21 * det;
    out[7] = (-a21 * a00 + a01 * a20) * det;
    out[8] = (a11 * a00 - a01 * a10) * det;
    return out;
};

/**
 * Calculates the adjugate of a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the source matrix
 * @returns {mat3} out
 */
mat3.adjoint = function(out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    out[0] = (a11 * a22 - a12 * a21);
    out[1] = (a02 * a21 - a01 * a22);
    out[2] = (a01 * a12 - a02 * a11);
    out[3] = (a12 * a20 - a10 * a22);
    out[4] = (a00 * a22 - a02 * a20);
    out[5] = (a02 * a10 - a00 * a12);
    out[6] = (a10 * a21 - a11 * a20);
    out[7] = (a01 * a20 - a00 * a21);
    out[8] = (a00 * a11 - a01 * a10);
    return out;
};

/**
 * Calculates the determinant of a mat3
 *
 * @param {mat3} a the source matrix
 * @returns {Number} determinant of a
 */
mat3.determinant = function (a) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8];

    return a00 * (a22 * a11 - a12 * a21) + a01 * (-a22 * a10 + a12 * a20) + a02 * (a21 * a10 - a11 * a20);
};

/**
 * Multiplies two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.multiply = function (out, a, b) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        b00 = b[0], b01 = b[1], b02 = b[2],
        b10 = b[3], b11 = b[4], b12 = b[5],
        b20 = b[6], b21 = b[7], b22 = b[8];

    out[0] = b00 * a00 + b01 * a10 + b02 * a20;
    out[1] = b00 * a01 + b01 * a11 + b02 * a21;
    out[2] = b00 * a02 + b01 * a12 + b02 * a22;

    out[3] = b10 * a00 + b11 * a10 + b12 * a20;
    out[4] = b10 * a01 + b11 * a11 + b12 * a21;
    out[5] = b10 * a02 + b11 * a12 + b12 * a22;

    out[6] = b20 * a00 + b21 * a10 + b22 * a20;
    out[7] = b20 * a01 + b21 * a11 + b22 * a21;
    out[8] = b20 * a02 + b21 * a12 + b22 * a22;
    return out;
};

/**
 * Alias for {@link mat3.multiply}
 * @function
 */
mat3.mul = mat3.multiply;

/**
 * Translate a mat3 by the given vector
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to translate
 * @param {vec2} v vector to translate by
 * @returns {mat3} out
 */
mat3.translate = function(out, a, v) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],
        x = v[0], y = v[1];

    out[0] = a00;
    out[1] = a01;
    out[2] = a02;

    out[3] = a10;
    out[4] = a11;
    out[5] = a12;

    out[6] = x * a00 + y * a10 + a20;
    out[7] = x * a01 + y * a11 + a21;
    out[8] = x * a02 + y * a12 + a22;
    return out;
};

/**
 * Rotates a mat3 by the given angle
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.rotate = function (out, a, rad) {
    var a00 = a[0], a01 = a[1], a02 = a[2],
        a10 = a[3], a11 = a[4], a12 = a[5],
        a20 = a[6], a21 = a[7], a22 = a[8],

        s = Math.sin(rad),
        c = Math.cos(rad);

    out[0] = c * a00 + s * a10;
    out[1] = c * a01 + s * a11;
    out[2] = c * a02 + s * a12;

    out[3] = c * a10 - s * a00;
    out[4] = c * a11 - s * a01;
    out[5] = c * a12 - s * a02;

    out[6] = a20;
    out[7] = a21;
    out[8] = a22;
    return out;
};

/**
 * Scales the mat3 by the dimensions in the given vec2
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to rotate
 * @param {vec2} v the vec2 to scale the matrix by
 * @returns {mat3} out
 **/
mat3.scale = function(out, a, v) {
    var x = v[0], y = v[1];

    out[0] = x * a[0];
    out[1] = x * a[1];
    out[2] = x * a[2];

    out[3] = y * a[3];
    out[4] = y * a[4];
    out[5] = y * a[5];

    out[6] = a[6];
    out[7] = a[7];
    out[8] = a[8];
    return out;
};

/**
 * Creates a matrix from a vector translation
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.translate(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Translation vector
 * @returns {mat3} out
 */
mat3.fromTranslation = function(out, v) {
    out[0] = 1;
    out[1] = 0;
    out[2] = 0;
    out[3] = 0;
    out[4] = 1;
    out[5] = 0;
    out[6] = v[0];
    out[7] = v[1];
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a given angle
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.rotate(dest, dest, rad);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {Number} rad the angle to rotate the matrix by
 * @returns {mat3} out
 */
mat3.fromRotation = function(out, rad) {
    var s = Math.sin(rad), c = Math.cos(rad);

    out[0] = c;
    out[1] = s;
    out[2] = 0;

    out[3] = -s;
    out[4] = c;
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Creates a matrix from a vector scaling
 * This is equivalent to (but much faster than):
 *
 *     mat3.identity(dest);
 *     mat3.scale(dest, dest, vec);
 *
 * @param {mat3} out mat3 receiving operation result
 * @param {vec2} v Scaling vector
 * @returns {mat3} out
 */
mat3.fromScaling = function(out, v) {
    out[0] = v[0];
    out[1] = 0;
    out[2] = 0;

    out[3] = 0;
    out[4] = v[1];
    out[5] = 0;

    out[6] = 0;
    out[7] = 0;
    out[8] = 1;
    return out;
}

/**
 * Copies the values from a mat2d into a mat3
 *
 * @param {mat3} out the receiving matrix
 * @param {mat2d} a the matrix to copy
 * @returns {mat3} out
 **/
mat3.fromMat2d = function(out, a) {
    out[0] = a[0];
    out[1] = a[1];
    out[2] = 0;

    out[3] = a[2];
    out[4] = a[3];
    out[5] = 0;

    out[6] = a[4];
    out[7] = a[5];
    out[8] = 1;
    return out;
};

/**
* Calculates a 3x3 matrix from the given quaternion
*
* @param {mat3} out mat3 receiving operation result
* @param {quat} q Quaternion to create matrix from
*
* @returns {mat3} out
*/
mat3.fromQuat = function (out, q) {
    var x = q[0], y = q[1], z = q[2], w = q[3],
        x2 = x + x,
        y2 = y + y,
        z2 = z + z,

        xx = x * x2,
        yx = y * x2,
        yy = y * y2,
        zx = z * x2,
        zy = z * y2,
        zz = z * z2,
        wx = w * x2,
        wy = w * y2,
        wz = w * z2;

    out[0] = 1 - yy - zz;
    out[3] = yx - wz;
    out[6] = zx + wy;

    out[1] = yx + wz;
    out[4] = 1 - xx - zz;
    out[7] = zy - wx;

    out[2] = zx - wy;
    out[5] = zy + wx;
    out[8] = 1 - xx - yy;

    return out;
};

/**
* Calculates a 3x3 normal matrix (transpose inverse) from the 4x4 matrix
*
* @param {mat3} out mat3 receiving operation result
* @param {mat4} a Mat4 to derive the normal matrix from
*
* @returns {mat3} out
*/
mat3.normalFromMat4 = function (out, a) {
    var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3],
        a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7],
        a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11],
        a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15],

        b00 = a00 * a11 - a01 * a10,
        b01 = a00 * a12 - a02 * a10,
        b02 = a00 * a13 - a03 * a10,
        b03 = a01 * a12 - a02 * a11,
        b04 = a01 * a13 - a03 * a11,
        b05 = a02 * a13 - a03 * a12,
        b06 = a20 * a31 - a21 * a30,
        b07 = a20 * a32 - a22 * a30,
        b08 = a20 * a33 - a23 * a30,
        b09 = a21 * a32 - a22 * a31,
        b10 = a21 * a33 - a23 * a31,
        b11 = a22 * a33 - a23 * a32,

        // Calculate the determinant
        det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;

    if (!det) { 
        return null; 
    }
    det = 1.0 / det;

    out[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
    out[1] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
    out[2] = (a10 * b10 - a11 * b08 + a13 * b06) * det;

    out[3] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
    out[4] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
    out[5] = (a01 * b08 - a00 * b10 - a03 * b06) * det;

    out[6] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
    out[7] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
    out[8] = (a30 * b04 - a31 * b02 + a33 * b00) * det;

    return out;
};

/**
 * Returns a string representation of a mat3
 *
 * @param {mat3} mat matrix to represent as a string
 * @returns {String} string representation of the matrix
 */
mat3.str = function (a) {
    return 'mat3(' + a[0] + ', ' + a[1] + ', ' + a[2] + ', ' + 
                    a[3] + ', ' + a[4] + ', ' + a[5] + ', ' + 
                    a[6] + ', ' + a[7] + ', ' + a[8] + ')';
};

/**
 * Returns Frobenius norm of a mat3
 *
 * @param {mat3} a the matrix to calculate Frobenius norm of
 * @returns {Number} Frobenius norm
 */
mat3.frob = function (a) {
    return(Math.sqrt(Math.pow(a[0], 2) + Math.pow(a[1], 2) + Math.pow(a[2], 2) + Math.pow(a[3], 2) + Math.pow(a[4], 2) + Math.pow(a[5], 2) + Math.pow(a[6], 2) + Math.pow(a[7], 2) + Math.pow(a[8], 2)))
};

/**
 * Adds two mat3's
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.add = function(out, a, b) {
    out[0] = a[0] + b[0];
    out[1] = a[1] + b[1];
    out[2] = a[2] + b[2];
    out[3] = a[3] + b[3];
    out[4] = a[4] + b[4];
    out[5] = a[5] + b[5];
    out[6] = a[6] + b[6];
    out[7] = a[7] + b[7];
    out[8] = a[8] + b[8];
    return out;
};

/**
 * Subtracts matrix b from matrix a
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @returns {mat3} out
 */
mat3.subtract = function(out, a, b) {
    out[0] = a[0] - b[0];
    out[1] = a[1] - b[1];
    out[2] = a[2] - b[2];
    out[3] = a[3] - b[3];
    out[4] = a[4] - b[4];
    out[5] = a[5] - b[5];
    out[6] = a[6] - b[6];
    out[7] = a[7] - b[7];
    out[8] = a[8] - b[8];
    return out;
};

/**
 * Alias for {@link mat3.subtract}
 * @function
 */
mat3.sub = mat3.subtract;

/**
 * Multiply each element of the matrix by a scalar.
 *
 * @param {mat3} out the receiving matrix
 * @param {mat3} a the matrix to scale
 * @param {Number} b amount to scale the matrix's elements by
 * @returns {mat3} out
 */
mat3.multiplyScalar = function(out, a, b) {
    out[0] = a[0] * b;
    out[1] = a[1] * b;
    out[2] = a[2] * b;
    out[3] = a[3] * b;
    out[4] = a[4] * b;
    out[5] = a[5] * b;
    out[6] = a[6] * b;
    out[7] = a[7] * b;
    out[8] = a[8] * b;
    return out;
};

/**
 * Adds two mat3's after multiplying each element of the second operand by a scalar value.
 *
 * @param {mat3} out the receiving vector
 * @param {mat3} a the first operand
 * @param {mat3} b the second operand
 * @param {Number} scale the amount to scale b's elements by before adding
 * @returns {mat3} out
 */
mat3.multiplyScalarAndAdd = function(out, a, b, scale) {
    out[0] = a[0] + (b[0] * scale);
    out[1] = a[1] + (b[1] * scale);
    out[2] = a[2] + (b[2] * scale);
    out[3] = a[3] + (b[3] * scale);
    out[4] = a[4] + (b[4] * scale);
    out[5] = a[5] + (b[5] * scale);
    out[6] = a[6] + (b[6] * scale);
    out[7] = a[7] + (b[7] * scale);
    out[8] = a[8] + (b[8] * scale);
    return out;
};

/*
 * Returns whether or not the matrices have exactly the same elements in the same position (when compared with ===)
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.exactEquals = function (a, b) {
    return a[0] === b[0] && a[1] === b[1] && a[2] === b[2] && 
           a[3] === b[3] && a[4] === b[4] && a[5] === b[5] &&
           a[6] === b[6] && a[7] === b[7] && a[8] === b[8];
};

/**
 * Returns whether or not the matrices have approximately the same elements in the same position.
 *
 * @param {mat3} a The first matrix.
 * @param {mat3} b The second matrix.
 * @returns {Boolean} True if the matrices are equal, false otherwise.
 */
mat3.equals = function (a, b) {
    var a0 = a[0], a1 = a[1], a2 = a[2], a3 = a[3], a4 = a[4], a5 = a[5], a6 = a[6], a7 = a[7], a8 = a[8];
    var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3], b4 = b[4], b5 = b[5], b6 = a[6], b7 = b[7], b8 = b[8];
    return (Math.abs(a0 - b0) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a0), Math.abs(b0)) &&
            Math.abs(a1 - b1) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a1), Math.abs(b1)) &&
            Math.abs(a2 - b2) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a2), Math.abs(b2)) &&
            Math.abs(a3 - b3) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a3), Math.abs(b3)) &&
            Math.abs(a4 - b4) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a4), Math.abs(b4)) &&
            Math.abs(a5 - b5) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a5), Math.abs(b5)) &&
            Math.abs(a6 - b6) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a6), Math.abs(b6)) &&
            Math.abs(a7 - b7) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a7), Math.abs(b7)) &&
            Math.abs(a8 - b8) <= glMatrix.EPSILON*Math.max(1.0, Math.abs(a8), Math.abs(b8)));
};


module.exports = mat3;


/***/ }),
/* 65 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.Debug = exports.WebGLRenderSystem = exports.Render = exports.Collision = exports.Input = exports.World = exports.Easing = exports.Components = exports.Game = exports.AudioSystem = exports.InputSystem = exports.WorldSystem = exports.CanvasRenderSystem = exports.CameraSystem = exports.GameComponent = exports.GameObjectManager = exports.GameObject = undefined;

var _GameObject = __webpack_require__(2);

Object.defineProperty(exports, 'GameObject', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GameObject).default;
  }
});

var _GameObjectManager = __webpack_require__(16);

Object.defineProperty(exports, 'GameObjectManager', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GameObjectManager).default;
  }
});

var _GameComponent = __webpack_require__(0);

Object.defineProperty(exports, 'GameComponent', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_GameComponent).default;
  }
});

var _CameraSystem = __webpack_require__(11);

Object.defineProperty(exports, 'CameraSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CameraSystem).default;
  }
});

var _CanvasRenderSystem = __webpack_require__(7);

Object.defineProperty(exports, 'CanvasRenderSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_CanvasRenderSystem).default;
  }
});

var _WorldSystem = __webpack_require__(8);

Object.defineProperty(exports, 'WorldSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WorldSystem).default;
  }
});

var _InputSystem = __webpack_require__(6);

Object.defineProperty(exports, 'InputSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_InputSystem).default;
  }
});

var _AudioSystem = __webpack_require__(26);

Object.defineProperty(exports, 'AudioSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_AudioSystem).default;
  }
});

var _Game = __webpack_require__(30);

Object.defineProperty(exports, 'Game', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_Game).default;
  }
});

var _WebGLRenderSystem = __webpack_require__(21);

Object.defineProperty(exports, 'WebGLRenderSystem', {
  enumerable: true,
  get: function get() {
    return _interopRequireDefault(_WebGLRenderSystem).default;
  }
});

var _basic = __webpack_require__(28);

var basic = _interopRequireWildcard(_basic);

var _animation = __webpack_require__(27);

var animation = _interopRequireWildcard(_animation);

var _Easing = __webpack_require__(5);

var easing = _interopRequireWildcard(_Easing);

var _world = __webpack_require__(34);

var world = _interopRequireWildcard(_world);

var _WorldBounceComponent = __webpack_require__(22);

var _WorldBounceComponent2 = _interopRequireDefault(_WorldBounceComponent);

var _WorldWrapComponent = __webpack_require__(23);

var _WorldWrapComponent2 = _interopRequireDefault(_WorldWrapComponent);

var _input = __webpack_require__(32);

var input = _interopRequireWildcard(_input);

var _ClickComponent = __webpack_require__(17);

var _ClickComponent2 = _interopRequireDefault(_ClickComponent);

var _collision = __webpack_require__(29);

var collision = _interopRequireWildcard(_collision);

var _CollisionComponent = __webpack_require__(14);

var _CollisionComponent2 = _interopRequireDefault(_CollisionComponent);

var _BounceComponent = __webpack_require__(13);

var _BounceComponent2 = _interopRequireDefault(_BounceComponent);

var _BackgroundCollisionComponent = __webpack_require__(12);

var _BackgroundCollisionComponent2 = _interopRequireDefault(_BackgroundCollisionComponent);

var _SolidComponent = __webpack_require__(15);

var _SolidComponent2 = _interopRequireDefault(_SolidComponent);

var _render = __webpack_require__(33);

var render = _interopRequireWildcard(_render);

var _DotRenderComponent = __webpack_require__(18);

var _DotRenderComponent2 = _interopRequireDefault(_DotRenderComponent);

var _RectangleRenderComponent = __webpack_require__(19);

var _RectangleRenderComponent2 = _interopRequireDefault(_RectangleRenderComponent);

var _TextRenderComponent = __webpack_require__(20);

var _TextRenderComponent2 = _interopRequireDefault(_TextRenderComponent);

var _debug = __webpack_require__(31);

var debug = _interopRequireWildcard(_debug);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Components = exports.Components = {};

// Export basic components

for (var name in basic) {
  Components[name] = basic[name];
}

// Export animation components

for (var _name in animation) {
  Components[_name] = animation[_name];
}

exports.Easing = easing;

// Export world namespace

exports.World = world;

Components['WorldBounceComponent'] = _WorldBounceComponent2.default;

Components['WorldWrapComponent'] = _WorldWrapComponent2.default;

// Export input namespace
exports.Input = input;

Components['ClickComponent'] = _ClickComponent2.default;

// Export collision namespace
exports.Collision = collision;

Components['CollisionComponent'] = _CollisionComponent2.default;

Components['BounceComponent'] = _BounceComponent2.default;

Components['BackgroundCollisionComponent'] = _BackgroundCollisionComponent2.default;

Components['SolidComponent'] = _SolidComponent2.default;

// Export render namespace
exports.Render = render;

Components['DotRenderComponent'] = _DotRenderComponent2.default;

Components['RectangleRenderComponent'] = _RectangleRenderComponent2.default;

Components['TextRenderComponent'] = _TextRenderComponent2.default;

// Export debug
exports.Debug = debug;

/***/ })
/******/ ]);
});