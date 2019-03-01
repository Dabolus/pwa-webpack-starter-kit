/* tslint:disable */
// TODO: discover why we need these
/// <reference types="../typings/script-ext-html-webpack-plugin" />
/// <reference types="../typings/workbox-webpack-plugin" />

import { resolve } from 'path';
import webpack from 'webpack';
import CopyPlugin from 'copy-webpack-plugin';
import ScriptExtHtmlPlugin from 'script-ext-html-webpack-plugin';
import { InjectManifest as InjectManifestPlugin } from 'workbox-webpack-plugin';

const config: webpack.Configuration = {
  cache: true,
  context: resolve(__dirname, '..'),
  entry: {
    app: './src/index',
  },
  output: {
    filename: 'components/[name].js',
    chunkFilename: 'components/[id].js',
    path: resolve(__dirname, '../build', process.env.BUILD_NAME || ''),
    pathinfo: false,
    crossOriginLoading: 'anonymous',
    globalObject: 'self',
  },
  resolve: {
    alias: {
      '@components': resolve(__dirname, '../src/components/'),
      '@actions': resolve(__dirname, '../src/actions/'),
      '@reducers': resolve(__dirname, '../src/reducers/'),
      '@store$': resolve(__dirname, '../src/store'),
    },
    extensions: ['.ts', '.js', '.scss', '.css', '.ejs'],
    modules: ['./src', 'node_modules'],
  },
  module: {
    rules: [
      {
        test: /\.[tj]s$/,
        exclude: /node_modules[\/\\](?!(pwa-helpers|lit-element|@polymer)[\/\\]).*/,
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          },
        },
      },
      {
        test: /\.s?[ac]ss$/,
        use: [
          {
            loader: resolve(__dirname, 'loaders/to-lit-css-loader.ts'),
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
    new CopyPlugin([
      // Assets
      {
        from: resolve(__dirname, '../src/assets'),
        to: '.',
      },
      ...process.env.BUILD_NAME === 'es5' ? [
      {
        from: resolve(__dirname, '../node_modules/@webcomponents/webcomponentsjs/custom-elements-es5-adapter.js'),
        to: 'components',
      }] : [],
    ]),
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
