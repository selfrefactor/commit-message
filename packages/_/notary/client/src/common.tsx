import * as Raven from 'raven-js'
import * as React from 'react'
import { Observable } from 'rxjs/Observable'

Raven.config('https://c57bf6cbb9fc431fb3f326f31745f93f@sentry.io/123126').install()

export function getNextIndex(input: GetNextIndex) {
  const next = input.index + 1

  return next === input.length ?
    0 :
    next
}

export function asyncWrap<T, U>(fn: (input: T) => Promise<U>) {
  return (x: T) => Observable.fromPromise(fn(x))
}

export const captureError = err => {
  console.log(err, 'error will be logged to Sentry service')
  if (typeof err === 'string') {

    return Raven.captureMessage(err)
  }

  return Raven.captureException(err)
}

export function EmptyComponent() {
  return <div></div>
}
