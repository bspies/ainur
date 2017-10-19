/*
 * This module contains all of the transforms that are used to generate
 * a webpack configuration from the builder configuration. Each transform
 * must contain an `apply(builderConfig:Object)` function as a default export
 * or named export, and may optionally include a `predicate(builderConfig:Object):boolean`
 * function as a named export that includes/excludes application of the transform from a given
 * configuration.
 */
import fs from 'fs';

/**
 * Loads all the transforms from this directory. 
 */
function loadTransforms() {
  // eslint-disable-next-line global-require
  return fs.readdirSync(__dirname).filter(f => f !== 'index.js').map(f => require(f));
}

/**
 * Gets the array of builder transforms to execute in order
 * to generate the webpack configuration.
 * 
 * @param {Object} builderConfig - The builder configuration
 */
export default function getTransforms(builderConfig) {
  return loadTransforms()
    .filter(t => !t.predicate || t.predicate(builderConfig))
    .map(t => t.apply || t /* if default export */);
}
