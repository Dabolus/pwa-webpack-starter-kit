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
  plugins: [
    new HtmlPlugin({
      inject: 'head',
      template: '!!@piuccio/ejs-compiled-loader!./src/index.ejs',
      showErrors: true,
      buildName: process.env.BUILD_NAME,
      static: process.env.STATIC,
    }),
  ],
});

export default config;
