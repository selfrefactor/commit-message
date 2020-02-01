import {
  getCurrentInstance,
  getRelatedMode,
  getRelatedState,
} from '../../_modules/selectors'

import { put, select, take } from 'redux-saga/effects'
import { RELATED_SELECT, RELATED_SUGGEST } from '../../constants'

export function* relatedSelectSuggestionSaga() {
  while (true) {
    const action: any = yield take(RELATED_SELECT)
    const relatedMode = yield select(getRelatedMode)
    if (relatedMode === 'SHOW') {
      continue
    }

    const currentInstance = yield select(getCurrentInstance)
    const related = yield select(getRelatedState)

    const [[mode, word]] = Object.entries(action.payload)
    const ok = currentInstance[`${mode}Related`] === undefined

    currentInstance[`${mode}Related`] = ok ?
      [word] :
      [...currentInstance[`${mode}Related`], word]

    related[mode] = related[mode].filter(
      x => x !== word,
    )

    const len = related[mode].length
    const keyIndex = `${mode}Index`
    const currentIndex = related[keyIndex]
    /**
     * Check if new related state requires_
     * decrease of related.index
     */
    const decreaseIndex = len % 5 === 0 && len > 0 && len / 5 === currentIndex

    related[keyIndex] = decreaseIndex ?
      related[keyIndex] - 1 :
      related[keyIndex]

    yield put({
      payload: { related, currentInstance },
      type: RELATED_SUGGEST,
    })

  }
}
