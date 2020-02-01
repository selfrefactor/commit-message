import { memoize } from 'rambdax'
import { select, take } from 'redux-saga/effects'
import { longNotify } from '../../_helpers/notify'
import { getGermanTranslation } from '../../_modules/getTranslation'

import { getPassword } from '../../_modules/selectors'
import {RELATED_TRANSLATE} from '../../constants'

const getTranslation = memoize<any>(getGermanTranslation)

export function* relatedTranslateSaga() {
  while (true) {
    try {
      const { payload } = yield take(RELATED_TRANSLATE)

      const password = yield select(getPassword)

      const translation = yield getTranslation(
        password,
        payload,
      )

      yield longNotify(translation)
    } catch (error) {
      console.log(error)
    }
  }
}
