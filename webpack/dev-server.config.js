const { resolve } = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
  content: resolve(__dirname, '../build'),
  hot: true,
  port: 8080,
  dev: {
    publicPath: 'http://localhost:8080/',
  },
  open: {
    path: '/',
  },
  add: (app) => {
    // History API Fallback
    app.use(convert(history()));
  },
};
