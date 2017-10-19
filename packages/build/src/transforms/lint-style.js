/**
 * Predicate to filter use of this transform.
 * @param {Object} config - The builder configuration
 * @returns {boolean} - True if lint if configured
 */
export const predicate = config => config.source.lint;

/**
 * Applies linting to the style loader configuration(s).
 * @param {Object} builderConfig - The builder configuration
 * @param {Object} webpackConfig - The webpack configuration
 */
export function apply(builderConfig, webpackConfig) {
    
}
