// config-overrides.js
const path = require('path');

module.exports = function override(config, env) {
  // Add fallbacks for webpack 5 polyfills
  config.resolve.fallback = {
    path: require.resolve("path-browserify"),
    os: require.resolve("os-browserify/browser"),
    crypto: require.resolve("crypto-browserify")
  };

  return config;
}
