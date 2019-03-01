/* tslint:disable */
// TODO: discover why we need these
/// <reference types="../typings/terser" />
/// <reference types="../typings/terser-webpack-plugin" />

import { resolve } from 'path';
import { minify } from 'terser';
import TerserPlugin from 'terser-webpack-plugin';
import OptimizeCssAssetsPlugin from 'optimize-css-assets-webpack-plugin';
import HtmlPlugin from 'html-webpack-plugin';
import CleanPlugin from 'clean-webpack-plugin';
import { smartStrategy as smartMerge } from 'webpack-merge';
import baseConfig from './base.config';
import webpack from 'webpack';

const config: webpack.Configuration = smartMerge({
  plugins: 'prepend',
})(baseConfig, {
  mode: 'production',
  optimization: {
    splitChunks: {
      name: false,
      cacheGroups: {
        vendor: {
          test: /node_modules/,
          chunks: 'all',
        },
      },
    },
    minimizer: [
      new TerserPlugin({
        cache: true,
        parallel: true,
        extractComments: true,
      }),
      new OptimizeCssAssetsPlugin(),
    ],
  },
  plugins: [
    new CleanPlugin([`build/${process.env.BUILD_NAME || ''}`], { root: resolve(__dirname, '..') }),
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
        minifyJS: (code) => minify(code).code,
      },
      hash: true,
      inject: 'head',
      template: '!!@piuccio/ejs-compiled-loader!./src/index.ejs',
      buildName: process.env.BUILD_NAME,
      static: process.env.STATIC,
    }),
  ],
});

export default config;
