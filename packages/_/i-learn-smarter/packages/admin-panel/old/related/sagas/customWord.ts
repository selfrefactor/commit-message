import {
  ADMIN_REPAIR_UPDATE_INSTANCE,
  RELATED_CUSTOM_WORD,
  RELATED_READY,
} from '../../constants'

import {
  getRelatedMode,
  getRelatedState,
} from '../../_modules/selectors'

import { init, last } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'

import { notifyWhenSuggestions } from '../../_helpers/notify'
import { getRelatedRequest } from '../../_modules/getRelated'
import { getCurrentInstance } from '../../_modules/selectors'
import { initialRelated } from '../../admin_repair/reducers'

export function* relatedCustomWordSaga() {
  while (true) {
    yield take(RELATED_CUSTOM_WORD)
    const relatedMode = yield select(getRelatedMode)

    if (relatedMode === 'SUGGESTIONS') {
      yield notifyWhenSuggestions()
      continue
    }

    const word = prompt('Напишете дума или завършете с точка(.) за ново търсене')

    // When last char is fullstop
    // then this is request for GoogleTranslate
    // otherwise it is request to add to related
    ///////////////////////////
    if (last(word) !== '.'){
      const currentInstance = yield select(getCurrentInstance)

      currentInstance.bgRelated = [
        ...currentInstance.bgRelated,
        word,
      ]
      yield put({
        payload: currentInstance,
        type: ADMIN_REPAIR_UPDATE_INSTANCE,
      })

      continue
    }

    const relatedState = yield select(getRelatedState)
    const related = yield getRelatedRequest('bg', init(word))
    const filtered = related.filter(
      x => !relatedState.bg.includes(x),
    )

    yield put({
      payload: {
        ...initialRelated,
        bg: filtered,
      },
      type: RELATED_READY,
    })
  }
}
