/**
 * Matcher for JavaScript files.
 * @type {RegExp}
 */
const JAVASCRIPT = /\.js$/;

/**
 * Matcher for TypeScript files.
 * @type {RegExp}
 */
const TYPESCRIPT = /\.ts$/;

/**
 * Matcher for CSS files.
 * @type {RegExp}
 */
const CSS = /\.css$/;

/**
 * Matcher for SASS/SCSS files.
 * @type {RegExp}
 */
const SASS = /\.scss$/;

/**
 * Matcher for LESS files.
 * @type {RegExp}
 */
const LESS = /\.less$/;

/**
 * Matcher for JSON files.
 * @type {RegExp}
 */
const JSON = /\.json$/;

const matcherByExt = {
  js: JAVASCRIPT,
  ts: TYPESCRIPT,
  css: CSS,
  scss: SASS,
  less: LESS,
  json: JSON
};

/**
 * Returns the matcher for the given file extension.
 * @param {string} ext - The file extension
 * @returns {RegExp|undefined} - The matcher for the file extension (if defined)
 */
function getMatcher(ext) {
  return matcherByExt[ext];
}

module.exports = {
  matchers: {
    JAVASCRIPT,
    TYPESCRIPT,
    CSS,
    SASS,
    LESS,
    JSON
  },
  getMatcher
};
