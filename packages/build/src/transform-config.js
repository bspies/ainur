import { Validator } from 'jsonschema';
import getTransforms from './transforms';
import { configSchema } from './schema';

/**
 * Runs a series of transforms to build up the webpack configuration.
 * 
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
 * 
 * @param {Object} builderConfig - The builder configuration
 * @returns {Object} - The webpack configuration
 */
export default function transformConfig(builderConfig) {
  validate(builderConfig);
  const webpackConfig = {
    entry: Object.assign({}, builderConfig.output.bundles),
    output: {
      path: builderConfig.output.dir,
      filename: '[name].js'
    },
    plugins: []
  };
  runTransforms(builderConfig, webpackConfig);
  return webpackConfig;
}
