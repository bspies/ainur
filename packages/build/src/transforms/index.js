/*
 * This module contains all of the transforms that are used to generate
 * a webpack configuration from the builder configuration. Each transform
 * must contain an `apply(builderConfig:Object)` function as an export, and
 * may optionally include a `predicate(builderConfig:Object):boolean`
 * function as a named export that includes/excludes application of the
 * transform from a given configuration.
 */
const transforms = [
  './exclude-src', './gen-html', './lint', './minimize', './sourcemaps'
];

/**
 * Loads all the transforms.
 */
function loadTransforms() {
  // flatten arrays of transforms
  return [].concat(...transforms.map(t => require(t))); // eslint-disable-line global-require
}

/**
 * Gets the array of builder transforms to execute in order
 * to generate the webpack configuration.
 *
 * @param {Object} builderConfig - The builder configuration
 */
function getTransforms(builderConfig) {
  return loadTransforms()
    .filter(t => !t.predicate || t.predicate(builderConfig))
    .map(t => t.apply || t /* if default export */);
}

module.exports = getTransforms;
