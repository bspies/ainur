/**
 * Initializes a webpack configuration.
 * @param {Object} builderConfig - The built configuration
 */
function initialize(builderConfig) {
  const webpackConfig = {
    entry: Object.assign({}, builderConfig.output.bundles),
    output: {
      path: builderConfig.output.dir,
      filename: '[name].js'
    },
    plugins: []
  };
  return webpackConfig;
}

module.exports = initialize;
