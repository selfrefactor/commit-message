import { all } from 'redux-saga/effects'

import { bufferInputSaga, bufferSubmitSaga } from '../buffer/sagas'
import { genericClickNextSaga } from '../sagas/genericClickNextSaga'
import { googleImageSaga } from '../sagas/googleImageSaga'
import { initSaga } from '../sagas/initSaga'
import { slowScrollSaga } from '../sagas/slowScrollSaga'

export default function* rootSaga(){
  return yield all([
    bufferInputSaga(),
    bufferSubmitSaga(),
    genericClickNextSaga(),
    googleImageSaga(),
    initSaga(),
    slowScrollSaga(),
  ])
}
