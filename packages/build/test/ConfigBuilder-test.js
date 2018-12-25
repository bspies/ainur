const { expect } = require('chai');
const ConfigBuilder = require('../src/ConfigBuilder');
const { findPlugin } = require('./util/test-utils');

describe('ConfigBuilder', () => {
  it('can configure basic input-output', () => {
    const webpackConfig = new ConfigBuilder()
      .withBundle('main', './src')
      .outputDir('./dist')
      .getConfig();
    expect(webpackConfig.entry).to.deep.equal({
      main: ['./src']
    });
    expect(webpackConfig.output.path).to.equal('./dist');
    expect(webpackConfig.output.filename).to.equal('[name].js');
  });
  it('can configure HTML template', () => {
    const webpackConfig = new ConfigBuilder()
      .withBundle('main', './src')
      .outputDir('./dist')
      .withHtml('./template.htm', { foo: 'bar' }, 'index.html')
      .getConfig();
    const hmtlWebpackPlugin = findPlugin(webpackConfig, 'HtmlWebpackPlugin');
    expect(hmtlWebpackPlugin).to.exist;
    expect(hmtlWebpackPlugin.options.filename).to.equal('index.html');
    expect(hmtlWebpackPlugin.options.template).to.equal('./template.htm');
  });
});
