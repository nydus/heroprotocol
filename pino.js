'use strict'
const pino = require('pino');
const pretty = pino.pretty({forceColor: true})
pretty.pipe(process.stdout);
var loglevel = process.env.LOGLEVEL || 'warn';
module.exports = pino({
  name: 'hots-parser',
  safe: true,
  level: loglevel
}, pretty);