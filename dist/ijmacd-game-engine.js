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
/******/ 	return __webpack_require__(__webpack_require__.s = 63);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(2);

/**
 * A GameComponent adds a particular behaviour to a GameObject. This class
 * should be subclassed to implement desired behaviour. The `update` method
 * is called once per frame for each GameObject it has been attached to. This
 * is where most of the work will be done.
 * @abstract
 */
class GameComponent extends __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */] {
    /**
     * This method is called once when the component is first added to each parent.
     * Use this to perform set-up and add any necessary properties to parent objects.
     * @abstract
     * @param {GameObject} parent - A reference to the {@link GameObject} on which
     * this component is operating. This allows multiple GameObjects to share
     * stateless components.
     */
    init(parent) { }
    /**
     * This method is called once per frame for each GameObject this component
     * has been attached to.
     * @abstract
     * @param {GameObject} parent - A reference to the {@link GameObject} on which
     * this component is operating. This allows multiple GameObjects to share
     * stateless components.
     * @param {number} delta - Time since last frame in milliseconds
     */
    update(parentOrDelta, delta) {
        if (typeof parentOrDelta === "number")
            return super.update(parentOrDelta);
        if (typeof delta === "number")
            return super.update(delta);
    }
    /**
     * This method is used to produce a html representation of the component for
     * things such as debugging trees. Similar to toString method.
     * @return {string} Representation of this component in HTML
     */
    toHTML() {
        return this.name;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameComponent;



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

var glMatrix = __webpack_require__(9);

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(10);


/**
 * The base object in the GameEngine. Most objects managed by the system
 * will be based on this class.
 */
class GameObject {
    constructor() {
        /** Array of components which update this GameObject. */
        this.components = [];
        /** Position of this object in the world. */
        this.position = __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3___default.a.create();
        /** Velocity of this object moving through the world. */
        this.velocity = __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3___default.a.create();
        /** Current rotation of this object. */
        this.rotation = 0;
        /** 3D rotations require a rotation axis */
        this.rotationAxis = __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3___default.a.fromValues(0, 0, 1);
        /** Current speed of rotation. */
        this.rotationSpeed = 0;
        /** List of components which will be removed on next update. */
        this._toBeRemoved = [];
        /**
         * Events mixin
         */
        this._events = {};
    }
    addComponent(component) {
        // Allow syntactic sugar of addComponent(function() {...}) which is a
        // shorthand for specifying a simple component with only an update method
        if (component instanceof Function) {
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
     * Add an array of components all at once
     */
    addComponents(components) {
        components.forEach(c => this.addComponent(c));
    }
    /**
     * Remove a particular {@link GameComponent} which had previously been added
     * to this object.
     * @param {GameComponent} component - The component to be removed from this object
     * @return {GameObject} Returns a reference to this for chainability
     */
    removeComponent(component) {
        this._toBeRemoved.push(component);
        return this;
    }
    removeComponentByName(name) {
        for (var i = 0; i < this.components.length; i++) {
            const c = this.components[i];
            if (c.name == name || c.constructor.name == name)
                this._toBeRemoved.push(c);
        }
        return this;
    }
    removeComponentByTest(test) {
        for (var i = 0; i < this.components.length; i++) {
            if (test(this.components[i]))
                this._toBeRemoved.push(this.components[i]);
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
    setPosition(x, y, z) {
        if (x == undefined) {
            x = this.position[0];
        }
        if (y == undefined) {
            y = this.position[1];
        }
        if (z == undefined) {
            z = this.position[2];
        }
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3___default.a.set(this.position, x, y, z);
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
    setVelocity(vx, vy, vz) {
        if (vx == undefined) {
            vx = this.velocity[0];
        }
        if (vy == undefined) {
            vy = this.velocity[1];
        }
        if (vz == undefined) {
            vz = this.velocity[2];
        }
        __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3___default.a.set(this.velocity, vx, vy, vz);
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
    setBounds(...bounds) {
        this.bounds = bounds;
        return this;
    }
    /**
     * Set rotation
     * @param {number} rotation - Rotation in radians
     * @param {vec3} rotationAxis - 3D rotations require rotation axis.
     */
    setRotation(rotation, rotationAxis) {
        this.rotation = rotation;
        if (rotationAxis) {
            __WEBPACK_IMPORTED_MODULE_0_gl_matrix_src_gl_matrix_vec3___default.a.normalize(this.rotationAxis, rotationAxis);
        }
    }
    /**
     * This method is called once per frame. GameObjects will usually only need
     * to call update on each of its components in this method passing a reference
     * to itself.
     * @param {number} delta - Time since last frame in milliseconds
     */
    update(delta) {
        var i = 0, l = this.components.length, j = 0, m = this._toBeRemoved.length;
        for (; j < m; j++) {
            for (i = 0; i < l; i++) {
                if (this.components[i] == this._toBeRemoved[j]) {
                    arrayRemoveItem.call(this.components, i);
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
    toHTML() {
        var html = this.name, i;
        if (typeof this.position.x == "number")
            html += " " + this.position;
        if (this.components.length) {
            html += "<ul>";
            for (i = 0; i < this.components.length; i++)
                html += "<li>" + this.components[i].toHTML();
            html += "</ul>";
        }
        return html;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameObject;

__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["b" /* applyMixin */])(GameObject, __WEBPACK_IMPORTED_MODULE_1__util__["c" /* Events */]);
function arrayRemoveItem(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__Easing__ = __webpack_require__(8);



/**
 * Animate arbritarty properties
 * @param {number} loop - 0: no loop, 1: loop animation, 2: loop reverse
 */
class PropertyAnimationComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
  constructor (outputter, start, end, duration=1000, easing=__WEBPACK_IMPORTED_MODULE_1__Easing__["Linear"], loop=2) {
    super();

    if (!Array.isArray(start)) { start = [start] }
    if (!Array.isArray(end)) { end = [end] }
    start.length = 4;
    end.length = 4;

    this.outputter = outputter;
    this.start = start;
    this.end = end;
    this.duration = duration;
    this.easing = easing;
    this.loop = loop;

    this.elapsed = 0;
    this.direction = 1;
    this.out = Array(4);
  }

  reset () {
    this.elapsed = 0;
  }

  start () {
    this.direction = 1;
  }

  pause () {
    this.direction = 0;
  }

  stop () {
    this.pause();
    this.reset();
  }

  update (parent, delta) {
    const t = this.easing(this.elapsed / this.duration);
    const a0 = this.start[0];
    const a1 = this.start[1];
    const a2 = this.start[2];
    const a3 = this.start[3];

    this.out[0] = a0 + t * (this.end[0] - a0);
    this.out[1] = a1 + t * (this.end[1] - a1);
    this.out[2] = a2 + t * (this.end[2] - a2);
    this.out[3] = a3 + t * (this.end[3] - a3);

    this.outputter(parent, this.out);

    this.elapsed += delta * this.direction;

    if (this.elapsed > this.duration || this.elapsed < 0) {
      if (this.loop == 2) {
        this.direction *= -1;
      }
      else if (this.loop == 1) {
        this.elapsed = 0;
      }
      this.elapsed = Math.min(Math.max(this.elapsed, 0), this.duration);
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PropertyAnimationComponent;



/***/ }),
/* 4 */
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

var glMatrix = __webpack_require__(9);

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
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_mat2__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_mat2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_mat2__);



// Create some spare vectors for use in screenToWorld method
const v = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const rotMat = __WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_mat2___default.a.create();
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
class InputSystem extends __WEBPACK_IMPORTED_MODULE_0__core_GameObject__["a" /* default */] {
    constructor(screen, keyboard, cameraSystem) {
        super();
        this._nextClick = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.fromValues(NaN, NaN);
        /** If {@link InputSystem#hasClick} is true, this property contains the world co-ordinates of the click. */
        this.lastClick = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
        /** Boolean to indicate if a click has been registered during the last frame. */
        this.hasClick = false;
        this._nextKey = null;
        /** The most recent key press if one occured during the previous frame. */
        this.lastKey = null;
        this.screen = screen;
        this.keyboard = keyboard;
        this.camera = cameraSystem;
        this.initScreen();
        this.initKeyboard();
    }
    update(delta) {
        super.update(delta);
        // Cycle the next event to last event property here so that
        // last event persists for exactly one frame.
        // Click
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.copy(this.lastClick, this._nextClick);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.set(this._nextClick, NaN, NaN);
        this.hasClick = !isNaN(this.lastClick[0]);
        if (this.hasClick) {
            this.fire("click", this.lastClick);
        }
        // Keypress
        this.lastKey = this._nextKey;
        // Consumers should interpret (null) as no keypress
        this._nextKey = null;
        if (this.lastKey) {
            this.fire("keypress", this.lastKey);
        }
    }
    /**
     * Set a new screen object and initialse event listening on it.
     * @param {Element} screen - New screen
     */
    setScreen(screen) {
        if (this.screen) {
            this.destroyScreen();
        }
        this.screen = screen;
        this.initScreen();
    }
    /**
     * Convert screen co-ordinates to world co-ordinates.
     * @param {number} screenX - X co-ordinate on screen.
     * @param {number} screenY - Y co-ordinate on screen.
     * @return {vec2} - Vector containing co-ordinates in the world taking into account camera position, rotation etc.
     */
    screenToWorld(screenX, screenY) {
        const cam = this.camera, screen = this.screen, screenWidth = screen.offsetWidth, screenHeight = screen.offsetHeight;
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.set(v, screenX - screenWidth / 2, screenY - screenHeight / 2);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.set(v, v[0] / cam.scaleX, v[1] / cam.scaleY);
        // Rotation in 2D only makes sense around the Z-axis so that is
        // all that is handled here.
        if (cam.rotationAxis[2] == 1) {
            __WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_mat2___default.a.rotate(rotMat, rotMat, -cam.rotation);
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.transformMat2(v, v, rotMat);
        }
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.add(v, v, cam.position);
        return v;
    }
    /**
     * Private method to initialse touch events on screen.
     *
     * Should be invoked as initScreen.call(this);
     * @private
     */
    initScreen() {
        if (!this.screen)
            return;
        TouchClick(this.screen, e => {
            const offsetLeft = this.screen.offsetLeft, offsetTop = this.screen.offsetTop, touch = e.touches && e.touches[0], x = (touch ? touch.pageX : e.pageX) - offsetLeft, y = (touch ? touch.pageY : e.pageY) - offsetTop;
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.copy(this._nextClick, this.screenToWorld(x, y));
        });
    }
    /**
     * Initialse keyboard events
     *
     * Should be invoked as initKeyboard.call(this);
     * @private
     */
    initKeyboard() {
        if (!this.keyboard)
            return;
        this.keyboard.addEventListener("keydown", e => {
            this._nextKey = e.which;
        });
    }
    destroyScreen() {
        const screen = this.screen;
        if (screen) {
            OffTouchClick(screen);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = InputSystem;

/** Reference object to convert keys to keycodes */
InputSystem.Keys = {
    "0": 48, "1": 49, "2": 50, "3": 51, "4": 52, "5": 53, "6": 54, "7": 55, "8": 56, "9": 57,
    a: 65, b: 66, c: 67, d: 68, e: 69, f: 70, g: 71, h: 72, i: 73, j: 74, k: 75, l: 76, m: 77,
    n: 78, o: 79, p: 80, q: 81, r: 82, s: 83, t: 84, u: 85, v: 86, w: 87, x: 88, y: 89, z: 90
};
/**
 * @callback TouchClickCallback
 * @param {object} event - Generic event object which will be relevant to event type.
 */
/**
 * Helper funciion to handle both touches and clicks consistently
 * @private
 * @param {Element} sel - Element on which we should look for input
 * @param {TouchClickCallback} fnc - Callback which will be called with event object only once per touch/click
 */
function TouchClick(sel, fnc) {
    const handle = function (event) {
        event.stopPropagation();
        event.preventDefault();
        if (event.handled !== true) {
            fnc(event);
            event.handled = true;
        }
        else {
            return false;
        }
    };
    // Remove previous handler in case this is element being re-initialised
    OffTouchClick(sel);
    // Add new handler
    sel.addEventListener('touchstart', handle);
    sel.addEventListener('click', handle);
    // We need to keep track of this handler in order to be able to remove it later.
    sel.touchClick = handle;
}
function OffTouchClick(sel) {
    // Remove previous handlers
    sel.removeEventListener('touchstart', sel.touchClick);
    sel.removeEventListener('click', sel.touchClick);
}


/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);

/**
 * <p>The default renderer for 2D canvas renderings. Jobs submitted each frame
 * will get rendered to the canvas.
 * <p>It supports render layers as well.
 * @extends {GameObject}
 * @param {CanvasRenderingContext2D} context - A 2d context from the target canvas. Call <code>canvas.getContext('2d')</code>
 * @param {CameraSystem} cameraSystem - Viewport from which to render from. All drawing calls will be made realtive to the camera position.
 */
class CanvasRenderSystem extends __WEBPACK_IMPORTED_MODULE_0__core_GameObject__["a" /* default */] {
    constructor(context, cameraSystem) {
        super();
        this.renderQueue = [];
        /** Should the renderer clear the screen before drawing a frame or just overdraw. */
        this.clearScreen = true;
        this.context = context;
        this.canvas = context && context.canvas;
        this.camera = cameraSystem;
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
    push(renderable, layer = 1) {
        if (!this.renderQueue[layer]) {
            this.renderQueue[layer] = [];
        }
        this.renderQueue[layer].push(renderable);
    }
    update(delta) {
        if (this.clearScreen) {
            this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
        this.context.save();
        var p = this.camera.position, q = this.canvas.width / 2, r = this.canvas.height / 2, i, l, j, n;
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
    drawPath(context, path) {
        var i = 2, l = path.length;
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
    strokePath(path, style = "#000", layer = 1) {
        this.push(function (context) {
            context.strokeStyle = style;
            this.drawPath(context, path);
            context.stroke();
        }, layer);
    }
}
/* harmony default export */ __webpack_exports__["a"] = CanvasRenderSystem;
function _renderQueue(renderSystem, layer) {
    const { context, renderQueue } = renderSystem;
    const queue = renderQueue[layer];
    if (queue) {
        for (let j = 0, n = queue.length; j < n; j++) {
            context.save();
            queue[j].call(renderSystem, context);
            context.restore();
        }
        queue.length = 0;
    }
}


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);

/**
 * Generic way to access a 'world' with intrinsic bounds.
 * @param {array} bounds - Array containing co-ordinates specifying the world <code>[minX, minY, maxX, maxY, minZ, maxZ]</code>
 */
class WorldSystem extends __WEBPACK_IMPORTED_MODULE_0__core_GameObject__["a" /* default */] {
    constructor(bounds) {
        super();
        this.bounds = bounds;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = WorldSystem;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony export (immutable) */ __webpack_exports__["BackIn"] = BackIn;
/* harmony export (immutable) */ __webpack_exports__["BackOut"] = BackOut;
/* harmony export (immutable) */ __webpack_exports__["BackInOut"] = BackInOut;
/* harmony export (immutable) */ __webpack_exports__["ElasticIn"] = ElasticIn;
/* harmony export (immutable) */ __webpack_exports__["ElasticOut"] = ElasticOut;
/* harmony export (immutable) */ __webpack_exports__["ElasticInOut"] = ElasticInOut;
/* harmony export (immutable) */ __webpack_exports__["DampedOscillation"] = DampedOscillation;
const Linear = t => t;
/* harmony export (immutable) */ __webpack_exports__["Linear"] = Linear;

const QuadIn = t => t * t;
/* harmony export (immutable) */ __webpack_exports__["QuadIn"] = QuadIn;

const QuadOut = t => -t * (t - 2);
/* harmony export (immutable) */ __webpack_exports__["QuadOut"] = QuadOut;

const CircIn = t => 1-Math.sqrt(1-t*t);
/* harmony export (immutable) */ __webpack_exports__["CircIn"] = CircIn;

const CircOut = t => Math.sqrt(1-(t-1)*(t-1));
/* harmony export (immutable) */ __webpack_exports__["CircOut"] = CircOut;

const Smooth = t => t*t*(3-2*t);
/* harmony export (immutable) */ __webpack_exports__["Smooth"] = Smooth;

// Stolen from Dojo:
// https://github.com/dojo/dwb/blob/master/src/main/webapp/js/build/amd_loader/fx/easing.js
const SineIn = t => -1 * Math.cos(t * (Math.PI / 2)) + 1;
/* harmony export (immutable) */ __webpack_exports__["SineIn"] = SineIn;

const SineOut = t => Math.sin(t * (Math.PI / 2));
/* harmony export (immutable) */ __webpack_exports__["SineOut"] = SineOut;

const SineInOut = t => -1 * (Math.cos(Math.PI * t) - 1) / 2;
/* harmony export (immutable) */ __webpack_exports__["SineInOut"] = SineInOut;

function BackIn (t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s);
};
function BackOut (t) {
  var s = 1.70158;
  t = t - 1;
  return t*t*((s+1)*t + s) + 1;
};
function BackInOut (t) {
  var s = 1.70158 * 1.525;
  t = t * 2;
  if(t < 1){ return (Math.pow(t, 2) * ((s + 1) * t - s)) / 2; }
  t-=2;
  return (Math.pow(t, 2) * ((s + 1) * t + s) + 2) / 2;
};
function ElasticIn (n) {
  if(n == 0 || n == 1){ return n; }
  var p = .3;
  var s = p / 4;
  n = n - 1;
  return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
};
function ElasticOut (n) {
  if(n==0 || n == 1){ return n; }
  var p = .3;
  var s = p / 4;
  return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
};
function ElasticInOut (n) {
  if(n == 0) return 0;
  n = n * 2;
  if(n == 2) return 1;
  var p = .3 * 1.5;
  var s = p / 4;
  if(n < 1){
    n -= 1;
    return -.5 * (Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p));
  }
  n -= 1;
  return .5 * (Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p)) + 1;
};
function DampedOscillation (n) {
  const oscillations = 5;
  return 1 - Math.cos(n * 2 * Math.PI * oscillations) * (1 - QuadOut(n));
}


/***/ }),
/* 9 */
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
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export simplifyPaths */
/* harmony export (immutable) */ __webpack_exports__["a"] = parseColor;
/* harmony export (immutable) */ __webpack_exports__["b"] = applyMixin;
/**
 * This function simplifies paths which are really just path segments
 * by joining up adjacent segments.
 * @param {array} paths - Array of arrays of numbers
 * @return {array} Array of arrays of numbers
 */
/**
 * This function simplifies paths which are really just path segments
 * by joining up adjacent segments.
 * @param {array} paths - Array of arrays of numbers
 * @return {array} Array of arrays of numbers
 */ function simplifyPaths(paths) {
    var out = [], current, x, y;
    paths.forEach(function (path) {
        if (path.length == 4) {
            if (path[0] == x && path[1] == y) {
                x = path[2];
                y = path[3];
                current.push(x, y);
            }
            else {
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
const hexColor = /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i;
const hexColorShort = /#([0-9a-f])([0-9a-f])([0-9a-f])/i;
const rgbRegex = /rgba?\((1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]),(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]),(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:,(0(?:.\d+)|1(?:.0)?))?\)/;
function parseColor(str) {
    let match = str.match(hexColor) || str.match(hexColorShort);
    if (match) {
        const out = [
            parseInt(match[1], 16),
            parseInt(match[2], 16),
            parseInt(match[3], 16),
            1
        ];
        return out;
    }
    match = str.match(rgbRegex);
    if (match) {
        const out = [
            parseInt(match[1], 10),
            parseInt(match[2], 10),
            parseInt(match[3], 10),
            match[4] ? parseFloat(match[4]) : 1,
        ];
        return out;
    }
}
class Events {
    constructor() {
        this._events = {};
    }
    on(event, callback) {
        if (!this._events[event]) {
            this._events[event] = [];
        }
        this._events[event].push(callback);
    }
    fire(event, ...params) {
        var callbacks = this._events[event];
        if (callbacks && callbacks.length) {
            callbacks.forEach(callback => {
                callback.apply(this, params);
            });
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = Events;

function applyMixin(constructor, mixin) {
    Object.getOwnPropertyNames(mixin.prototype).forEach(name => {
        constructor.prototype[name] = mixin.prototype[name];
    });
}


/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);

/**
 * Render systems require a camera. Use this class to create one.
 * @param {number} width
 * @param {number} height
 */
class CameraSystem extends __WEBPACK_IMPORTED_MODULE_0__core_GameObject__["a" /* default */] {
    constructor() {
        super(...arguments);
        this.pruneList = [];
        this.suspendedObjects = [];
        this.skewX = 0;
        this.skeyY = 0;
        this.scaleX = 1;
        this.scaleY = 1;
        // getTransformMatrix () {
        // 	// var m = new Matrix(this.shearMatrix);
        // 	// m.multiplyBy(this.scaleMatrix);
        // 	// m.multiplyBy(this.rotMat);
        // 	return this.transformMatrix;
        // }
        // update (delta) {
        // 	super.update(delta);
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
        // }
    }
    /**
     * Set the scale to render at
     * @param {number} scaleX
     * @param {number} scaleY - Default: scaleX
     */
    setScale(scaleX, scaleY) {
        scaleY = scaleY || scaleX;
        this.scaleX = scaleX;
        this.scaleY = scaleY;
    }
    addManagerForPruning(objectManager) {
        this.pruneList.push(objectManager);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = CameraSystem;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2__);


const u = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const n = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const w = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const p = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const r = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const q = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const s = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const q_p = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
const v = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.create();
/**
 * Component which interacts with the background system to bounce an object off surfaces.
 * @extends {GameComponent}
 * @param {BackgroundCollisionSystem} backgroundSystem - Where can I find surfaces to collide with.
 * @param {array} collisionBounds - Default bounds array for the parent object
 * @memberof Collision
 */
class BackgroundCollisionComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor(backgroundSystem, collisionBounds) {
        super();
        this.coefficientFriction = BackgroundCollisionComponent.COEFFICIENT_FRICTION;
        this.coefficientRestitution = BackgroundCollisionComponent.COEFFICIENT_RESTITUTION;
        this.background = backgroundSystem;
        this.bounds = collisionBounds;
    }
    update(parent, delta) {
        // This logic should probably be moved to BackgroundCollisionSystem
        var surfaces = this.background.surfaces, j = 0, m = surfaces.length, c, l, i, p_t, p_u, 
        //theta,
        f = this.coefficientFriction, e = this.coefficientRestitution, parentX = parent.position[0], parentY = parent.position[1], lastPosition = this.position;
        if (lastPosition[0] &&
            Math.abs(lastPosition[0] - parentX) < 100 &&
            Math.abs(lastPosition[1] - parentY) < 100) {
            for (; j < m; j++) {
                c = surfaces[j],
                    l = c.length;
                for (i = 0; i < l - 3; i += 2) {
                    // http://stackoverflow.com/questions/563198/how-do-you-detect-where-two-line-segments-intersect
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.set(p, c[i], c[i + 1]);
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.set(r, c[i + 2], c[i + 3]);
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.subtract(r, r, p);
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.copy(q, lastPosition);
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.subtract(s, parent.position, q);
                    //theta = s.angle();
                    //s.add(0,this.bounds*Math.cos(theta));
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.subtract(q_p, q, p);
                    p_t = cross(q_p, s) / cross(r, s);
                    p_u = cross(q_p, r) / cross(r, s);
                    if (p_t >= 0 && p_t <= 1 && p_u >= 0 && p_u <= 1) {
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.copy(parent.position, lastPosition);
                        // http://stackoverflow.com/questions/573084/how-to-calculate-bounce-angle
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.set(n, -r[1], r[0]); // this is the normal to the surface
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.normalize(n, n);
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.copy(v, parent.velocity);
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.scale(u, n, __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.dot(n, v));
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.subtract(w, v, u);
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.scale(w, w, f);
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.scale(u, u, e);
                        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.subtract(parent.velocity, w, u);
                        break;
                    }
                }
            }
        }
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.copy(lastPosition, parent.position);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackgroundCollisionComponent;

BackgroundCollisionComponent.COEFFICIENT_FRICTION = 0.95;
BackgroundCollisionComponent.COEFFICIENT_RESTITUTION = 0.4;
function cross(a, b) {
    return a[0] * b[1] - a[1] * b[0];
}


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObject__ = __webpack_require__(2);

/**
 * A subclass of {@link GameObject} which manages its own children.
 */
class GameObjectManager extends __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */] {
    constructor() {
        super(...arguments);
        this.objects = [];
        this._objectsToBeRemoved = [];
    }
    /**
     * Add an object to be updated as children of this manager. Children are given a
     * property <code>parent</code> pointing to this <code>GameObjectManager</code>.
     * @param {GameObject} object - Game object to be attached to this node in the tree
     * @return {GameObjectManager} Returns a reference to this for chainability
     */
    addObject(object) {
        if (object instanceof __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */])
            this.objects.push(object);
        // object.parent = this;
        return this;
    }
    /**
     * Add an object to be updated as children of this manager at particular place
     * in the list of children.
     * @param {GameObject} object - Game object to be attached to this node in the tree
     * @param {number} index - Position in the list
     * @return {GameObjectManager} Returns a reference to this for chainability
     */
    addObjectAt(object, index) {
        if (object instanceof __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */])
            this.objects.splice(index, 0, object);
        // object.parent = this;
        return this;
    }
    /**
     * Remove a previously added object from this manager.
     * @param {GameObject} object - Game object to be removed
     * @return {GameObjectManager} Returns a reference to this for chainability
     */
    removeObject(object) {
        if (object instanceof __WEBPACK_IMPORTED_MODULE_0__GameObject__["a" /* default */])
            this._objectsToBeRemoved.push(object);
        // if(object.parent == this) { object.parent = null; }
        return this;
    }
    /**
     * Remove all previously added objects from this manager.
     * @return {GameObjectManager} Returns a reference to this for chainability
     */
    removeAll() {
        this.objects.length = 0;
    }
    /**
     * This method is inherited from {@link GameObject}. It will first call update
     * on each of its components like an ordinary {@link GameObject} but then it
     * will start updating all of its child nodes.
     * @param {number} delta - Time since last frame in milliseconds
     */
    update(delta) {
        super.update(delta);
        var i = 0, l = this.objects.length, m, j = 0;
        for (i = 0; i < l; i++) {
            this.objects[i].update(delta);
        }
        m = this._objectsToBeRemoved.length;
        for (; j < m; j++) {
            i = 0;
            for (; i < l; i++) {
                if (this.objects[i] == this._objectsToBeRemoved[j]) {
                    arrayRemoveItem.call(this.objects, i);
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
    toHTML() {
        var html = this.name, i;
        if (this.objects.length > 1)
            html += " (" + this.objects.length + " items)";
        if (this.components.length) {
            html += "<ul>";
            for (i = 0; i < this.components.length; i++)
                html += "<li>" + this.components[i].toHTML();
            html += "</ul>";
        }
        if (this.objects.length) {
            html += "<ul>";
            for (i = 0; i < this.objects.length; i++)
                html += "<li>" + this.objects[i].toHTML();
            html += "</ul>";
        }
        return html;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GameObjectManager;

function arrayRemoveItem(from, to) {
    var rest = this.slice((to || from) + 1 || this.length);
    this.length = from < 0 ? this.length + from : from;
    return this.push.apply(this, rest);
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2__);


class MoveToClickComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor(input) {
        super();
        this.input = input;
    }
    update(parent, delta) {
        if (this.input.hasClick) {
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec2___default.a.copy(parent.position, this.input.lastClick);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MoveToClickComponent;



/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);

/**
 * Bounce off the walls of a world.
 * @param {WorldSystem} worldSystem - The world the parent object is in.
 * @param {number} width - Default width if parent has no bounds
 * @param {number} height - Default height if parent has no bounds
 * @param {number} thickness - Default thickness if parent has no bounds
 * @memberof World
 */
class WorldBounceComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {
    constructor(worldSystem, width = 0, height = 0, thickness = 0) {
        super();
        this.cRestitution = 1;
        this.cFriction = 1;
        this.worldSystem = worldSystem;
        this.ax = width / 2;
        this.ay = height / 2;
        this.az = thickness / 2;
    }
    update(parent, delta) {
        const coef = this.cRestitution;
        const friction = this.cFriction;
        const worldBounds = this.worldSystem.bounds;
        const parentBounds = parent.bounds;
        let bx1, by1, bx2, by2, bz1, bz2;
        if (parentBounds) {
            bx1 = worldBounds[0] - parentBounds[0];
            by1 = worldBounds[1] - parentBounds[1];
            bx2 = worldBounds[2] - parentBounds[2];
            by2 = worldBounds[3] - parentBounds[3];
            bz1 = worldBounds[4] - parentBounds[4];
            bz2 = worldBounds[5] - parentBounds[5];
        }
        else {
            bx1 = worldBounds[0] + this.ax;
            by1 = worldBounds[1] + this.ay;
            bx2 = worldBounds[2] - this.ax;
            by2 = worldBounds[3] - this.ay;
            bz1 = worldBounds[4] + this.az;
            bz2 = worldBounds[5] - this.az;
        }
        // hasBounced: 1: x, 2: y, 3: z
        parent.hasBounced = false;
        if (parent.position[0] < bx1) {
            parent.position[0] = bx1;
            parent.velocity[0] = -parent.velocity[0] * coef;
            parent.velocity[1] = parent.velocity[1] * friction;
            parent.velocity[2] = parent.velocity[2] * friction;
            parent.hasBounced = 1;
        }
        else if (parent.position[0] > bx2) {
            parent.position[0] = bx2;
            parent.velocity[0] = -parent.velocity[0] * coef;
            parent.velocity[1] = parent.velocity[1] * friction;
            parent.velocity[2] = parent.velocity[2] * friction;
            parent.hasBounced = 1;
        }
        if (parent.position[1] < by1) {
            parent.position[1] = by1;
            parent.velocity[1] = -parent.velocity[1] * coef;
            parent.velocity[0] = parent.velocity[0] * friction;
            parent.velocity[2] = parent.velocity[2] * friction;
            parent.hasBounced = 2;
        }
        else if (parent.position[1] > by2) {
            parent.position[1] = by2;
            parent.velocity[1] = -parent.velocity[1] * coef;
            parent.velocity[0] = parent.velocity[0] * friction;
            parent.velocity[2] = parent.velocity[2] * friction;
            parent.hasBounced = 2;
        }
        if (parent.position[2] < bz1) {
            parent.position[2] = bz1;
            parent.velocity[2] = -parent.velocity[2] * coef;
            parent.velocity[0] = parent.velocity[0] * friction;
            parent.velocity[1] = parent.velocity[1] * friction;
            parent.hasBounced = 3;
        }
        else if (parent.position[2] > bz2) {
            parent.position[2] = bz2;
            parent.velocity[2] = -parent.velocity[2] * coef;
            parent.velocity[0] = parent.velocity[0] * friction;
            parent.velocity[1] = parent.velocity[1] * friction;
            parent.hasBounced = 3;
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = WorldBounceComponent;


/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);

/**
 * When parent goes outside of world bounds wrap to the opposite wall.
 * @param {WorldSystem} worldSystem - Which world is the parent in.
 * @memberof World
 */
class WorldWrapComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {
    constructor(worldSystem) {
        super();
        this.worldSystem = worldSystem;
    }
    update(parent, delta) {
        const ax = this.worldSystem.bounds[0];
        const ay = this.worldSystem.bounds[1];
        const bx = this.worldSystem.bounds[2];
        const by = this.worldSystem.bounds[3];
        const az = this.worldSystem.bounds[4];
        const bz = this.worldSystem.bounds[5];
        if (parent.position[0] < ax
            && parent.velocity[0] < 0) {
            parent.position[0] = bx;
            this.fire("wrap", parent);
        }
        else if (parent.position[0] > bx
            && parent.velocity[0] > 0) {
            parent.position[0] = ax;
            this.fire("wrap", parent);
        }
        if (parent.position[1] < ay
            && parent.velocity[1] < 0) {
            parent.position[1] = by;
            this.fire("wrap", parent);
        }
        else if (parent.position[1] > by
            && parent.velocity[1] > 0) {
            parent.position[1] = ay;
            this.fire("wrap", parent);
        }
        if (parent.position[2] < az
            && parent.velocity[2] < 0) {
            parent.position[2] = bz;
            this.fire("wrap", parent);
        }
        else if (parent.position[2] > bz
            && parent.velocity[2] > 0) {
            parent.position[2] = az;
            this.fire("wrap", parent);
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = WorldWrapComponent;


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



const sCBVdelta = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
const sCBVmtd = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
const sCBVv = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
const sCBVmtdNorm = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
const sCBVimpulse = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();

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
class BounceComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {
	constructor () {
		super();

		/** Coefficient of restitution. */
		this.cRestitution = 0.9;
	}

	init (parent) {
		parent.on("attack", other => {

			const aWidth = parent.bounds[2] - parent.bounds[0];
			const aHeight = parent.bounds[3] - parent.bounds[1];
			const bWidth = other.bounds[2] - other.bounds[0];
			const bHeight = other.bounds[3] - other.bounds[1];
			const aRad = (aWidth + aHeight) / 2;
			const bRad = (bWidth + bHeight) / 2;

			const minDist = (aRad + bRad) / 2;
            const curDist = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.dist(parent.position, other.position);

			if(curDist < minDist){
				// http://stackoverflow.com/q/345838
				// get the mtd
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.subtract(sCBVdelta, parent.position, other.position);

				// minimum translation distance to push balls apart after intersecting
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scale(sCBVmtd, sCBVdelta, (minDist - curDist) / curDist);

				// resolve intersection --
				// inverse mass quantities
				const im1 = 1 / (parent.mass || 1);
				const im2 = 1 / (other.mass || 1);

				// push-pull them apart based off their mass
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.position, parent.position, sCBVmtd, im1 / (im1 + im2));
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(other.position, other.position, sCBVmtd, -im2 / (im1 + im2));

				// impact speed
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.subtract(sCBVv, parent.velocity, other.velocity);
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.normalize(sCBVmtdNorm, sCBVmtd);
				const vn = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.dot(sCBVv, sCBVmtdNorm)

				// sphere intersecting but moving away from each other already
				if (vn > 0) return;

				// collision impulse
				const i = (-(1 + this.cRestitution) * vn) / (im1 + im2);
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scale(sCBVimpulse, sCBVmtdNorm, i);

				// change in momentum
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.velocity, parent.velocity, sCBVimpulse, im1);
				__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(other.velocity, other.velocity, sCBVimpulse, -im2);
			}
		});
	}
}

/* harmony default export */ __webpack_exports__["a"] = BounceComponent;


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);


/**
 * This component registers the parent object with collision system.
 * It can handle configurations where the parent is both attack and vulnerable.
 * @extends {GameComponent}
 * @param {CollisionSystem} collisionSystem - Which CollisionSystem to report to
 * @param {boolean} attack - Can this object attack?
 * @param {boolean} vulnerable - Is this object vulnerable?
 * @memberof Collision
 */
class CollisionComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {

	constructor (collisionSystem, attack, vulnerable) {
		super();

		this.collisionSystem = collisionSystem;
		this.attack = attack;
		this.vulnerable = vulnerable;
	}

	update (parent, delta){
		if(this.attack)
			this.collisionSystem.addAttackObject(parent);

		if(this.vulnerable)
			this.collisionSystem.addVulnerableObject(parent);
	}
}

/* harmony default export */ __webpack_exports__["a"] = CollisionComponent;


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);


/**
 * Submit temporary surfaces to BackgroundCollisionSystem every frame.
 * These are added relative to parent object. This is useful if the parent
 * object is a moving platform for example.
 * @extends {GameComponent}
 * @param {BackgroundCollisionSystem} backgroundSystem - Where can I add my surfaces.
 * @param {array} lineSegments - Line segments to add. These are polylines e.g. <code>[x1, y1, x2, y2, ..., xn, yn]</code>
 * @memberof Collision
 */
class SolidComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {
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

/* harmony default export */ __webpack_exports__["a"] = SolidComponent;


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);


/**
 * Commponent which checks the input system for clicks which occured with
 * its parents bounds then reports such click to the parent.
 * @class ClickComponent
 * @extends {GameComponent}
 * @param {InputSystem} inputSystem - Where to listen to for clicks
 */
class ClickComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {
  constructor (inputSystem) {
    super();

    this.inputSystem = inputSystem;
  }

  update (parent, delta) {
    if(parent.bounds && this.inputSystem.hasClick) {
      const click = this.inputSystem.lastClick;
      const pos = parent.position;
      const bounds = parent.bounds;

      if  (bounds[0] + pos[0] < click[0]
        && bounds[1] + pos[1] < click[1]
        && bounds[2] + pos[0] > click[0]
        && bounds[3] + pos[1] > click[1]) {
          this.fire('click', parent);
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ClickComponent;


/***/ }),
/* 21 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);


class DotRenderComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (renderSystem, color = "#000") {
        super();

        this.renderSystem = renderSystem;
        this.color = color;
    }

    update (parent, delta) {
        const b = parent.bounds;
        const p = parent.position;
        const r = parent.rotation;
        const s = parent.size;
        const c = parent.color || parent.colour || this.color;

        this.renderSystem.push(ctx => {
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.translate(p[0], p[1]);
            ctx.rotate(r);
            if(b) ctx.scale(b[2] - b[0], b[3] - b[1]);
            else if(s) ctx.scale(s, s);
            ctx.arc(0, 0, 0.5, 0, Math.PI*2, false);
            ctx.fill();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DotRenderComponent;



/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);


class RectangleRenderComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (renderSystem, color = "#000") {
        super();

        this.renderSystem = renderSystem;
        this.color = color;
    }

    update (parent, delta) {
        const b = parent.bounds;
        const p = parent.position;
        const s = parent.size;
        const r = parent.rotation;
        const c = parent.color || parent.colour || this.color;

        this.renderSystem.push(ctx => {
            ctx.beginPath();
            ctx.fillStyle = c;
            ctx.translate(p[0], p[1]);
            ctx.rotate(r);
            if(b) ctx.rect(b[0], b[1], b[2] - b[0], b[3] - b[1]);
            else if(s) ctx.rect(-s/2, -s/2, s, s);
            ctx.fill();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RectangleRenderComponent;



/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);


class TextRenderComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
  constructor (renderSystem, text, x, y, font = "10px sans-serif", color = "#000") {
    super();
    this.renderSystem = renderSystem;
    this.text = text;
    this.font = font;
    this.color = color;
    this.setPosition(x, y);
  }
  update (parent, delta) {
    this.renderSystem.push(ctx => {
      ctx.translate(parent.position[0], parent.position[1]);
      ctx.translate(this.position[0], this.position[1]);
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.fillText(this.text, 0, 0);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TextRenderComponent;



/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);


// Working Vectors
const vecSeparation = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
const vecAlign = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
const vecCohesion = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
const vecSpare = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
/**
 * <p>Objects with this component will try to 'flock' together. There are three effects Working
 * together to produce flocking behaviour.
 * <p>The parent object will be attracted to the average position of objects within the
 * {@link FlockingComponent.NEIGHBOUR_RADIUS}, this is called cohesion.
 * <p>The parent object wil try to move in the average direction of all the other objects within
 * the neighbourhood, this is called alignment.
 * <p>The parent object will try to move away from object with the
 * {@link FlockingComponent.SEPARATION_RADIUS}, this is called separation.
 * @param {array} flock - An array of game objects which are considered to be in the same flock.
 */
class FlockingComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor(flock) {
        super();
        this.flock = flock;
    }
    update(parent, delta) {
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.set(vecCohesion, 0, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.set(vecAlign, 0, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.set(vecSeparation, 0, 0, 0);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.set(vecSpare, 0, 0, 0);
        let count = 0;
        const length = this.flock.length;
        for (let i = 0; i < length; i++) {
            const other = this.flock[i];
            const dist = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.dist(other.position, parent.position);
            if (dist > 0 && dist < FlockingComponent.NEIGHBOUR_RADIUS) {
                __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.add(vecCohesion, vecCohesion, other.position);
                __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.add(vecAlign, vecAlign, other.velocity);
                if (dist < FlockingComponent.SEPARATION_RADIUS) {
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.subtract(vecSpare, parent.position, other.position);
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.normalize(vecSpare, vecSpare);
                    __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(vecSeparation, vecSeparation, vecSpare, 1 / dist);
                }
                count++;
            }
        }
        if (count > 0) {
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scale(vecCohesion, vecCohesion, 1 / count);
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.subtract(vecCohesion, vecCohesion, parent.position);
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.velocity, parent.velocity, vecCohesion, FlockingComponent.COHESION_WEIGHT);
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.velocity, parent.velocity, vecAlign, FlockingComponent.ALIGN_WEIGHT / count);
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.velocity, parent.velocity, vecSeparation, FlockingComponent.SEPARATION_WEIGHT / count);
            var mag = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.length(parent.velocity);
            if (mag > FlockingComponent.MAX_SPEED) {
                __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scale(parent.velocity, parent.velocity, FlockingComponent.MAX_SPEED / mag);
            }
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FlockingComponent;

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
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject_ts__ = __webpack_require__(2);

/**
 * Class to play audio at specific points during gameplay
 *
 * This is a very basic implementaion which is limited to one sound effect at a time.
 * It is possible to enhance this class to provide multi-track playback.
 * @extends {GameObject}
 */
class AudioSystem extends __WEBPACK_IMPORTED_MODULE_0__core_GameObject_ts__["a" /* default */] {
    constructor() {
        super();
        // this.context = new AudioContext();
    }
    /**
     * Queue a sound to be played at the start of the next frame
     * @param {object} res - Audio "texture" containing Audio resource
     */
    playSound(res) {
        // Real implementation should add audio to queue to play at start of next frame etc.
        if (res.audio) {
            res.audio.play();
        }
    }
}
/* harmony default export */ __webpack_exports__["a"] = AudioSystem;


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__GameObjectManager__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CameraSystem__ = __webpack_require__(11);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__render_CanvasRenderSystem__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__world_WorldSystem__ = __webpack_require__(7);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__input_InputSystem__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util__ = __webpack_require__(10);






var State;
(function (State) {
    State[State["STATE_PAUSED"] = 0] = "STATE_PAUSED";
    State[State["STATE_PLAYING"] = 1] = "STATE_PLAYING";
    State[State["STATE_STOPPED"] = 2] = "STATE_STOPPED";
    State[State["STATE_DEAD"] = 3] = "STATE_DEAD";
})(State || (State = {}));
let _lastTime = 0;
const _raf = (typeof window !== "undefined" && window.requestAnimationFrame) || function (callback, element) {
    var currTime = new Date().getTime();
    var timeToCall = Math.max(0, 16 - (currTime - _lastTime));
    var id = setTimeout(function () { callback(currTime + timeToCall); }, timeToCall);
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
class Game {
    constructor({ canvas, width, height, score, lives, level, autosize, originCentric } = {
            canvas: null,
            width: 0,
            height: 0,
            score: 0,
            lives: 0,
            level: 0,
            autosize: false,
            originCentric: false,
        }) {
        /**
         * The root {@link GameObject} from which the object tree grows. This is the
         * input point for the loop to inject the time delta. All objects wanting updated
         * need to be a child or grandchild of this object.
         */
        this.root = new __WEBPACK_IMPORTED_MODULE_0__GameObjectManager__["a" /* default */]();
        this.textures = [];
        this.sounds = [];
        /** Counter of how many frames have been rendered so far. */
        this.frame = 0;
        /** Current game time in milliseconds. */
        this.time = 0;
        /** Keeps track of an arbritary score. */
        this.score = 0;
        /** Keeps track of an arbritary number of lives. */
        this.lives = 0;
        /** Tracks what level the game is running. Don't change this directly use {@link Game#setLevel} instead. */
        this.level = 0;
        this.originCentric = false;
        /** Number of resources currently pending. */
        this._toLoad = 0;
        this._lastTime = 0;
        this._loaded = 0;
        this._generalObjects = null;
        this._autosizeCallback = () => {
            if (!this.canvas)
                return;
            const width = this.canvas.offsetWidth;
            const height = this.canvas.offsetHeight;
            this.setSize(width, height);
            // Keep Camera centred
            if (this.cameraSystem) {
                this.cameraSystem.setPosition(width / 2, height / 2);
            }
            // Update bounds of the world
            // WARN: Does not retain previous world 'padding'
            if (this.worldSystem) {
                this.worldSystem.setBounds(0, 0, width, height);
            }
        };
        /**
         * Events mixin
         */
        this._events = {};
        /**
         * Canvas this game will render to.
         */
        this.canvas = canvas;
        /**
         * Width of game canvas. Use {@link Game#setSize} to change.
         * Explicit width takes priority.
         * @readonly
         */
        this.width = width || (this.canvas && this.canvas.width) || 0;
        /**
         * Height of game canvas. Use {@link Game#setSize} to change.
         * Explicit height takes priority.
         * @readonly
         */
        this.height = height || (this.canvas && this.canvas.height) || 0;
        if (this.canvas) {
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
        this.score = score;
        this.lives = lives;
        this.level = level;
        this.originCentric = originCentric;
        if (autosize) {
            this.setAutosize(true);
        }
    }
    /**
     * Add an object to the game. The object is not directly added to the root
     * GameObjectManager but is instead added to a special 'general objects'
     * manager which is guarenteed to be before the 'System' objects (i.e. InputSystem,
     * CameraSystem, RenderSystem).
     * @param {GameObject} object - The object to add.
     */
    addObject(object) {
        this._initialiseGeneralObjects();
        this._generalObjects.addObject(object);
    }
    /**
     * Replace the canvas of this game.
     *
     * <p>If there is a height and width set the new canvas will be intialised with them.
     *
     * <p>If height and width are unset they will be taken from the canvas size.
     * @param {HTMLCanvasElement} canvas - New canvas
     */
    setCanvas(canvas) {
        this.canvas = canvas;
        if (this.canvas) {
            this.width = this.width || this.canvas.width;
            this.height = this.height || this.canvas.height;
            this.canvas.width = this.width;
            this.canvas.height = this.height;
        }
    }
    /**
     * Provide an array of urls pointing to image resources and they will be loaded.
     *
     * <p>The return value of this method is a mapped array of texture objects.
     * @param {string[]} texturePaths - Array of urls
     * @return {Texture[]}
     */
    loadTextures(texturePaths) {
        this._toLoad += texturePaths.length;
        return texturePaths.map(path => {
            const texture = {
                image: new Image(),
                width: 0,
                height: 0,
                loaded: false
            };
            texture.image.onload = () => {
                texture.width = texture.image.width;
                texture.height = texture.image.height;
                texture.loaded = true;
                this._resourceLoaded(texture);
            };
            texture.image.onerror = function () {
                throw new Error("Failed to load a texture: " + path);
            };
            texture.image.src = path;
            this.textures.push(texture);
            return texture;
        });
    }
    /**
     * Provide an array of urls pointing to audio resources and they will be loaded.
     *
     * <p>The return value of this method is a mapped array of 'audio texture' objects.
     * @param {string[]} texturePaths - Array of urls
     * @return {AudioTexture[]}
     */
    loadAudio(audioPaths) {
        this._toLoad += audioPaths.length;
        return audioPaths.map(path => {
            const sound = {
                audio: new Audio(),
                length: 0,
                loaded: false
            };
            sound.audio.addEventListener("canplaythrough", () => {
                if (!sound.loaded) {
                    sound.length = sound.audio.duration;
                    sound.loaded = true;
                    this._resourceLoaded(sound);
                }
            });
            sound.audio.onerror = function () {
                throw new Error("Failed to load a sound: " + path);
            };
            sound.audio.src = path;
            this.sounds.push(sound);
            return sound;
        });
    }
    /**
     * Start the loop.
     */
    start() {
        this.nextLevel();
        this.state = State.STATE_PLAYING;
        this._loop();
    }
    /**
     * Stop the loop after the current frame.
     */
    stop() {
        this.state = State.STATE_STOPPED;
    }
    /**
     * Generate a default {@link CameraSystem} based on properties of this game.
     *
     * Calling this method will also add it to the game root after general objects.
     * @return {CameraSystem}
     */
    getDefaultCamera() {
        if (!this.cameraSystem) {
            this.cameraSystem = new __WEBPACK_IMPORTED_MODULE_1__CameraSystem__["a" /* default */]();
            if (!this.originCentric) {
                this.cameraSystem.setPosition(this.width / 2, this.height / 2);
            }
            this._initialiseGeneralObjects();
            this.root.addObject(this.cameraSystem);
        }
        return this.cameraSystem;
    }
    /**
     * <p>Generate a default {@link CanvasRenderSystem} based on properties set on
     * this game instance.
     *
     * Calling this method will also add it to the game root after general objects.
     * @return {CanvasRenderSystem}
     */
    getDefaultRenderer() {
        if (!this.renderSystem) {
            if (!this.cameraSystem) {
                this.getDefaultCamera();
            }
            let context;
            if (this.canvas)
                context = this.canvas.getContext("2d");
            this.renderSystem = new __WEBPACK_IMPORTED_MODULE_2__render_CanvasRenderSystem__["a" /* default */](context, this.cameraSystem);
            this._initialiseGeneralObjects();
            this.root.addObject(this.renderSystem);
        }
        return this.renderSystem;
    }
    /**
     * <p>Generate a default {@link WorldSystem} based on properties set on
     * this game instance.
     *
     * Calling this method will also add it to the game root after general objects.
     * @param {number} paddingX - (optional) Additional padding outside of canvas size. Default: 0
     * @param {number} paddingY - (optional) Additional padding outside of canvas size. Default: same as paddingX
     * @return {WorldSystem}
     */
    getDefaultWorld(paddingX = 0, paddingY = paddingX) {
        const bounds = [-paddingX, -paddingY, this.width + paddingX, this.height + paddingY];
        if (this.originCentric) {
            const halfWidth = this.width / 2;
            const halfHeight = this.height / 2;
            bounds[0] -= halfWidth;
            bounds[1] -= halfHeight;
            bounds[2] -= halfWidth;
            bounds[3] -= halfHeight;
        }
        if (!this.worldSystem) {
            this.worldSystem = new __WEBPACK_IMPORTED_MODULE_3__world_WorldSystem__["a" /* default */](bounds);
            this._initialiseGeneralObjects();
            this.root.addObject(this.worldSystem);
        }
        else {
            this.worldSystem.setBounds(...bounds);
        }
        return this.worldSystem;
    }
    /**
     * <p>Generate a default {@link InputSystem} based on properties set on
     * this game instance.
     *
     * Calling this method will also add it to the game root after general objects.
     * @return {InputSystem}
     */
    getDefaultInput() {
        if (!this.inputSystem) {
            if (!this.cameraSystem) {
                this.getDefaultCamera();
            }
            // params are: (screen, keyboard, camera)
            this.inputSystem = new __WEBPACK_IMPORTED_MODULE_4__input_InputSystem__["a" /* default */](this.canvas, typeof document !== "undefined" && document, this.cameraSystem);
            this._initialiseGeneralObjects();
            this.root.addObject(this.inputSystem);
        }
        return this.inputSystem;
    }
    /** Specify a new score
     * @param {number} score - New score.
     */
    setScore(score) {
        this.score = score;
        this.fire("score", this.score);
    }
    /** Move to the next level */
    nextLevel() {
        this.level++;
        this.fire("loadLevel", this.level);
    }
    /** Specify a level to jump to.
     * @param {number} level - Level number to jump to.
     */
    setLevel(level) {
        this.level = level;
        this.fire("loadLevel", this.level);
    }
    /**
     * <p>Send an event notifiying listeners that the level has been completed.
     * <p>This does not automatically move to the next level.
     */
    completeLevel() {
        this.fire("levelComplete", this.level);
    }
    /**
     * Set the size of the game. This will also set the canvas size.
     * @param {number} width - Size in pixels
     * @param {number} height - Size in pixels
     */
    setSize(width, height) {
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
    setAutosize(enable) {
        if (typeof window !== "undefined") {
            if (enable) {
                window.addEventListener("resize", this._autosizeCallback);
            }
            else {
                window.removeEventListener("resize", this._autosizeCallback);
            }
        }
    }
    _loop() {
        const loop = (time) => {
            if (time && this.time == time) {
                console.log("Multiple calls: " + time);
                return;
            }
            this.time = time;
            this.frame++;
            try {
                this.root.update(Math.min(time - this._lastTime, 100));
                if (this.state == State.STATE_PLAYING) {
                    _raf(loop);
                }
                this._lastTime = time;
            }
            catch (e) {
                if (window.console) {
                    console.error(e.stack || e);
                }
            }
        };
        loop(this._lastTime);
    }
    _resourceLoaded(resource) {
        this._loaded++;
        this.fire("resourcesProgress", this._loaded / this._toLoad);
        if (this._toLoad - this._loaded <= 0) {
            this.fire("resourcesLoaded");
        }
    }
    _initialiseGeneralObjects() {
        if (!this._generalObjects) {
            this._generalObjects = new __WEBPACK_IMPORTED_MODULE_0__GameObjectManager__["a" /* default */]();
            this.root.addObjectAt(this._generalObjects, 0);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Game;

Game.State = State;
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_5__util__["b" /* applyMixin */])(Game, __WEBPACK_IMPORTED_MODULE_5__util__["c" /* Events */]);


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PositionAnimationComponent__ = __webpack_require__(40);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BoundsAnimationComponent__ = __webpack_require__(38);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__ColorAnimationComponent__ = __webpack_require__(39);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__RotationAnimationComponent__ = __webpack_require__(41);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PropertyAnimationComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PositionAnimationComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__PositionAnimationComponent__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BoundsAnimationComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__BoundsAnimationComponent__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ColorAnimationComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__ColorAnimationComponent__["a"]; });
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RotationAnimationComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__RotationAnimationComponent__["a"]; });













/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__MoveComponent__ = __webpack_require__(43);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MoveComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__MoveComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__PhysicsComponent__ = __webpack_require__(44);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PhysicsComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__PhysicsComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__GravityComponent__ = __webpack_require__(35);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GravityComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__GravityComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__PointGravityComponent__ = __webpack_require__(45);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PointGravityComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__PointGravityComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__TerminalVelocityComponent__ = __webpack_require__(55);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TerminalVelocityComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__TerminalVelocityComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__FollowComponent__ = __webpack_require__(42);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FollowComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__FollowComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__RotationComponent__ = __webpack_require__(51);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RotationComponent", function() { return __WEBPACK_IMPORTED_MODULE_6__RotationComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__RotateToHeadingComponent__ = __webpack_require__(50);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RotateToHeadingComponent", function() { return __WEBPACK_IMPORTED_MODULE_7__RotateToHeadingComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__TrackRotationComponent__ = __webpack_require__(56);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TrackRotationComponent", function() { return __WEBPACK_IMPORTED_MODULE_8__TrackRotationComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__RandomPositionComponent__ = __webpack_require__(48);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RandomPositionComponent", function() { return __WEBPACK_IMPORTED_MODULE_9__RandomPositionComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__RandomVelocityComponent__ = __webpack_require__(49);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RandomVelocityComponent", function() { return __WEBPACK_IMPORTED_MODULE_10__RandomVelocityComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__RandomImpulseComponent__ = __webpack_require__(47);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RandomImpulseComponent", function() { return __WEBPACK_IMPORTED_MODULE_11__RandomImpulseComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__FlockingComponent__ = __webpack_require__(24);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "FlockingComponent", function() { return __WEBPACK_IMPORTED_MODULE_12__FlockingComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__SwitchComponent__ = __webpack_require__(54);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SwitchComponent", function() { return __WEBPACK_IMPORTED_MODULE_13__SwitchComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__PositionInterpolatorComponent__ = __webpack_require__(46);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PositionInterpolatorComponent", function() { return __WEBPACK_IMPORTED_MODULE_14__PositionInterpolatorComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__SmoothPositionComponent__ = __webpack_require__(52);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmoothPositionComponent", function() { return __WEBPACK_IMPORTED_MODULE_15__SmoothPositionComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__SmoothRotationComponent__ = __webpack_require__(53);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SmoothRotationComponent", function() { return __WEBPACK_IMPORTED_MODULE_16__SmoothRotationComponent__["a"]; });




























/** @deprecated */







/***/ }),
/* 29 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CollisionSystem__ = __webpack_require__(57);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CollisionSystem", function() { return __WEBPACK_IMPORTED_MODULE_0__CollisionSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__CollisionComponent__ = __webpack_require__(18);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CollisionComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__CollisionComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__BounceComponent__ = __webpack_require__(17);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BounceComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__BounceComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__BackgroundCollisionSystem__ = __webpack_require__(36);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundCollisionSystem", function() { return __WEBPACK_IMPORTED_MODULE_3__BackgroundCollisionSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__BackgroundCollisionComponent__ = __webpack_require__(12);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "BackgroundCollisionComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__BackgroundCollisionComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__SolidComponent__ = __webpack_require__(19);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "SolidComponent", function() { return __WEBPACK_IMPORTED_MODULE_5__SolidComponent__["a"]; });













/***/ }),
/* 30 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__DebugDrawBoundsComponent__ = __webpack_require__(58);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DebugDrawBoundsComponent", function() { return __WEBPACK_IMPORTED_MODULE_0__DebugDrawBoundsComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DebugDrawPathComponent__ = __webpack_require__(59);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DebugDrawPathComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__DebugDrawPathComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__DebugDrawSurfacesComponent__ = __webpack_require__(60);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DebugDrawSurfacesComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__DebugDrawSurfacesComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__DebugFlockingComponent__ = __webpack_require__(61);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DebugFlockingComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__DebugFlockingComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__PositionRenderComponent__ = __webpack_require__(62);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "PositionRenderComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__PositionRenderComponent__["a"]; });


// export { default as DebugDrawDataComponent } from './DebugDrawDataComponent';

// export { default as DebugDrawGraphComponent } from './DebugDrawGraphComponent';










/***/ }),
/* 31 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__InputSystem__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "InputSystem", function() { return __WEBPACK_IMPORTED_MODULE_0__InputSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__ClickComponent__ = __webpack_require__(20);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "ClickComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__ClickComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__MoveToClickComponent__ = __webpack_require__(14);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "MoveToClickComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__MoveToClickComponent__["a"]; });







/***/ }),
/* 32 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__CanvasRenderSystem__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasRenderSystem", function() { return __WEBPACK_IMPORTED_MODULE_0__CanvasRenderSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__DotRenderComponent__ = __webpack_require__(21);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "DotRenderComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__DotRenderComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__RectangleRenderComponent__ = __webpack_require__(22);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "RectangleRenderComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__RectangleRenderComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__TextRenderComponent__ = __webpack_require__(23);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "TextRenderComponent", function() { return __WEBPACK_IMPORTED_MODULE_3__TextRenderComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__sprite__ = __webpack_require__(37);
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "TileComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__sprite__["a"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SpriteRenderingComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__sprite__["b"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "SpriteAnimationComponent", function() { return __WEBPACK_IMPORTED_MODULE_4__sprite__["c"]; });
/* harmony namespace reexport (by provided) */ __webpack_require__.d(__webpack_exports__, "Sprite", function() { return __WEBPACK_IMPORTED_MODULE_4__sprite__["d"]; });











/***/ }),
/* 33 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__WorldSystem__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WorldSystem", function() { return __WEBPACK_IMPORTED_MODULE_0__WorldSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__WorldBounceComponent__ = __webpack_require__(15);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WorldBounceComponent", function() { return __WEBPACK_IMPORTED_MODULE_1__WorldBounceComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__WorldWrapComponent__ = __webpack_require__(16);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WorldWrapComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__WorldWrapComponent__["a"]; });







/***/ }),
/* 34 */
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

var glMatrix = __webpack_require__(9);

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
/* 35 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);

/**
 * Objects with this component will fall to the floor.
 */
class GravityComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    update(parent, delta) {
        if (typeof parent.velocity[1] == "undefined")
            parent.velocity[1] = 0;
        parent.velocity[1] += GravityComponent.GRAVITATIONAL_CONSTANT * delta;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = GravityComponent;

/** Gravitational Constant is the acceleration object will head towards the ground with. */
GravityComponent.GRAVITATIONAL_CONSTANT = 0.0003;


/***/ }),
/* 36 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);

/**
 * System to maintain list of polylines for collision detection.
 */
class BackgroundCollisionSystem extends __WEBPACK_IMPORTED_MODULE_0__core_GameObject__["a" /* default */] {
    constructor() {
        super(...arguments);
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
    addSurface(surface) {
        this.surfaces.push(surface);
    }
    /**
     * Add multiple permanent surfaces at once.
     * @param {array} surfaces - Array of arrays defining surfaces.
     */
    addSurfaces(surfaces) {
        for (var i = 0; i < surfaces.length; i++) {
            this.surfaces.push(surfaces[i]);
        }
    }
    /**
     * Remove all permanent surfaces.
     */
    clearSurfaces() {
        this.surfaces.length = 0;
    }
    /**
     * Add a temporary (single frame) surface
     * @param {array} surface - Array defining surface
     */
    addTemporarySurface(surface) {
        this.temporarySurfaces.push(surface);
    }
    update(delta) {
        super.update(delta);
        this.temporarySurfaces.length = 0;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BackgroundCollisionSystem;



/***/ }),
/* 37 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);

/**
 * Component for rendering backgrounds for example.
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Where to draw.
 * @param {object} texture - A texture object i.e {image: new Image(), width: 0, height: 0}
 * @param {array} bounds - How far and wide to render the images. Guaranteed to cover bounds.
 * @memberof Sprite
 */
class TileComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor(renderSystem, texture, bounds) {
        super();
        this.renderSystem = renderSystem;
        this.texture = texture;
        this.bounds = bounds;
    }
    update(parent, delta) {
        var renderSystem = this.renderSystem, texture = this.texture, bounds = this.bounds, dx = texture.width, dy = texture.height, startX = parent.position[0] % dx, startY = parent.position[1] % dy, x, y = bounds[1], // + startY - dy,
        width = bounds[2], height = bounds[3], render = function (texture, x, y) {
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
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TileComponent;

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
class SpriteRenderingComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor(renderSystem, layer, sprite) {
        super();
        this.renderSystem = renderSystem;
        this.layer = layer;
        this.sprite = sprite;
    }
    update(parent, delta) {
        super.update(delta);
        var sprite = this.sprite || parent.sprite, image = sprite && sprite.t.image;
        if (sprite) {
            this.renderSystem.push(function (context) {
                var x = parent.position[0], y = parent.position[1], w = sprite.w, h = sprite.h;
                context.translate(x, y);
                context.rotate(parent.rotation);
                context.drawImage(image, sprite.x, sprite.y, w, h, -sprite.ox, -sprite.oy, w, h);
            }, this.layer);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["b"] = SpriteRenderingComponent;

/**
 * Animate through a sequence of sprites.
 * @extends {GameComponent}
 * @param {number} duration - Default duration if sprites do no contain their own intrinsic duration.
 * @param {Sprite[]} sprites - Array of sprite objects.
 * @memberof Sprite
 */
class SpriteAnimationComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor(duration, sprites) {
        super();
        this.duration = duration;
        this.spriteIndex = 0;
        this.playing = true;
        this.sprites = sprites;
    }
    init(parent) {
        if (this.sprites) {
            parent.sprites = this.sprites;
        }
        if (parent.sprites.length) {
            parent.sprite = parent.sprites[0];
        }
        parent.spriteCountdown = (parent.sprite && parent.sprite.d) || this.duration;
    }
    update(parent, delta) {
        var spriteCount = parent.sprites.length, sprite, duration;
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
    play() {
        this.playing = true;
    }
    /**
     * Stop the animation and reset the frame to the first sprite.
     */
    stop() {
        this.playing = false;
        this.spriteIndex = 0;
    }
    /**
     * Pause the animation.
     */
    pause() {
        this.playing = false;
    }
}
/* harmony export (immutable) */ __webpack_exports__["c"] = SpriteAnimationComponent;

class Sprite {
    /**
     * Convenience method to generate a set of sprite objects based on a template and a spritesheet.
     * @param {object} sprite - The sprite template.
     * @param {number} rows - Number of rows in the sprite sheet.
     * @param {number} cols - Number of columns in the sprite sheet.
     * @return {Sprite[]}
     */
    static generateSpriteSheet(sprite, rows, cols) {
        var out = [], i, j;
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
    }
}
/* harmony export (immutable) */ __webpack_exports__["d"] = Sprite;



/***/ }),
/* 38 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__ = __webpack_require__(3);


const boundsFormatter = (parent, out) => { parent.setBounds(...out); };
class BoundsAnimationComponent extends __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__["a" /* default */] {
  constructor (start, end, duration=undefined, easing=undefined) {
    super(boundsFormatter, start, end, duration, easing);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = BoundsAnimationComponent;



/***/ }),
/* 39 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util__ = __webpack_require__(10);



function colorFormatter (parent, color) {
  parent.color = `rgba(${color[0]|0}, ${color[1]|0}, ${color[2]|0}, ${color[3]})`;
}

class ColorAnimationComponent extends __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__["a" /* default */] {
  constructor (start, end, duration=undefined, easing=undefined) {
    super(colorFormatter, __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* parseColor */])(start), __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__util__["a" /* parseColor */])(end), duration, easing);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = ColorAnimationComponent;



/***/ }),
/* 40 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__ = __webpack_require__(3);


const positionFormatter = (parent, out) => { parent.setPosition(...out); };
class PositionAnimationComponent extends __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__["a" /* default */] {
  constructor (start, end, duration=undefined, easing=undefined) {
    super(positionFormatter, start, end, duration, easing);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PositionAnimationComponent;



/***/ }),
/* 41 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__ = __webpack_require__(3);


const rotationFormatter = (parent, out) => { parent.setRotation(out[0]); };
class RotationAnimationComponent extends __WEBPACK_IMPORTED_MODULE_0__PropertyAnimationComponent__["a" /* default */] {
  constructor (start, end, duration=undefined, easing=undefined, loop=undefined) {
    super(rotationFormatter, start, end, duration, easing, loop);
  }

  update (parent, delta) {
    this.end[0] = this.rotation;

    super.update(parent, delta);
  }

  setRotation (rotation) {
    this.start[0] = this.rotation;
    this.end[0] = rotation;

    this.reset();

    super.setRotation(rotation);
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RotationAnimationComponent;



/***/ }),
/* 42 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



/**
 * Track another object's position
 * Also works like old FollowAtDistnaceComponent by setting a position on this component
 * @param {GameObject} object - Target object to follow
 */
class FollowComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (object) {
        super();
        this.target = object;
    }

    update (parent, delta) {
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.add(parent.position, this.target.position, this.position);
    }

    setTarget (object) {
        this.target = object;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = FollowComponent;



/***/ }),
/* 43 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



/**
 * Objects cannot move without this component.
 * @extends {GameComponent}
 */
class MoveComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    update (parent, delta) {
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.position, parent.position, parent.velocity, delta);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = MoveComponent;



/***/ }),
/* 44 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



/**
 * This component allows objects to respond to impulses.
 *
 * @example <caption>If parent has an impulse vector its contents will be added to the velocity.</caption>
 * // Apply impulse of 0.05 pixels per second in direction of x-axis
 * vec3.set(gameObject.impulse, 0.05, 0, 0);
 * @extends {GameComponent}
 */
class PhysicsComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    init (parent) {
        parent.impulse = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
    }

    update (parent, delta) {
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.add(parent.velocity, parent.velocity, parent.impulse);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.set(parent.impulse, 0, 0, 0);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PhysicsComponent;



/***/ }),
/* 45 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



class PointGravityComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (target) {
        super();
        this.target = target;
        this.vector = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
    }

    update (parent, delta) {
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.subtract(this.vector, this.target.position, parent.position);
        var scale = this.target.mass * delta / __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.squaredLength(this.vector);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.normalize(this.vector, this.vector);
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.velocity, parent.velocity, this.vector, scale);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PointGravityComponent;



/***/ }),
/* 46 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__Easing__ = __webpack_require__(8);




/**
 * Use more generic [X]AnimationComponents
 * @deprecated
 */
class PositionInterpolatorComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
  constructor (duration, easing) {
    super();
    this.duration = duration;
    this.easing = easing || __WEBPACK_IMPORTED_MODULE_2__Easing__["Linear"];
    this.elapsed = 0;
    this.running = false;
    this.starting = false;
    this.start = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
    this.position = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
  }

  update (parent, delta) {
    // The first frame we run after being told to interpolate somewhere
    // we need to gather some information from our parent
    if(this.starting){

      // If any co-ordinate is NaN this means the consumer wants to
      // retain those values from the parent
      if(isNaN(this.position[0])) this.position[0] = parent.position[0];
      if(isNaN(this.position[1])) this.position[1] = parent.position[1];
      if(isNaN(this.position[2])) this.position[2] = parent.position[2];

      // Linear interpolation requires that we remember where we started
      __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.copy(this.start, parent.position);

      this.running = true;
      this.starting = false;
      this.elapsed = 0;
    }

    if(this.running){
      var x = this.elapsed / this.duration,
          t = this.easing(x);

      if(x > 1){
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.copy(parent.position, this.position);
        this.running = false;
      }
      else {
        __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.lerp(parent.position, this.start, this.position, t);
        this.elapsed += delta;
      }
    }
  }

  setPosition (x, y, z) {
    super.setPosition(x, y, z);
    this.starting = true;
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PositionInterpolatorComponent;



/***/ }),
/* 47 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



class RandomImpulseComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (probability=0.001, maximumImpulse = 0.1) {
        super();

        this.probability = probability;
        this.maximumImpulse = maximumImpulse;
    }

    init (parent) {
        parent.impulse = parent.impulse || __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
    }

    update (parent, delta) {
        if(Math.random()<this.probability)
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.random(parent.impulse, Math.random() * this.maximumImpulse);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RandomImpulseComponent;



/***/ }),
/* 48 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



class RandomPositionComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (world, probability=0.001) {
        super();

        this.world = world;
        this.probability = probability;
    }

    update (parent, delta) {
        if(Math.random() < this.probability) {
            const b = this.world.bounds;
            const x = Math.random() * (b[2] - b[0]);
            const y = Math.random() * (b[3] - b[1]);
            const z = Math.random() * (b[5] - b[4]);
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.set(parent.position, x, y, z);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RandomPositionComponent;



/***/ }),
/* 49 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



class RandomVelocityComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (probability=0.001, maximumVelocity = 0.1) {
        super();

        this.probability = probability;
        this.maximumVelocity = maximumVelocity;
    }

    update (parent, delta) {
        if(Math.random()<this.probability)
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.random(parent.velocity, Math.random() * this.maximumVelocity);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RandomVelocityComponent;



/***/ }),
/* 50 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);


class RotateToHeadingComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    update (parent, delta) {
        parent.setRotation(Math.atan2(parent.velocity[0], -parent.velocity[1]));
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RotateToHeadingComponent;



/***/ }),
/* 51 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);


class RotationComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (dth) {
        super();
        this.rotationSpeed = dth;
    }

    update (parent, delta) {
        var w = parent.rotationSpeed || this.rotationSpeed || 0;
        parent.setRotation(parent.rotation + w * delta);
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = RotationComponent;



/***/ }),
/* 52 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



const diff = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();

class SmoothPositionComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor () {
        super();
        this.speed = 0.01;
        this.lastPosition = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.create();
    }

    update (parent, delta) {
        super.update(this, delta);

        const target = this.position;
        const speed = this.speed;

        // If the object isn't where we left it then that's the new target
        if (!__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.equals(this.lastPosition, parent.position)) {
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.copy(target, parent.position);
        }

        if (!__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.equals(this.lastPosition, target)) {
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.subtract(diff, target, this.lastPosition);
            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scaleAndAdd(parent.position, this.lastPosition, diff, delta * speed);

            __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.copy(this.lastPosition, parent.position);
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SmoothPositionComponent;



/***/ }),
/* 53 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);


class SmoothRotationComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    update (parent, delta) {
        if(this.lastRotation != parent.rotation)
            this.rotation = parent.rotation;

        if(this.rotation != parent.rotation) {
            var rotation = parent.rotation,
                target = this.rotation,
                diff = target - rotation,
                speed = 0.01;
            if(diff > Math.PI){
                diff -= Math.PI * 2;
            } else if (diff < -Math.PI){
                diff += Math.PI * 2;
            }
            parent.rotation = rotation + diff * delta * speed;
            this.lastRotation = parent.rotation;
        }
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SmoothRotationComponent;



/***/ }),
/* 54 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_GameComponent__ = __webpack_require__(0);



var addComponent = __WEBPACK_IMPORTED_MODULE_0__core_GameObject__["a" /* default */].prototype.addComponent;

