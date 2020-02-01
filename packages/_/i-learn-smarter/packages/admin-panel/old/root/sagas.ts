import { all } from 'redux-saga/effects'

import { checkPouchLoginSaga } from './sagas/checkPouchLoginSaga'
import { initSyncSaga } from './sagas/initSyncSaga'
import { logoutSaga } from './sagas/logoutSaga'
import { onceSaga } from './sagas/onceSaga'

export function* rootSagas() {
  return yield all([
    checkPouchLoginSaga(),
    initSyncSaga(),
    logoutSaga(),
    onceSaga(),
  ])
}
