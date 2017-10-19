import UglifyJSPlugin from 'uglifyjs-webpack-plugin';
import { get } from 'lodash';
import { paths } from '../schema';

/**
 * Predicate to filter use of this transform.
 * @param {Object} config - The builder configuration
 * @returns {boolean} - True if source should be minified
 */
export const predicate = config => config.minimize;

/**
 * Minimizes the bundled source using the UglifyJSPlugin.
 * @param {Object} builderConfig - The builder configuration
 * @param {Object} webpackConfig - The webpack configuration to be built
 */
export default function apply(builderConfig, webpackConfig) {
  webpackConfig.plugins.push(new UglifyJSPlugin({
    sourceMaps: !!get(builderConfig, paths.sourceMaps)
  }));
}
