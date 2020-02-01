import { all } from 'redux-saga/effects'

import { createDocumentSaga } from './sagas/createDocument'
import { translatePartSaga } from './sagas/translatePart'
import { translateWordSaga } from './sagas/translateWord'

export function* singleInsertSagas() {
  return yield all([
    createDocumentSaga(),
    translatePartSaga(),
    translateWordSaga(),
  ])
}