/**
  * Component which conditionally activates child components.
  * @extends {GameComponent}
  */
class SwitchComponent extends __WEBPACK_IMPORTED_MODULE_1__core_GameComponent__["a" /* default */] {
  constructor (switchObject, switchProperty) {
    super();
    this.positiveComponents = [];
    this.negativeComponents = [];

    /**
      * The switch for whether the positive components are active or the negative ones. Default: true
      * @type {boolean}
      */
    this.active = true;

    this.object = switchObject;
    this.prop = switchProperty;
  }

  /**
    * Add a positive component. Synonomous with {@link SwitchComponent#addPositiveComponent}
    * @param {GameComponent} component - The component to add.
    */
  addComponent (component){
    this.components = this.positiveComponents;
    addComponent.call(this, component);
    this.components  = undefined;
  }

  /**
    * Add a positive component
    * @param {GameComponent} component - The component to add.
    */
  addPositiveComponent (component){
    this.components = this.positiveComponents;
    addComponent.call(this, component);
    this.components  = undefined;
  }

  /**
    * Add a negative component
    * @param {GameComponent} component - The component to add.
    */
  addNegativeComponent (component){
    this.components = this.negativeComponents;
    addComponent.call(this, component);
    this.components  = undefined;
  }

  /**
    * Add an array of positive components and negativeComponents
    * @param {GameComponent[]} positiveComponents - The components to add to the positive side.
    * @param {GameComponent[]} negativeComponents - The components to add to the negative side.
    */
  addComponents (positiveComponents, negativeComponents){
    positiveComponents.forEach(this.addPositiveComponent.bind(this));
    negativeComponents.forEach(this.addNegativeComponent.bind(this));
  }

