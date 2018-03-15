const UglifyJSPlugin = require('uglifyjs-webpack-plugin');
const get = require('lodash.get');
const { paths } = require('../schema');

/**
 * Predicate to filter use of this transform.
 * @param {Object} config - The builder configuration
 * @returns {boolean} - True if source should be minified
 */
const predicate = config => config.minimize;

/**
 * Minimizes the bundled source using the UglifyJSPlugin.
 * @param {Object} builderConfig - The builder configuration
 * @param {Object} webpackConfig - The webpack configuration to be built
 */
function apply(builderConfig, webpackConfig) {
  webpackConfig.plugins.push(new UglifyJSPlugin({
    sourceMap: !!get(builderConfig, paths.sourceMaps)
  }));
}

module.exports = {
  predicate,
  apply
};
