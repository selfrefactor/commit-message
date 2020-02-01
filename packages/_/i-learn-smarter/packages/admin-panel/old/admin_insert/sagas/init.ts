import { delay } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getDB } from '../../_modules/selectors'
import { ADMIN_INSERT_LOAD, ADMIN_INSERT_READY } from '../../constants'

const TIMEOUT = 1000

export function* initSaga() {
  while (true) {
    yield take(ADMIN_INSERT_READY)
    let db: any = yield select(getDB)

    while (db === false) {
      yield delay(TIMEOUT)
      db = yield select(getDB)
      console.log(db === false, 'wait for db')
    }
    yield put({ type: ADMIN_INSERT_LOAD })
  }
}