  /**
    * Swap the active state from positive to negative or vice-versa.
    */
  flip () {
    this.setActive(!this.active);
  }

  /**
    * Explicitly set the active state.
    * @param {boolean} active - True means positive components will become active.
    */
  setActive (active) {
    this.active = active;

    if(this.object){
      this.object[this.prop] = this.active;
    }
  }

  update (parent, delta) {
    var i = 0,
        l;

    if(this.object){
      this.active = this.object[this.prop];
    }

    if(this.active){
      l = this.positiveComponents.length;
      for(;i<l;i++){
        this.positiveComponents[i].update(parent, delta);
      }
    } else {
      l = this.negativeComponents.length;
      for(;i<l;i++){
        this.negativeComponents[i].update(parent, delta);
      }
    }
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = SwitchComponent;



/***/ }),
/* 55 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



/**
 * Limit the velocity of an object.
 * @extends {GameComponent}
 * @param {number} velocity - Scalar maximum velocity.
 */
class TerminalVelocityComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {

	constructor (velocity) {
		super();

		this.velocityMagnitude = velocity;
	}

	update (parent, delta) {
		const v = __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.length(parent.velocity);

		if(v > this.velocityMagnitude){
			const scale = this.velocityMagnitude / v;
			__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default.a.scale(parent.velocity, parent.velocity, scale);
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TerminalVelocityComponent;



/***/ }),
/* 56 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_gl_matrix_src_gl_matrix_vec3__);



/**
 * Match a target object's rotation
 *
 * Rotation can bbe offset by setting this component's rotation as well
 * @param {GameObject} object - Target object
 */
class TrackRotationComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
    constructor (object) {
        super();
        this.target = object;
    }

