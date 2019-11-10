import * as Sentry from '@sentry/browser'

export function sentryAnt(){
  Sentry.init({ dsn : 'https://c57bf6cbb9fc431fb3f326f31745f93f@sentry.io/123126' })
}

export const captureExceptionAnt = x => Sentry.captureException(x)
