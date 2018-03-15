/*
 * This module contains the JSON schema for validating
 * a given builder configuration, and the path constants
 * for accessing/setting paths within the builder configuration
 * object.
 */
const configSchema = require('./config.schema.json');
const paths = require('./paths');

module.exports = {
  configSchema,
  paths
};
