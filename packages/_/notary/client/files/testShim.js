/**
 * Fixes the following warning:
 * React depends on requestAnimationFrame. Make sure that you load a polyfill in older browsers. http://fb.me/react-polyfills
 * 
 * @link https://reactjs.org/docs/javascript-environment-requirements.html
 */
global.requestAnimationFrame = function(callback) {
  setTimeout(callback, 0);
};