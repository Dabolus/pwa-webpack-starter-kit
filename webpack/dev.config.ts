/* tslint:disable */

import HtmlPlugin from 'html-webpack-plugin';
import { smartStrategy as smartMerge } from 'webpack-merge';
import baseConfig from './base.config';
import webpack from 'webpack';

const config: webpack.Configuration = smartMerge({
  plugins: 'prepend',
})(baseConfig, {
  mode: 'development',
  devtool: 'eval-source-map',
  optimization: {
    removeAvailableModules: false,
    removeEmptyChunks: false,
    splitChunks: false,
  },
  module: {
    rules: [
      {
        test: /styles\/.*\.s?[ac]ss$/,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 2,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              ident: 'postcss',
              plugins: () => [
                require('postcss-preset-env')(),
                require('autoprefixer')(),
              ],
            },
          },
          {
            loader: 'sass-loader',
            options: {
              includePaths: ['./node_modules'],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new HtmlPlugin({
      inject: 'head',
      template: '!!@piuccio/ejs-compiled-loader!./src/index.ejs',
      showErrors: true,
      buildName: process.env.BUILD_NAME,
    }),
  ],
});

export default config;
