const {captureError} = require('.')
const Raven = require('raven')
Raven.config(process.env.SENTRY_DSN).install()

try {
  JSON.parse('{a')
} catch (e) {
  captureError('JSON')
}
