import { delay } from 'rambdax'
import { put } from 'redux-saga/effects'

const DELAY = 1300

function zIndex(ms = DELAY){
  const wrapper: any = document.querySelector('.notify__wrapper')

  wrapper.style.zIndex = 1

  delay(ms * 2).then(() => {
    wrapper.style.zIndex = -1
  })
}

export function* notify(message: string) {
  const notifyOptions = {
    message,
    ms: DELAY,
    type: 'NOTIFY_INFO',
  }

  zIndex()
  yield put(notifyOptions)
}

export function* notifyLoading() {
  const notifyOptions = {
    message: 'WAITING...',
    ms: DELAY,
    type: 'NOTIFY_WARNING',
  }

  zIndex()
  yield put(notifyOptions)
}

export function* notifyWhenSuggestions() {
  const notifyOptions = {
    message: 'You need to hit \'Update\' button first',
    ms: DELAY,
    type: 'NOTIFY_INFO',
  }

  zIndex()
  yield put(notifyOptions)
}

export function* notifyNoResult() {
  const notifyOptions = {
    message: 'No result for this query',
    ms: DELAY,
    type: 'NOTIFY_WARNING',
  }

  zIndex()
  yield put(notifyOptions)
}

export function* longNotify(message: string) {
  const notifyOptions = {
    message,
    ms: 2 * 1000,
    type: 'NOTIFY_INFO',
  }

  zIndex(2 * 1000)
  yield put(notifyOptions)
}
