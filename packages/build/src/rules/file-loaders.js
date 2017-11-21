/**
 * Returns the JavaScript file loader configuration using Babel.
 * @param {Object} [options] - The babel loader options
 */
export function getBabelLoader(options) {
  return {
    loader: 'babel-loader',
    options
  };
}

/**
 * Returns the TypeScript file loader configuration.
 * @param {Object} [options] - The TypeScript loader options
 */
export function getTypeScriptLoader(options) {
  return {
    loader: 'awesome-typescript-loader',
    options
  };
}

/**
 * Returns the CSS file loader configuration.
 * @param {Object} [opts] - The CSS loader options
 */
export function getCssLoader(opts) {
  const options = Object.assign({
    sourceMap: false
  }, opts);
  return {
    loader: 'css-loader',
    options
  };
}

/**
 * Returns the SASS file loader configuration.
 * @param {Object} [opts] - The SASS loader options
 */
export function getSassLoader(opts) {
  const options = Object.assign({
    sourceMap: false
  }, opts);
  return {
    loader: 'sass-loader',
    options
  };
}

/**
 * Returns the LESS loader configuration.
 * @param {Object} [options] - The LESS loader options
 */
export function getLessLoader(options) {
  return {
    loader: 'less-loader',
    options
  };
}

/**
 * Loaders by file extension.
 * @type {Object}
 */
const loadersByFileExt = {
  js: getBabelLoader,
  ts: getTypeScriptLoader,
  css: getCssLoader,
  scss: getSassLoader,
  less: getLessLoader
};

/**
 * 
 * @param {string} fileExt - The file extension (without the dot)
 */
export function getLoaderByFileExt(fileExt) {
  const loaderConfig = loadersByFileExt[fileExt.toLowerCase()];
  if (!loaderConfig) {
    throw new Error(`No such loader: file extension '${fileExt}'`);
  }
  return loaderConfig;
}

/*
 * Export rules for webpack file loaders, by file extension.
 */
export default loadersByFileExt;
