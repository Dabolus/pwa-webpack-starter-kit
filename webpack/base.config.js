const { resolve } = require('path');
const { warmup } = require('thread-loader');
const maxCpus = require('os').cpus().length - 1;
const cpusToUse = Math.max(1, Math.floor(maxCpus / 2));

// Warm up our modules
warmup({
  workers: cpusToUse,
}, [
  'babel-loader',
  '@babel/preset-env',
  '@babel/plugin-syntax-dynamic-import',
  'ts-loader',
]);

const babelLoader = {
  loader: 'babel-loader',
  options: {
    cacheDirectory: true,
    presets: [ '@babel/preset-env' ],
    plugins: [
      '@babel/plugin-syntax-dynamic-import',
    ],
  },
};

module.exports = {
  cache: true,
  context: resolve(__dirname, '..'),
  entry: {
    app: './src',
  },
  output: {
    filename: 'scripts/[name].js',
    chunkFilename: 'scripts/[id].js',
    path: resolve(__dirname, '../build'),
    pathinfo: false,
  },
  resolve: {
    extensions: [ '.ts', '.js' ],
  },
  module: {
    rules: [
      {
        test: /\.ts$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              workers: cpusToUse,
            },
          },
          babelLoader,
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
        test: /\.ts$/,
        use: [
          { loader: 'cache-loader' },
          {
            loader: 'thread-loader',
            options: {
              workers: cpusToUse,
            },
          },
          babelLoader,
        ],
      },
    ],
  },
};
