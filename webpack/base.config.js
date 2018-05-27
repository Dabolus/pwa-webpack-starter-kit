const { resolve } = require('path');
const { warmup } = require('thread-loader');
const ScriptExtHtmlPlugin = require('script-ext-html-webpack-plugin');
const { InjectManifest: InjectManifestPlugin } = require('workbox-webpack-plugin');
const maxCpus = require('os').cpus().length - 1;
const cpusToUse = Math.max(1, Math.floor(maxCpus / 2));

// Warm up our modules
warmup({ workers: cpusToUse }, [ 'ts-loader' ]);

module.exports = {
  cache: true,
  context: resolve(__dirname, '..'),
  entry: {
    app: './src/components/my-app',
  },
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].js',
    path: resolve(__dirname, '../build'),
    pathinfo: false,
    crossOriginLoading: 'anonymous',
    jsonpScriptType: 'module',
  },
  resolve: {
    extensions: [ '.ts', '.js', '.scss', '.sass', '.css', '.html' ],
    alias: {
      '~': './src',
    },
    modules: [ './src', 'node_modules' ],
  },
  module: {
    rules: [
      {
        test: /\.[jt]s$/,
        use: [
          {
            loader: 'thread-loader',
            options: {
              workers: cpusToUse,
            },
          },
          {
            loader: 'ts-loader',
            options: {
              // disable type checker - we will delegate it to the fork plugin
              transpileOnly: true,
              happyPackMode: true,
              experimentalWatchApi: true,
            },
          },
        ],
      },
      {
        test: /\.s[ac]ss$/,
        use: [
          {
            loader: 'to-lit-html-loader',
          },
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
            },
          },
          /* {
            loader: 'postcss-loader',
            options: {
              config: {
                path: resolve(__dirname, '../postcss.config.js'),
                ctx: config,
              },
            },
          }, */
          {
            loader: 'sass-loader',
            options: {
              includePaths: [ './node_modules' ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new ScriptExtHtmlPlugin({
      defaultAttribute: 'defer',
      module: 'app',
    }),
    new InjectManifestPlugin({
      swSrc: './src/service-worker.js',
      swDest: './sw.js',
      exclude: [ /webcomponents-(?!loader).*\.js$/, /images\/manifest/, /favicon\.ico$/ ],
    }),
  ],
};
