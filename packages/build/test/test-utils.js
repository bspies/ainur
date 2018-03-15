function findPlugin(webpackConfig, className) {
  return webpackConfig.plugins.find(p => p.constructor && p.constructor.name === className);
}

module.exports = {
  findPlugin
};
