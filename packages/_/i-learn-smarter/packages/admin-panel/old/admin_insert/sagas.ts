import { all } from 'redux-saga/effects'

import { createDocumentSaga } from './sagas/createDocument'
import { initSaga } from './sagas/init'
import { loadSaga } from './sagas/load'
import { removeSaga } from './sagas/remove'

export function* adminInsertSagas() {
  return yield all([
    initSaga(),
    createDocumentSaga(),
    loadSaga(),
    removeSaga(),
  ])
}
