const { Validator } = require('jsonschema');
const init = require('./core');
const getTransforms = require('./transforms');
const { configSchema } = require('./schema');

/**
 * Runs a series of transforms to build up the webpack configuration.
 * @param {Object} builderConfig - The builder configuration
 * @param {Object} webpackConfig - The webpack configuration to be built up
 */
function runTransforms(builderConfig, webpackConfig) {
  getTransforms(builderConfig).forEach(apply => apply(builderConfig, webpackConfig));
}

/**
 * Validates the builder configuration.
 * @param {Object} builderConfig - The configuration to validate
 */
function validate(builderConfig) {
  const validator = new Validator();
  const result = validator.validate(builderConfig, configSchema);
  if (!result.valid) {
    console.error('Invalid configuration. Errors:\n', result.errors.join('\n'));
  }
}

/**
 * Transforms the build configuration into a webpack
 * configuration.
 * @param {Object} builderConfig - The builder configuration
 * @returns {Object} - The webpack configuration
 */
function transformConfig(builderConfig) {
  validate(builderConfig);
  const webpackConfig = init(builderConfig);
  runTransforms(builderConfig, webpackConfig);
  return webpackConfig;
}

module.exports = transformConfig;
