import { put, take } from 'redux-saga/effects'
import {
  ADMIN_REPAIR_CHANGE_RANDOM,
  ADMIN_REPAIR_LOAD,
} from '../../constants'

export function* resetSaga() {
  while (true) {
    yield take(ADMIN_REPAIR_CHANGE_RANDOM)

    yield put({
      type: ADMIN_REPAIR_LOAD,
    })
  }
}
