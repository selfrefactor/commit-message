import { put, select, take } from 'redux-saga/effects'
import {
  getCurrentInstance,
  getRelatedMode,
  getRelatedState,
} from '../../_modules/selectors'
import {
  ADMIN_REPAIR_UPDATE_INSTANCE,
  RELATED_SELECT,
} from '../../constants'

import { maybeEmit } from '../../_helpers/maybeEmit'
import { navPrev } from '../actions'

export function* relatedSelectSaga() {
  while (true) {
    const action: any = yield take(RELATED_SELECT)
    const relatedMode = yield select(getRelatedMode)

    if (relatedMode === 'SUGGESTIONS') {
      continue
    }

    const [[mode, word]] = Object.entries(action.payload)

    const currentInstance = yield select(getCurrentInstance)
    const key = `${mode}Related`

    currentInstance[key] = currentInstance[key].filter(
      x => x !== word,
    )

    const len = currentInstance[key].length
    const indexKey = `${mode}Index`

    const related = yield select(getRelatedState)
    const currentIndex = related[indexKey]

    /**
     * Check if new related state requires_
     * decrease of related.index
     */
    const decreaseIndex = len % 5 === 0 && len > 0 && len / 5 === currentIndex

    yield maybeEmit(decreaseIndex, navPrev(mode))

    yield put({
      payload: currentInstance,
      type: ADMIN_REPAIR_UPDATE_INSTANCE,
    })
  }
}
