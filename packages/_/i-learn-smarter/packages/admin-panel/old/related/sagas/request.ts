import {
  getCurrentInstance,
  getRelatedState,
} from '../../_modules/selectors'

import { put, select, take } from 'redux-saga/effects'
import { getRelated } from '../../_modules/getRelated'
import { initialRelated } from '../../admin_repair/reducers'
import { RELATED_READY, RELATED_REQUEST } from '../../constants'

export function* relatedRequestSaga() {
  while (true) {
    try {
      const { payload } = yield take(RELATED_REQUEST)

      const indexKey = `${payload}Index`

      const currentInstance = yield select(getCurrentInstance)
      const related = yield getRelated(currentInstance, payload)
      const relatedState = yield select(getRelatedState)

      const filtered = related.filter(
        x => !relatedState[payload].includes(x),
      )

      yield put({
        payload: {
          ...initialRelated,
          [payload]: filtered,
          [indexKey]: 0,
        },
        type: RELATED_READY,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
