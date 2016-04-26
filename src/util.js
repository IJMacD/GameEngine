/**
 * This function simplifies paths which are really just path segments
 * by joining up adjacent segments
 */
function simplifyPaths(paths){
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
