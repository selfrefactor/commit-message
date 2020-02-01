import { all } from 'redux-saga/effects'

import { createDocumentSaga } from './sagas/createDocument'
import { initSaga } from './sagas/init'
import { nextSaga } from './sagas/next'
import { removeSaga } from './sagas/remove'

export function* adminInsertSagas() {
  return yield all([
    initSaga(),
    createDocumentSaga(),
    nextSaga(),
    removeSaga(),
  ])
}
