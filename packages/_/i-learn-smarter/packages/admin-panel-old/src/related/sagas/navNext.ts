import { put, select, take } from 'redux-saga/effects'
import {
  getCurrentInstance,
  getRelatedMode,
  getRelatedState,
} from '../../_modules/selectors'
import { updateRelated } from '../../admin_repair/actions'
import {
  RELATED_NAV_NEXT,
  SHOW,
} from '../../constants'

export function* relatedNavNextSaga() {
  while (true) {
    const { payload } = yield take(RELATED_NAV_NEXT)

    const relatedMode = yield select(getRelatedMode)
    const related = yield select(getRelatedState)
    const currentInstance = yield select(getCurrentInstance)
    const key = `${payload}Index`

    const currentIndex = related[key]

    const visibleList = relatedMode === SHOW ?
      currentInstance[`${payload}Related`] :
      related[payload]
    const maxIndex = Math.ceil(visibleList.length / 5) - 1

    /**
     * When we are already at tail of the list_
     * we have nothing to do
     */
    if (currentIndex === maxIndex) {
      continue
    }

    const newRelated = {
      ...related,
      [key]: currentIndex + 1,
    }

    yield put(updateRelated(newRelated))
  }
}
