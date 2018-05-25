const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const { smart: smartMerge } = require('webpack-merge');
const baseConfig = require('./base.config');
const maxCPUs = require('os').cpus().length - 1;

module.exports = smartMerge(baseConfig, {
  mode: 'production',
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
    splitChunks: {
      chunks: 'all',
      name: false,
    },
  },
  plugins: [
    new ForkTsCheckerPlugin({
      tslint: true,
      watch: 'src',
      workers: Math.min(maxCPUs - 1, Math.ceil(maxCPUs / 2)),
      blockEmit: true, // make it sync during production
      checkSyntacticErrors: true,
    }),
  ],
});
