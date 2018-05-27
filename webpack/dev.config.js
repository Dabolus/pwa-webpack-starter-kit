const os = require('os');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { HotModuleReplacementPlugin } = require('webpack');
const { smartStrategy: smartMerge } = require('webpack-merge');
const baseConfig = require('./base.config');
const devServerConfig = require('./dev-server.config');
const maxCPUs = os.cpus().length - 1;
const maxRAM = Math.floor(os.totalmem() / 2097152); // Half the total ram in megabytes

module.exports = smartMerge({
  plugins: 'prepend',
})(baseConfig, {
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
      memoryLimit: maxRAM,
      async: true, // make it async during development
      checkSyntacticErrors: true,
    }),
    new HtmlPlugin({
      inject: 'head',
      template: './src/index.html',
      showErrors: true,
    }),
    new HotModuleReplacementPlugin(),
  ],
});
