import { take, put } from 'redux-saga/effects'
import {ADMIN_INSERT_READY, DRAFTS,ADMIN_INSERT_NEXT, ADMIN_INSERT_LOAD_KEYS } from '../../constants'
import {loadKeys} from '../../bees/loadKeys'
// import {loadDataSet} from '../../bees/loadDataSet'
export function* initSaga() {
  while (true) {
    yield take(ADMIN_INSERT_READY)
    const allKeys = yield loadKeys(DRAFTS)
    yield put({ type: ADMIN_INSERT_LOAD_KEYS, payload: {allKeys} })
    yield put({ type: ADMIN_INSERT_NEXT })
  }
}
