/*
 * This module contains the configuration for generating webpack rule and
 * loader configuration.
 */
const fileLoaders = require('./file-loaders');
const utilityLoaders = require('./utility-loaders');
const rules = require('./rules');
const { matchers, getMatcher } = require('./matchers');

/**
 * Finds a rule given its file matcher (rule.test).
 * @param {Object} webpackConfig - The webpack configuration
 * @param {RegExp} matcher - The file matcher
 * @returns {Object|undefined} - The rule, or undefined if not found
 */
function findRule(webpackConfig, matcher) {
  return webpackConfig.module.rules.find(r => r.test === matcher);
}

/**
 * Appends the loader configuration to loaders for the given rule.
 * @param {Object} webpackConfig - The webpack configuration
 * @param {RegExp} matcher - The file matcher
 * @param {Object} loaderConfig - The loader configuration
 */
function appendLoader(webpackConfig, matcher, loaderConfig) {
  const rule = findRule(matcher);
  if (rule) {
    rule.use.push(loaderConfig);
  } else {
    console.warn(`Unable to find rule where rule.test=${matcher}`);
  }
}

/**
 * Prepends the loader configuration to the loaders for the given rule.
 * @param {Object} webpackConfig - The webpack configuration
 * @param {RegExp} matcher - The file matcher
 * @param {Object} loaderConfig - The loader configuration
 */
function prependLoader(webpackConfig, matcher, loaderConfig) {
  const rule = findRule(matcher);
  if (rule) {
    rule.use.unshift(loaderConfig);
  } else {
    console.warn(`Unable to find rule where rule.test=${matcher}`);
  }
}

export default {
  ...fileLoaders,
  ...utilityLoaders,
  ...rules,
  matchers,
  getMatcher,
  findRule,
  appendLoader,
  prependLoader
};
