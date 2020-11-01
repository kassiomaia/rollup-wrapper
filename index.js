/** @format */

if (process.env.ENV === 'production') {
  module.exports = require('./lib/rollup-wrapper.min.production.js')
} else {
  module.exports = require('./lib/rollup-wrapper.development.js')
}
