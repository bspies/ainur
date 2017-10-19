import webpack from 'webpack';
import { get } from 'lodash';

/**
 * Predicate to filter use of this transform.
 * @param {Object} config - The builder configuration
 * @returns {boolean} - True if there are source code exclusions
 */
export const predicate = config => !!config.source.excludes;

/**
 * Ignores the excludes source.
 * 
 * @param {Object} builderConfig - The builder configuration
 * @param {Object} webpackConfig - The webpack configuration to be built
 */
export function apply(builderConfig, webpackConfig) {
  const exclusions = get(builderConfig, 'source.excludes');
  exclusions.forEach((exclusion) => {
    webpackConfig.plugins.push(new webpack.IgnorePlugin(exclusion));
  });
}
