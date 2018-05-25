const { resolve } = require('path');
const history = require('connect-history-api-fallback');
const convert = require('koa-connect');

module.exports = {
  content: resolve(__dirname, '../build'),
  hot: true,
  port: 8081,
  dev: {
    publicPath: 'http://localhost:8081/',
  },
  open: {
    path: '/',
  },
  add: (app) => {
    // History API Fallback
    app.use(convert(history()));
  },
};
