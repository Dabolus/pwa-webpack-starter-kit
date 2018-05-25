const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { smart: smartMerge } = require('webpack-merge');
const baseConfig = require('./base.config');
const devServerConfig = require('./dev-server.config');
const maxCPUs = require('os').cpus().length - 1;

module.exports = smartMerge(baseConfig, {
  mode: 'development',
  devtool: 'inline-source-map',
  serve: devServerConfig,
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  plugins: [
    new ForkTsCheckerPlugin({
      tslint: false, // avoid real time linting; we will be linting when building the project for production
      watch: 'src',
      workers: Math.min(maxCPUs - 1, Math.ceil(maxCPUs / 2)),
      blockEmit: false, // make it async during development
      checkSyntacticErrors: true,
    }),
    new HotModuleReplacementPlugin(),
  ],
});
