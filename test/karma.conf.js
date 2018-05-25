const webpackConfig = require('../webpack/dev.config');

module.exports = (config) => config.set({
  autoWatch: true,
  basePath: __dirname,
  browsers: [ 'chrome' ],
  colors: true,
  exclude: [],
  files: [
    '**/*.ts',
  ],
  frameworks: [ 'mocha', 'chai', 'sinon' ],
  logLevel: config.LOG_INFO,
  plugins: [ 'karma-*' ],
  port: 9876,
  preprocessors: {
    '**/*.ts': [ 'webpack' ],
  },
  reporters: [ 'mocha' ],
  singleRun: false,
  webpack: {
    module: webpackConfig.module,
    resolve: webpackConfig.resolve,
  },
});
