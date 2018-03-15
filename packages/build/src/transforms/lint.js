const get = require('lodash.get');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const { matchers, appendLoader } = require('../rules');
const paths = require('../schema/paths');

/**
 * Applies linting for JavaScript files.
 */
const jsLint = {
  /**
   * Predicate to filter use of this transform.
   * @param {Object} config - The builder configuration
   * @returns {boolean} - True if lint is configured
   */
  predicate: config => get(config, paths.lint, false),
  /**
   * Applies linting to the JavaScript loader configuration.
   * @param {Object} builderConfig - The builder configuration
   * @param {Object} webpackConfig - The webpack configuration
   */
  apply: (builderConfig, webpackConfig) => {
    // add the eslint loader
    appendLoader(webpackConfig, matchers.JAVASCRIPT, {
      loader: 'eslint-loader'
      // options: {}
    });
  }
};

/**
 * Applies linting for styles.
 */
const styleLint = {
  /**
   * Predicate to filter use of this transform.
   * @param {Object} config - The builder configuration
   * @returns {boolean} - True if lint if configured
   */
  predicate: config => get(config, paths.lint, false),
  /**
   * Applies linting to the style loader configuration(s).
   * @param {Object} builderConfig - The builder configuration
   * @param {Object} webpackConfig - The webpack configuration
   */
  apply: (builderConfig, webpackConfig) => {
    // use stylelint plugin
    webpackConfig.plugins.push(new StyleLintPlugin());
  }
};

module.exports = [
  jsLint,
  styleLint
];