    update (parent, delta) {
        parent.rotation = this.target.rotation + this.rotation;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = TrackRotationComponent;



/***/ }),
/* 57 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject_ts__ = __webpack_require__(2);


/** @namespace Collision */

/**
 * This system's purpose is to accept 'attack' and 'vulnerable' bounds to be submitted
 * then once per frame sweep these to find intersections. Any which are found are then
 * reported to the respective objects.
 * @extends {GameObject}
 * @memberof Collision
 */
class CollisionSystem extends __WEBPACK_IMPORTED_MODULE_0__core_GameObject_ts__["a" /* default */] {
	constructor () {
		super();

		this.attackObjects = [];
		this.vulnerableObjects = [];
	}

    /**
     * Add an object which can 'attack'
     * @param {GameObject} object
     */
	addAttackObject (object){
		this.attackObjects.push(object);
	}

    /**
     * Add an object which is 'vulnerable'
     * @param {GameObject} object
     */
	addVulnerableObject (object){
		this.vulnerableObjects.push(object);
	}

	update (delta) {
		const attackCount = this.attackObjects.length;
		const vulnerableCount = this.vulnerableObjects.length;


		for(let i = 0; i < attackCount; i++){
			const attack = this.attackObjects[i];
			const ax = attack.position[0];
			const ay = attack.position[1];
			const ab = attack.bounds;
			const attackBounds = [
				ax + ab[0],
				ay + ab[1],
				ax + ab[2],
				ay + ab[3]
			];

			for(let j = 0; j < vulnerableCount; j++){
				const vulnerable = this.vulnerableObjects[j];
				const vx = vulnerable.position[0];
				const vy = vulnerable.position[1];
				const vb = vulnerable.bounds;
				const vulnerableBounds = [
					vx + vb[0],
					vy + vb[1],
					vx + vb[2],
					vy + vb[3]
				];

				if(attack === vulnerable) {
					continue;
				}

				if(attackBounds[0] < vulnerableBounds[2] &&
					attackBounds[1] < vulnerableBounds[3] &&
					attackBounds[2] > vulnerableBounds[0] &&
					attackBounds[3] > vulnerableBounds[1] ) {

					attack.fire("attack", vulnerable);
					vulnerable.fire("attackedBy", attack);
				}
			}
		}
		this.attackObjects.length = 0;
		this.vulnerableObjects.length = 0;
	}
}

