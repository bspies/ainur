const get = require('lodash.get');
const { matchers } = require('./matchers');
const paths = require('../schema/paths');
const {
  getJsLintLoader,
  getTsLintLoader,
  getStyleLoader
} = require('./utility-loaders');
const {
  getBabelLoader,
  getTypeScriptLoader,
  getCssLoader,
  getSassLoader,
  getLessLoader
} = require('./file-loaders');

/**
 * Creates the configuration rule.
 * @param {Object} matcher - The file matching pattern
 * @param {...Object} loaders - The loaders to use for the rule
 */
function getRule(matcher, ...loaders) {
  return {
    test: matcher,
    use: loaders
  };
}

/**
 * Returns the basic set of loaders required for styles, i.e. the
 * style and css loaders.
 * @param {Object} builderConfig - The builder configuration
 */
function getBaseStyleLoaders(builderConfig) {
  return [getStyleLoader(), getCssLoader()];
}

/**
 * Creates the JavaScript rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
function getJavaScriptRule(builderConfig) {
  const babelOpts = {};
  const loaders = [getBabelLoader(babelOpts)];
  if (!get(builderConfig, paths.lint)) {
    loaders.push(getJsLintLoader());
  }
  return getRule(matchers.JAVASCRIPT, ...loaders);
}

/**
 * Creates the TypeScript rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
function getTypeScriptRule(builderConfig) {
  const tsOpts = {};
  const loaders = [getTypeScriptLoader(tsOpts)];
  if (!get(builderConfig, paths.lint)) {
    loaders.push(getTsLintLoader());
  }
  return getRule(matchers.TYPESCRIPT, ...loaders);
}

/**
 * Creates the CSS rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
function getCssRule(builderConfig) {
  const loaders = getBaseStyleLoaders(builderConfig);
  return getRule(matchers.CSS, ...loaders);
}

/**
 * Creates the CSS rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
function getSassRule(builderConfig) {
  const sassOpts = {};
  const loaders = getBaseStyleLoaders(builderConfig).concat(getSassLoader(sassOpts));
  return getRule(matchers.SASS, ...loaders);
}

/**
 * Creates LESS rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
function getLessRule(builderConfig) {
  const loaders = getBaseStyleLoaders(builderConfig).concat(getLessLoader());
  return getRule(matchers.LESS, ...loaders);
}

module.exports = {
  getJavaScriptRule,
  getTypeScriptRule,
  getCssRule,
  getSassRule,
  getLessRule
};
