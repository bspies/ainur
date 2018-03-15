const get = require('lodash.get');
const paths = require('../schema/paths');

module.exports = {
  /**
   * Predicate to filter use of this transform.
   * @param {Object} config - The builder configuration
   * @returns {boolean} - True if source maps are configured
   */
  predicate: config => !!get(config, paths.sourceMaps),
  /**
   * Sets the source map method on the build.
   * @param {Object} builderConfig - The builder configuration
   * @param {Object} webpackConfig - The webpack configuration
   */
  apply: (builderConfig, webpackConfig) => {
    Object.assign(webpackConfig, { devtool: get(builderConfig, paths.sourceMaps) });
  }
};
