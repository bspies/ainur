const webpack = require('webpack');
const MemoryFS = require('memory-fs');

const memoryfs = new MemoryFS();

/**
 * Compile using the given file system.
 */
function compile(config, fileSystem = memoryfs) {
  const compiler = webpack(config);
  compiler.inputFileSystem = fileSystem;
  compiler.outputFileSystem = fileSystem;
  compiler.resolvers.normal.fileSystem = fileSystem;
  compiler.resolvers.context.fileSystem = fileSystem;
}

module.exports = {
  compile
};