/* harmony default export */ __webpack_exports__["a"] = CollisionSystem;


/***/ }),
/* 58 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);


/**
 * It is sometimes useful to draw the bounds of an object or world for example.
 * @class DebugDrawBoundsComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where to draw the bounds
 */
class DebugDrawBoundsComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {

	constructor (renderSystem) {
		super();

		this.renderSystem = renderSystem;
	}

	update (parent, delta) {
		const bounds = parent.bounds;
		if(bounds){
			this.renderSystem.push(ctx => {
				ctx.translate(parent.position[0], parent.position[1]);
				// Don't rotate yet because collision components don't take rotation into account
				// ctx.rotate(parent.rotation);
				ctx.beginPath();
				ctx.rect(parent.bounds[0], parent.bounds[1], parent.bounds[2] - parent.bounds[0], parent.bounds[3] - parent.bounds[1]);
				ctx.strokeStyle = "#000";
				ctx.stroke();
			});
		}
	}
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DebugDrawBoundsComponent;



/***/ }),
/* 59 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_vec2__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_vec2___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_gl_matrix_src_gl_matrix_vec2__);




const PATH_SIZE = 1000;

/**
 * Component which traces out the path of an object
 * @class DebugDrawPathComponent
 * @extends {GameComponent}
 * @param {RenderSystem} renderSystem - Where to draw the path
 */
