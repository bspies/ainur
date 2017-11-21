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
 * Returns the TSLint loader configuration for adding
 * linting to TypeScript files.
 * @param {Object} opts - The tslint loader options 
 */
export function getTsLintLoader(opts) {
  return {
    loader: 'tslint-loader',
    enforce: 'pre',
    opts
  };
}

/**
 * Returns the loader that loads styles into the DOM by
 * inserting a `<style>` element.
 * @param {*} opts - The loader options 
 */
export function getStyleLoader(opts) {
  const options = Object.assign({
    hmr: false,
    sourceMap: false
  }, opts);
  return {
    loader: 'style-loader',
    options
  };
}

/**
 * Loaders by id.
 * @type {Object}
 */
const loadersById = {
  'lint-js': getJsLintLoader,
  'lint-ts': getTsLintLoader,
  style: getStyleLoader,
};

/**
 * Returns the loader by its id.
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
