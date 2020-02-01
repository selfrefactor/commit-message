import {
  ADMIN_REPAIR_NEXT,
  ADMIN_REPAIR_NEXT_READY,
  RELATED_INIT,
} from './../../constants'

import { put, select, take } from 'redux-saga/effects'
import { getCurrentIndex, getData, getMode } from '../../_modules/selectors'

function getNextIndex(counter: number, limit: number) {

  return counter + 1 === limit ? 0 : counter + 1
}

export function* nextSaga() {
  while (true) {
    yield take(ADMIN_REPAIR_NEXT)
    const currentIndex = yield select(getCurrentIndex)
    const data = yield select(getData)
    const currentIndexValue = getNextIndex(currentIndex, data.length)
    console.log(data[currentIndexValue])

    yield put({
      payload: {
        currentIndex: currentIndexValue,
        currentInstance: data[currentIndexValue],
      },
      type: ADMIN_REPAIR_NEXT_READY,
    })

    const mode = yield select(getMode)

    if (mode === 'RELATED') {
      yield put({ type: RELATED_INIT })
    }
  }
}
