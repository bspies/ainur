const webpack = require('webpack');
const get = require('lodash.get');

module.exports = {
  /**
   * Predicate to filter use of this transform.
   * @param {Object} config - The builder configuration
   * @returns {boolean} - True if there are source code exclusions
   */
  predicate: config => !!get(config, 'source.excludes'),
  /**
   * Ignores the excludes source.
   * @param {Object} builderConfig - The builder configuration
   * @param {Object} webpackConfig - The webpack configuration to be built
   */
  apply: (builderConfig, webpackConfig) => {
    const exclusions = get(builderConfig, 'source.excludes');
    exclusions.forEach((exclusion) => {
      webpackConfig.plugins.push(new webpack.IgnorePlugin(exclusion));
    });
  }
};
