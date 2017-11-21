function getOutputFile(builderConfig) {
  return '[name].js';
}

function initialize(builderConfig) {
  const webpackConfig = {
    entry: Object.assign({}, builderConfig.output.bundles),
    output: {
      path: builderConfig.output.dir,
      filename: getOutputFile(builderConfig)
    },
    plugins: []
  };
  return webpackConfig;
}

export default initialize;
