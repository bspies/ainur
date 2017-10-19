/**
 * Predicate to filter use of this transform.
 * @param {Object} config - The builder configuration
 * @returns {boolean} - True if source maps are configured
 */
export const predicate = config => !!config.source.maps;

/**
 * 
 * @param {Object} builderConfig - The builder configuration
 * @param {Object} webpackConfig - The webpack configuration
 */
export function apply(builderConfig, webpackConfig) {
    
}
