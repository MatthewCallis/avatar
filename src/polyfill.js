/* eslint no-var: 0, vars-on-top: 0, no-extend-native: 0, no-else-return: 0, prefer-rest-params: 0, no-self-compare: 0 */
// https://developer.mozilla.org/en-US/docs/MDN/About#Copyrights_and_licenses
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/assign
/* istanbul ignore else */
if (typeof Object.assign !== 'function') {
  Object.assign = function assign(target) {
    /* istanbul ignore if */
    if (target == null) {
      throw new TypeError('Cannot convert undefined or null to object');
    }

    target = Object(target);
    for (var index = 1; index < arguments.length; index++) {
      var source = arguments[index];
      /* istanbul ignore else */
      if (source != null) {
        for (var key in source) {
          /* istanbul ignore else */
          if (Object.prototype.hasOwnProperty.call(source, key)) {
            target[key] = source[key];
          }
        }
      }
    }
    return target;
  };
}
