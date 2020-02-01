import { defaultTo, merge, path } from 'rambdax'
import { delay } from 'redux-saga'
// tslint:disable-next-line
import { all, call, put, select, take } from 'redux-saga/effects'

const LONG_DELAY = 2000
const SHORT_DELAY = 1000

function* notifyFn(payload) {
  yield put({
    message: payload.message,
    notifyType: payload.notifyType,
    type: 'NOTIFY_SET_MESSAGE',
  })
  const ms = defaultTo(LONG_DELAY, payload.ms)
  yield delay(ms)
  yield put({
    notifyType: payload.notifyType,
    type: 'NOTIFY_ANIMATE_CLOSE',
  })
  yield delay(SHORT_DELAY)
  yield put({ type: 'NOTIFY_CLOSE_MESSAGE' })
}

function createSaga(base) {
  return function* () {
    while (true) {
      try {
        const payload = yield take(`NOTIFY_${base.toUpperCase()}`)
        const classNameState = yield select(path('notifyStore.className'))
        if (classNameState !== 'hidden') {
          console.warn('classNameState !== "hidden', base)

          return
        }
        yield call(notifyFn, merge(payload, { notifyType: base }))
      } catch (err) {
        console.log(err)
      }
    }
  }
}

const infoSaga = createSaga('info')
const warningSaga = createSaga('warning')
const errorSaga = createSaga('error')
const successSaga = createSaga('success')

export function* notifySagas() {
  return yield all([
    infoSaga(),
    warningSaga(),
    errorSaga(),
    successSaga(),
  ])
}
