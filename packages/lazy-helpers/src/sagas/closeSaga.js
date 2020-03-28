import { put } from 'redux-saga/effects'

export function* closeSaga() {
  yield put({ type: 'CLOSE' })
}
