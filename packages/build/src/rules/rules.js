import _ from 'lodash';
import paths from '../schema/paths';
import {
  getJsLintLoader,
  getTsLintLoader,
  getStyleLoader
} from './utility-loaders';
import {
  getBabelLoader,
  getTypeScriptLoader,
  getCssLoader,
  getSassLoader,
  getLessLoader
} from './file-loaders';

/**
 * Creates the configuration rule.
 * @param {Object} matcher - The file matching pattern 
 * @param {...Object} loaders - The loaders to use for the rule
 */
function getRule(matcher, ...loaders) {
  return {
    test: matcher,
    use: loaders
  };
}

/**
 * Returns the basic set of loaders required for styles, i.e. the
 * style and css loaders.
 * @param {Object} builderConfig - The builder configuration
 */
function getBaseStyleLoaders(builderConfig) {
  return [getStyleLoader(), getCssLoader()];
}

/**
 * Creates the JavaScript rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
export function getJavaScriptRule(builderConfig) {
  const babelOpts = {};
  const loaders = [getBabelLoader(babelOpts)];
  if (!_.get(builderConfig, paths.lint)) {
    loaders.push(getJsLintLoader());
  }
  return getRule(/\.js$/, ...loaders);
}

/**
 * Creates the TypeScript rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
export function getTypeScriptRule(builderConfig) {
  const tsOpts = {};
  const loaders = [getTypeScriptLoader(tsOpts)];
  if (!_.get(builderConfig, paths.lint)) {
    loaders.push(getTsLintLoader());
  }
  return getRule(/\.ts$/, ...loaders);
}

/**
 * Creates the CSS rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
export function getCssRule(builderConfig) {
  const loaders = getBaseStyleLoaders(builderConfig);
  return getRule(/\.css$/, ...loaders);
}

/**
 * Creates the CSS rule using the configuration.
 * @param {Object} builderConfig - The builder configuration 
 */
export function getSassRule(builderConfig) {
  const sassOpts = {};
  const loaders = getBaseStyleLoaders(builderConfig).concat(getSassLoader(sassOpts));
  return getRule(/\.scss$/, ...loaders);
}

/**
 * Creates LESS rule using the configuration.
 * @param {Object} builderConfig - The builder configuration
 */
export function getLessRule(builderConfig) {
  const loaders = getBaseStyleLoaders(builderConfig).concat(getLessLoader());
  return getRule(/\.less$/, ...loaders);
}
