import { all } from 'redux-saga/effects'

import { pressSaga } from './sagas/press'
import { nextSaga } from './sagas/next'

export function* rootSagas() {
  return yield all([
    pressSaga(),
    nextSaga(),
  ])
}
