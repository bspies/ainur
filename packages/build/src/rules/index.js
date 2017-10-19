/*
 * This module contains the configuration for generating webpack rule and
 * loader configuration.
 */
import * as fileLoaders from './file-loaders';
import * as utilityLoaders from './utility-loaders';
import rules from './rules';

export default {
  fileLoaders,
  utilityLoaders
};
