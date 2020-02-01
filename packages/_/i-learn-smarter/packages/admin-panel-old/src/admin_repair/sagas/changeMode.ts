import { put, take } from 'redux-saga/effects'
import { ADMIN_REPAIR_CHANGE_MODE, ADMIN_REPAIR_LOAD } from './../../constants'

export function* changeModeSaga() {
  while (true) {
      yield take(ADMIN_REPAIR_CHANGE_MODE)

      yield put({ type: ADMIN_REPAIR_LOAD })
  }
}
