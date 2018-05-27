const os = require('os');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const ForkTsCheckerPlugin = require('fork-ts-checker-webpack-plugin');
const HtmlPlugin = require('html-webpack-plugin');
const { smartStrategy: smartMerge } = require('webpack-merge');
const baseConfig = require('./base.config');
const maxCPUs = os.cpus().length - 1;
const maxRAM = Math.floor(os.totalmem() / 2097152); // Half the total ram in megabytes

module.exports = smartMerge({
  plugins: 'prepend',
})(baseConfig, {
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
      memoryLimit: maxRAM,
      async: false, // make it sync during production
      checkSyntacticErrors: true,
    }),
    new HtmlPlugin({
      minify: {
        collapseWhitespace: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        sortAttributes: true,
        sortClassName: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
        caseSensitive: true,
      },
      hash: true,
      inject: 'head',
      template: './src/index.html',
    }),
  ],
});
