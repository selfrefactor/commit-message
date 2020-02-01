import { put, select, take } from 'redux-saga/effects'
import { notifyNoResult, notifyWhenSuggestions } from '../../_helpers/notify'
import { getDefinitionRequest } from '../../_modules/getDefinition'
import { getRelatedMode, getRelatedState } from '../../_modules/selectors'
import {
  RELATED_DEFINITION,
  RELATED_READY,
} from '../../constants'

export function* relatedDefinitionSaga() {
  while (true) {
    try {
      const { payload } = yield take(RELATED_DEFINITION)
      const relatedMode = yield select(getRelatedMode)

      if (relatedMode === 'SUGGESTIONS') {
        yield notifyWhenSuggestions()
        continue
      }

      const indexKey = `${payload}Index`
      const related = yield select(getRelatedState)

      const word = prompt('Write a word to search for')
      const definition = yield getDefinitionRequest(payload, word)

      if (definition.length === 0) {
        yield notifyNoResult()
        continue
      }

      yield put({
        payload: {
          ...related,
          [payload]: definition,
          [indexKey]: 0,
        },
        type: RELATED_READY,
      })
    } catch (error) {
      console.log(error)
    }
  }
}
