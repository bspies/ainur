/**
 * Returns the ESLint loader configuration for adding
 * linting to JavaScript files.
 * @param {Object} opts - The eslint loader options
 */
export function getJsLintLoader(opts) {
  // override defaults
  const options = Object.assign({
    emitWarning: true,
  }, opts);
  return {
    loader: 'eslint-loader',
    enforce: 'pre',
    options
  };
}

/**
 * Loaders by id.
 * @type {Object}
 */
const loadersById = {
  'lint-js': getJsLintLoader
};

/**
 * 
 * @param {string} id - The loader id
 */
export function getUtilityLoaderById(id) {
  const loaderConfig = loadersById[id];
  if (!loaderConfig) {
    throw new Error(`No such loader: id '${id}'`);
  }
  return loaderConfig;
}

/**
 * Exports utility loaders by their ids.
 */
export default loadersById;
