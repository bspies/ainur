const get = require('lodash.get');
const update = require('lodash.update');

/**
 * Appends the value to the array of values at the given path.
 *
 * @param {Object} obj - The object containing the value to be appended
 * @param {string} path - The path to the value to be appended
 * @param {*} value - The value to append
 * @throws {Error} - If value at path is not an array
 */
function append(obj, path, value) {
  update(obj, path, (val) => {
    if (!val) {
      return [value];
    } else if (Array.isArray(val)) {
      return val.concat(value);
    }
    throw new Error(`Found type ${typeof val} at path '${path}', which is not an array`);
  });
}

/**
 * Gets the builder value from the configuration. If it is a deferred value, i.e.
 * a function, it is evaluated to retrieve the value which is then returned.
 *
 * @param {Object} builderConfig - The builder configuration
 * @param {string} path - The value path
 * @returns {*} - The value
 */
function getBuilderValue(builderConfig, path) {
  let val = get(builderConfig, path);
  if (typeof val === 'function') {
    val = val(builderConfig);
  }
  return val;
}

module.exports = {
  append,
  getBuilderValue
};
