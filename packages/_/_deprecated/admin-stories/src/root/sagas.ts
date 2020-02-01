import { all } from 'redux-saga/effects'

import { logoutSaga } from './sagas/logoutSaga'
import { onceSaga } from './sagas/onceSaga'

export function* rootSagas() {
  return yield all([
    logoutSaga(),
    onceSaga(),
  ])
}
