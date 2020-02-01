import { delay } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getDB } from '../../_modules/selectors'
import { ADMIN_REPAIR_LOAD, ADMIN_REPAIR_READY } from '../../constants'

const TIMEOUT = 1000

export function* initSaga() {
  while (true) {
    yield take(ADMIN_REPAIR_READY)
    let db = yield select(getDB)

    while (db === false) {
      yield delay(TIMEOUT)
      db = yield select(getDB)
    }

    yield put({
      type: ADMIN_REPAIR_LOAD,
    })
  }
}
