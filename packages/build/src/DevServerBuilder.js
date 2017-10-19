/* eslint-disable no-console */
import { merge } from 'lodash';
import webpack from 'webpack';
import DevServer from 'webpack-dev-server';
import ConfigBuilder from './ConfigBuilder';

/**
 * The configuration defaults for the development server build.
 */
const configDefaults = {
  rebuildOnChange: true
};

/**
 * Builder for creating a development server.
 */
export default class DevServerBuilder extends ConfigBuilder {
  /**
   * Creates a development server builder.
   * @param {Object} [config={}] - The initial configuration values
   */
  constructor(config = {}) {
    super(merge(configDefaults, config));
  }

  /**
   * Factory method to create a new `DevServerBuilder` from an existing
   * configuration.
   * @param {ConfigBuilder} configBuilder - The builder to extend
   * @returns {DevServerBuilder} - The new development server builder
   */
  static extends(configBuilder) {
    return new DevServerBuilder(Object.assign({}, configBuilder.config));
  }

  /**
   * Watches for changed files and triggers a re-build. By default this
   * option is already true, but may be turned off by passing false to this
   * method.
   * @param {boolean} enable - True if recompiling is enabled
   */
  rebuildOnChange(enable = true) {
    this.config.rebuildOnChange = enable;
  }

  /**
   * Starts the local development server.
   * @param {Object} options - The server options
   * @see https://webpack.js.org/configuration/dev-server/
   */
  start(options) {
    const serverOpts = merge({
      host: '0.0.0.0',
      port: 3000,
      hot: this.config.rebuildOnChange
    }, options);
    const compiler = webpack(this.getConfig());
    const server = new DevServer(compiler, serverOpts);
    server.listen(serverOpts.port, serverOpts.host, (err) => {
      if (err) {
        console.error('Error: ', err);
      } else {
        console.log(`Started the server on address ${serverOpts.host}:${serverOpts.port}`);
      }
    });
  }
}
