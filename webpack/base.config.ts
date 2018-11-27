/* tslint:disable */
// TODO: discover why we need these
/// <reference types="../typings/script-ext-html-webpack-plugin" />
/// <reference types="../typings/workbox-webpack-plugin" />

import { resolve } from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import ScriptExtHtmlPlugin from 'script-ext-html-webpack-plugin';
import { InjectManifest as InjectManifestPlugin } from 'workbox-webpack-plugin';

const config: webpack.Configuration = {
  cache: true,
  context: resolve(__dirname, '..'),
  entry: {
    app: './src/index',
  },
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].js',
    path: resolve(__dirname, '../build', process.env.BUILD_NAME || ''),
    pathinfo: false,
    crossOriginLoading: 'anonymous',
    globalObject: 'self',
  },
  resolve: {
    extensions: ['.ts', '.js', '.scss', '.css', '.ejs'],
    alias: {
      '~': './src',
    },
    modules: ['./src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules\/(?!(pwa-helpers)\/).*/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/env', {
                loose: true,
                useBuiltIns: 'usage',
              }],
              '@babel/typescript',
            ],
            plugins: [
              ['@babel/transform-runtime', {
                corejs: 2,
                sourceType: 'unambiguous',
              }],
            ],
          },
        },
      },
    ],
  },
  plugins: [
    new CopyPlugin([
      // Assets
      {
        from: resolve(__dirname, '../src/assets'),
        to: '.',
      },
    ]),
    new MiniCssExtractPlugin({
      filename: 'styles/[name].css',
      chunkFilename: 'styles/[id].css',
    }),
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'defer',
    }),
    new InjectManifestPlugin({
      swSrc: resolve(__dirname, '../src/service-worker.js'),
      swDest: './service-worker.js',
      exclude: [/hot-update/, /images\/icons/, /browserconfig\.xml/, /robots\.txt/, /\.LICENSE$/],
    }),
  ],
};

export default config;
