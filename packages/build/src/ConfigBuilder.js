const set = require('lodash.set');
const { append } = require('./util');
const { paths } = require('./schema');
const transformConfig = require('./transform-config');

/**
 * This is the base configuration builder, which is extended by
 * {@link DevServerBuilder} and {@link DistributionBuilder}. It may
 * also be used in a standalone mode in order to build common
 * configuration. For example:
 * @example
 * ```javascript
 * const commonConfig = new ConfigBuilder()
 *      .targets( ... );
 *      // invoke additional builder methods
 *
 * // production build
 * DistributionBuilder
 *      .extends(commonConfig)
 *      .minimize()
 *      .build();
 *
 * // start development server
 * DevServerBuilder
 *      .extends(commonConfig)
 *      .start({
 *         port: 8080
 *      });
 * ```
 */
class ConfigBuilder {
  /**
   * Creates the configuration builder.
   * @param {Object} [config={}] - The initial configuration values
   */
  constructor(config = {}) {
    this.config = config;
  }

  /**
   * Factory function to create a new `ConfigBuilder` from an existing
   * configuration.
   * @param {ConfigBuilder} configBuilder - The builder to extend
   */
  static extends(configBuilder) {
    return new ConfigBuilder(Object.assign({}, configBuilder.config));
  }

  /**
   * Sets the source language level for JavaScript, by default
   * 'es6' (EcmaScript 2015).
   * @param {string} level - The JavaScript language level
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
     */
  sourceLevel(level) {
    set(this.config, paths.sourceLevel, level);
    return this;
  }

  /**
   * Excludes sources that are matched by the given regular expression
   * @param {RegExp} regex - The regular expression that matches source paths to exclude
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
   */
  excludes(regex) {
    append(this.config, paths.excludes, regex);
    return this;
  }

  /**
   * Sets target browser environments for the build. If no targets are set,
   * the default compilation output will be EcmaScript 5.1. Syntax supported
   * for browser versions is the same as that used by the `babel-env-preset`. If 'node'
   * is specified the target will be set to the current version of Node JS.
   * @param {string|Array<string>} targets - The array or string of target browser environments,
   * or 'node'
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
   */
  targets(targets) {
    const type = typeof targets;
    if (type === 'string' && targets === 'node') {
      this.config.targets = {
        node: 'current'
      };
    } else if (type === 'string' || Array.isArray(targets)) {
      this.config.targets = {
        browsers: targets
      };
    } else {
      throw new Error(
        `Invalid argument of type ${type} given to targets(): must be string or array of strings`
      );
    }
    return this;
  }

  /**
   * Uses the given project features, e.g. 'react', 'angular', or 'bootstrap'.
   * @param {...string} features - The features to use
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
   */
  features(...features) {
    this.config.features.push(...features);
    return this;
  }

  /**
   * Splits all project dependencies into a separate output bundle.
   * @param {string} [bundleName ='vendor'] - The bundle file name
   */
  splitDependencies(bundleName = 'vendor') {
    this.config.output.dependencies = bundleName;
    return this;
  }

  /**
   * Adds an output bundle and the input sources for that bundle.
   * Note: Do not use this method for specifying a separate dependency
   * bundle (i.e. for dependencies in `node_modules`). Use `splitDependencies`
   * instead.
   * @param {string} bundleName - The bundle name
   * @param {...string} sources - The bundle input source(s)
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
   */
  withBundle(bundleName, ...sources) {
    set(this.config, `${paths.bundles}.${bundleName}`, sources);
    return this;
  }

  /**
   * Adds an HTML output file to the build, using a template.
   * @param {string} template - The HTML template name or file path
   * @param {Object} [variables={}] - The variables to use for the template
   * @param {string} [filename='index.html'] - The output file name
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
   */
  withHtml(template, variables = {}, filename = 'index.html') {
    set(this.config, paths.htmlOutput,
      {
        template,
        variables,
        filename
      });
    return this;
  }

  /**
   * Specifies the target output directory of the build.
   * @param {string} outputDir - The build output directory
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
   */
  outputDir(outputDir) {
    set(this.config, paths.output, outputDir);
    return this;
  }

  /**
   * Specifies the method for building JavaScript source maps.
   * @param {string|function():string} method - The source map method, or a function that returns it
   * @returns {ConfigBuilder} - The 'this' to chain builder methods
   */
  sourceMaps(method) {
    set(this.config, paths.sourceMaps, method);
    return this;
  }

  /**
   * Adds source code linting to the build.
   * @param {boolean} enable
   */
  lint(enable = true) {
    set(this.config, paths.lint, enable);
    return this;
  }

  /**
   * Returns the webpack configuration object.
   * @returns {Object} - The config object
   */
  getConfig() {
    return transformConfig(this.config);
  }
}

module.exports = ConfigBuilder;