class DebugDrawPathComponent extends __WEBPACK_IMPORTED_MODULE_1__core_GameComponent__["a" /* default */] {
    constructor (renderSystem){
        super();

        this.path = [];
        this.currIndex = 0;
        this.lastVx = 0;
        this.lastVy = 0;
        this.renderSystem = renderSystem;

        this.path.length = PATH_SIZE;
    }

    update (parent, delta) {

        const px = parent.position[0],
            py = parent.position[1],
            vx = parent.velocity[0],
            vy = parent.velocity[1],
            ax = (vx - this.lastVx)/delta,
            ay = (vy - this.lastVy)/delta,
            p = this.path,
            prevIndex = (this.currIndex - 2 + PATH_SIZE) % PATH_SIZE,
            dx = Math.abs(p[prevIndex] - px),
            dy = Math.abs(p[prevIndex+1] - py);

        if(dx > 100 || dy > 100){
            p[this.currIndex] = NaN;
            p[this.currIndex+1] = NaN;
            this.currIndex = (this.currIndex + 2) % PATH_SIZE;
        }

        p[this.currIndex] = px;
        p[this.currIndex + 1] = py;

        // Draw Path

        this.renderSystem.push(ctx => {
            ctx.beginPath();

            ctx.moveTo(p[this.currIndex], p[this.currIndex+1]);

            for(let i = 2; i < PATH_SIZE; i += 2){
                let index = (this.currIndex + i) % PATH_SIZE;
                if(p[index]) {
                    ctx.lineTo(p[index], p[index+1]);
                }
                else {
                    i += 2;
                    index = (this.currIndex + i) % PATH_SIZE;
                    ctx.moveTo(p[index], p[index+1]);
                }
            }

            ctx.strokeStyle = "#CCC";
            ctx.stroke();
        });

        this.currIndex = (this.currIndex + 2) % PATH_SIZE;

        // Draw Velocity
        this.renderSystem.strokePath([px, py, px+vx*100, py+vy*100], "rgba(0,128,255,0.7)",0);

        // Draw Acceleration
        this.renderSystem.strokePath([px, py, px+ax*4e5, py+ay*4e5], "rgba(0,255,0,0.7)",0);
        this.lastVx = vx;
        this.lastVy = vy;
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DebugDrawPathComponent;



/***/ }),
/* 60 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__ = __webpack_require__(0);


/**
 * Component to draw surfaces from a BackgroundCollisionSystem. Will also draw surface normals.
 * @class DebugDrawSurfacesComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where to draw to.
 * @param {string} colour - Colour of surfaces
 */
class DebugDrawSurfacesComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent_ts__["a" /* default */] {
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
/* harmony export (immutable) */ __webpack_exports__["a"] = DebugDrawSurfacesComponent;



/***/ }),
/* 61 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__basic_FlockingComponent__ = __webpack_require__(24);



/**
 * Class to draw NEIGHBOUR_RADIUS and SEPARATION_RADIUS around objects
 * @class DebugFlockingComponent
 * @extends {GameComponent}
 * @param {CanvasRenderSystem} renderSystem - Where should this be drawn
 */
class DebugFlockingComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {

    constructor (renderSystem) {
        super();

        this.renderSystem = renderSystem;
    }

    update (parent, delta) {
        this.renderSystem.push(ctx => {
            ctx.translate(parent.position[0], parent.position[1]);
            ctx.beginPath();
            ctx.arc(0, 0, __WEBPACK_IMPORTED_MODULE_1__basic_FlockingComponent__["a" /* default */].NEIGHBOUR_RADIUS, 0, Math.PI * 2, false);
            ctx.strokeStyle = "#008";
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(0, 0, __WEBPACK_IMPORTED_MODULE_1__basic_FlockingComponent__["a" /* default */].SEPARATION_RADIUS, 0, Math.PI * 2, false);
            ctx.strokeStyle = "#800";
            ctx.stroke();
        });
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = DebugFlockingComponent;



/***/ }),
/* 62 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__ = __webpack_require__(0);


class PositionRenderComponent extends __WEBPACK_IMPORTED_MODULE_0__core_GameComponent__["a" /* default */] {
  constructor (renderSystem, font = "10px sans-serif", color = "#000") {
    super();
    this.renderSystem = renderSystem;
    this.font = font;
    this.color = color;
    // Font should start with an integer we can use as a size for the crosshairs
    this.size = parseInt(font, 10);
  }
  update (parent, delta) {
    const p = parent.position;
    const size = this.size;

    this.renderSystem.push(ctx => {
      ctx.translate(p[0], p[1]);
      ctx.strokeStyle = "#888";
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(-size, 0);
      ctx.lineTo(size, 0);
      ctx.moveTo(0, -size);
      ctx.lineTo(0, size);
      ctx.stroke();
      ctx.fillStyle = this.color;
      ctx.font = this.font;
      ctx.fillText(`${p[0]|0}, ${p[1]|0}`, size/2, -size/2);
    });
  }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = PositionRenderComponent;



/***/ }),
/* 63 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_GameObject__ = __webpack_require__(2);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GameObject", function() { return __WEBPACK_IMPORTED_MODULE_0__core_GameObject__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_GameObjectManager__ = __webpack_require__(13);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GameObjectManager", function() { return __WEBPACK_IMPORTED_MODULE_1__core_GameObjectManager__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__core_GameComponent__ = __webpack_require__(0);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "GameComponent", function() { return __WEBPACK_IMPORTED_MODULE_2__core_GameComponent__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__CameraSystem__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CameraSystem", function() { return __WEBPACK_IMPORTED_MODULE_3__CameraSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__render_CanvasRenderSystem__ = __webpack_require__(6);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "CanvasRenderSystem", function() { return __WEBPACK_IMPORTED_MODULE_4__render_CanvasRenderSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__world_WorldSystem__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "WorldSystem", function() { return __WEBPACK_IMPORTED_MODULE_5__world_WorldSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__input_InputSystem__ = __webpack_require__(5);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "InputSystem", function() { return __WEBPACK_IMPORTED_MODULE_6__input_InputSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__AudioSystem__ = __webpack_require__(25);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "AudioSystem", function() { return __WEBPACK_IMPORTED_MODULE_7__AudioSystem__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__core_Game__ = __webpack_require__(26);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "Game", function() { return __WEBPACK_IMPORTED_MODULE_8__core_Game__["a"]; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__basic__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__animation__ = __webpack_require__(27);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__Easing__ = __webpack_require__(8);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Easing", function() { return __WEBPACK_IMPORTED_MODULE_11__Easing__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__world__ = __webpack_require__(33);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "World", function() { return __WEBPACK_IMPORTED_MODULE_12__world__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__world_WorldBounceComponent__ = __webpack_require__(15);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__world_WorldWrapComponent__ = __webpack_require__(16);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__input__ = __webpack_require__(31);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Input", function() { return __WEBPACK_IMPORTED_MODULE_15__input__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__input_ClickComponent__ = __webpack_require__(20);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__input_MoveToClickComponent__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__collision__ = __webpack_require__(29);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Collision", function() { return __WEBPACK_IMPORTED_MODULE_18__collision__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__collision_CollisionComponent__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__collision_BounceComponent__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__collision_BackgroundCollisionComponent__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__collision_SolidComponent__ = __webpack_require__(19);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__render__ = __webpack_require__(32);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Render", function() { return __WEBPACK_IMPORTED_MODULE_23__render__; });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__render_DotRenderComponent__ = __webpack_require__(21);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__render_RectangleRenderComponent__ = __webpack_require__(22);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__render_TextRenderComponent__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__debug__ = __webpack_require__(30);
/* harmony reexport (module object) */ __webpack_require__.d(__webpack_exports__, "Debug", function() { return __WEBPACK_IMPORTED_MODULE_27__debug__; });
// Export core classes. GameObject, GameComponent etc.




