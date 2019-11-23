import * as Raven from 'raven-js'
Raven.config('https://c57bf6cbb9fc431fb3f326f31745f93f@sentry.io/123126').install()

export const captureError = err => {
  console.log(err, 'error will be logged to Sentry service')
  if (typeof err === 'string') {

    return Raven.captureMessage(err)
  }

  return Raven.captureException(err)
}
