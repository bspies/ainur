const webpack = require('webpack');
const merge = require('lodash.merge');
const ConfigBuilder = require('./ConfigBuilder');

const configDefaults = {
  minimize: false
};

/**
 * Builder for creating a distribution. This is the class you want
 * to use when creating a build for distribution.
 */
class DistributionBuilder extends ConfigBuilder {
  /**
   * Creates the distribution builder.
   * @param {Object} [config={}] - The initial configuration values
   */
  constructor(config = {}) {
    super(merge(configDefaults, config));
  }

  /**
   * Factory method to create a new `DistributionBuilder` from an existing
   * configuration.
   * @param {ConfigBuilder} configBuilder - The builder to extend
   * @returns {DistributionBuilder} - The new distribution builder
   */
  static extends(configBuilder) {
    return new DistributionBuilder(configBuilder.config);
  }

  /**
   * Specifies that the output should be minified.
   * @param {boolean} [use=true] - If true, turns on minification
   * @returns {DistributionBuilder} - The 'this' to chain builder methods
   */
  minimize(use = true) {
    this.config.minimize = use;
    return this;
  }

  /**
   * Runs the build, transpiling and bundling the input
   * sources.
   * @param {function(err, stats)} callback - Callback to run on build completion
   */
  build(callback) {
    const compiler = webpack(this.getConfig());
    compiler.run(callback);
  }
}

module.exports = DistributionBuilder;
