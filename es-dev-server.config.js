const range = require('koa-range');

module.exports = {
  port: 8000,
  watch: true,
  nodeResolve: true,
  http2: true,
  appIndex: './',
  open: true,
  plugins: [],
  middlewares: [ range ],
  moduleDirs: ['node_modules', 'web_modules'],
};