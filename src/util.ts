/**
 * This function simplifies paths which are really just path segments
 * by joining up adjacent segments.
 * @param {array} paths - Array of arrays of numbers
 * @return {array} Array of arrays of numbers
 */
export function simplifyPaths(paths: number[][]){
  var out: number[][] = [],
      current: number[],
      x: number,
      y: number;
  paths.forEach(function(path: number[]){
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
