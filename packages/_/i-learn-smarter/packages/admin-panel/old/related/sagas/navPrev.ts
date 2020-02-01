import { put, select, take } from 'redux-saga/effects'
import { getRelatedState } from '../../_modules/selectors'
import { updateRelated } from '../../admin_repair/actions'
import { RELATED_NAV_PREV } from '../../constants'

export function* relatedNavPrevSaga() {
  while (true) {
    const { payload } = yield take(RELATED_NAV_PREV)

    const related = yield select(getRelatedState)
    const key = `${payload}Index`

    const currentIndex = related[key]

    /**
     * When we are already at tail of the list_
     * we have nothing to do
     */
    if (currentIndex === 0) {
      continue
    }

    const newRelated = {
      ...related,
      [key]: currentIndex - 1,
    }

    yield put(updateRelated(newRelated))
  }
}
