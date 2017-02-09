export const Linear = t => t;
export const QuadIn = t => t * t;
export const QuadOut = t => -t * (t - 2);
export const CircIn = t => 1-Math.sqrt(1-t*t);
export const CircOut = t => Math.sqrt(1-(t-1)*(t-1));
export const Smooth = t => t*t*(3-2*t);
// Stolen from Dojo:
// https://github.com/dojo/dwb/blob/master/src/main/webapp/js/build/amd_loader/fx/easing.js
export const SineIn = t => -1 * Math.cos(t * (Math.PI / 2)) + 1;
export const SineOut = t => Math.sin(t * (Math.PI / 2));
export const SineInOut = t => -1 * (Math.cos(Math.PI * t) - 1) / 2;
export function BackIn (t) {
  var s = 1.70158;
  return t * t * ((s + 1) * t - s);
};
export function BackOut (t) {
  var s = 1.70158;
  t = t - 1;
  return t*t*((s+1)*t + s) + 1;
};
export function BackInOut (t) {
  var s = 1.70158 * 1.525;
  t = t * 2;
  if(t < 1){ return (Math.pow(t, 2) * ((s + 1) * t - s)) / 2; }
  t-=2;
  return (Math.pow(t, 2) * ((s + 1) * t + s) + 2) / 2;
};
export function ElasticIn (n) {
  if(n == 0 || n == 1){ return n; }
  var p = .3;
  var s = p / 4;
  n = n - 1;
  return -1 * Math.pow(2, 10 * n) * Math.sin((n - s) * (2 * Math.PI) / p);
};
export function ElasticOut (n) {
  if(n==0 || n == 1){ return n; }
  var p = .3;
  var s = p / 4;
  return Math.pow(2, -10 * n) * Math.sin((n - s) * (2 * Math.PI) / p) + 1;
};
export function ElasticInOut (n) {
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
export function DampedOscillation (n) {
  const oscillations = 5;
  return 1 - Math.cos(n * 2 * Math.PI * oscillations) * (1 - QuadOut(n));
}
