/**
 * This function simplifies paths which are really just path segments
 * by joining up adjacent segments.
 * @param {array} paths - Array of arrays of numbers
 * @return {array} Array of arrays of numbers
 */
export function simplifyPaths(paths){
  var out = [],
      current,
      x,
      y;
  paths.forEach(function(path){
    if(path.length == 4){
      if(path[0] == x && path[1] == y){
        x = path[2];
        y = path[3];
        current.push(x, y);
      }
      else {
        if(current){
          out.push(current);
        }

        current = path.slice(0);
        x = path[2];
        y = path[3];
      }
    }
  });
  if(current){
    out.push(current);
  }
  return out;
}

const hexColor = /#([0-9a-f]{2})([0-9a-f]{2})([0-9a-f]{2})/i;
const hexColorShort = /#([0-9a-f])([0-9a-f])([0-9a-f])/i;
const rgbRegex = /rgba?\((1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]),(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5]),(1?[0-9]{1,2}|2[0-4][0-9]|25[0-5])(?:,(0(?:.\d+)|1(?:.0)?))?\)/;

export function parseColor (str) {

  let match = str.match(hexColor) || str.match(hexColorShort);
  if (match) {
    const out = [
      parseInt(match[1], 16),
      parseInt(match[2], 16),
      parseInt(match[3], 16),
      1
    ];
    out.format = "hex";
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
    out.format = "rgb";
    return out;
  }
}

export function eventMixin (constructor) {

    function on (event, callback) {
        if (!this._events) this._events = {};
        if (!this._events[event]){
            this._events[event] = [];
        }
        this._events[event].push(callback);
        return this;
    }

    function fire (event, ...params) {
        if (!this._events) this._events = {};
        var callbacks = this._events[event];

        if (callbacks && callbacks.length){
            callbacks.forEach(callback => {
                callback.apply(this, params);
            });
        }
    }

    constructor.prototype.on = on;
    constructor.prototype.fire = fire;
}