// Export key systems. CameraSystem, CanvasRenderSystem etc.






// Export support classes. e.g. Game


const Components = {};
/* harmony export (immutable) */ __webpack_exports__["Components"] = Components;


// Export basic components

for(let name in __WEBPACK_IMPORTED_MODULE_9__basic__) {
  Components[name] = __WEBPACK_IMPORTED_MODULE_9__basic__[name];
}

// Export animation components

for(let name in __WEBPACK_IMPORTED_MODULE_10__animation__) {
  Components[name] = __WEBPACK_IMPORTED_MODULE_10__animation__[name];
}




// Export world namespace




Components['WorldBounceComponent'] = __WEBPACK_IMPORTED_MODULE_13__world_WorldBounceComponent__["a" /* default */];


Components['WorldWrapComponent'] = __WEBPACK_IMPORTED_MODULE_14__world_WorldWrapComponent__["a" /* default */];

// Export input namespace




Components['ClickComponent'] = __WEBPACK_IMPORTED_MODULE_16__input_ClickComponent__["a" /* default */];


Components['MoveToClickComponent'] = __WEBPACK_IMPORTED_MODULE_17__input_MoveToClickComponent__["a" /* default */];

// Export collision namespace




Components['CollisionComponent'] = __WEBPACK_IMPORTED_MODULE_19__collision_CollisionComponent__["a" /* default */];


Components['BounceComponent'] = __WEBPACK_IMPORTED_MODULE_20__collision_BounceComponent__["a" /* default */];


Components['BackgroundCollisionComponent'] = __WEBPACK_IMPORTED_MODULE_21__collision_BackgroundCollisionComponent__["a" /* default */];


Components['SolidComponent'] = __WEBPACK_IMPORTED_MODULE_22__collision_SolidComponent__["a" /* default */];

// Export render namespace




Components['DotRenderComponent'] = __WEBPACK_IMPORTED_MODULE_24__render_DotRenderComponent__["a" /* default */];


Components['RectangleRenderComponent'] = __WEBPACK_IMPORTED_MODULE_25__render_RectangleRenderComponent__["a" /* default */];


Components['TextRenderComponent'] = __WEBPACK_IMPORTED_MODULE_26__render_TextRenderComponent__["a" /* default */];

// Export debug




/***/ })
/******/ ]);
});