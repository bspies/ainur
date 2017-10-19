import HtmlWebpackPlugin from 'html-webpack-plugin';

/**
 * Predicate to filter use of this transform.
 * @param {Object} config - The builder configuration
 * @returns {boolean} - True if HMTL generation is configured
 */
export const predicate = config => !!config.output.html;

/**
 * Uses the HtmlWebpackPlugin to generate the HTML output.
 * @param {Object} builderConfig - The builder configuration
 * @param {Object} webpackConfig - The webpack configuration to be built
 */
export function apply(builderConfig, webpackConfig) {
  const htmlConfig = builderConfig.output.html;
  webpackConfig.plugins.push(new HtmlWebpackPlugin({
    inject: true,
    filename: htmlConfig.filename,
    template: htmlConfig.template
  }));
}
