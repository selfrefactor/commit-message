import { all } from 'redux-saga/effects'

import { relatedCustomWordSaga } from '../related/sagas/customWord'
import { relatedDefinitionSaga } from '../related/sagas/definition'
import { relatedInitSaga } from '../related/sagas/init'
import { relatedNavNextSaga } from '../related/sagas/navNext'
import { relatedNavPrevSaga } from '../related/sagas/navPrev'
import { relatedRequestSaga } from '../related/sagas/request'
import { relatedSelectSaga } from '../related/sagas/select'
import { relatedSelectSuggestionSaga } from '../related/sagas/selectSuggestion'
import { relatedTranslateSaga } from '../related/sagas/translate'
import { changeModeSaga } from './sagas/changeMode'
import { clickImageSaga } from './sagas/clickImage'
import { initSaga } from './sagas/init'
import { loadSaga } from './sagas/load'
import { nextSaga } from './sagas/next'
import { resetSaga } from './sagas/reset'
import { searchImageSaga } from './sagas/searchImage'
import { toBulgarianSaga } from './sagas/toBulgarian'
import { translateSaga } from './sagas/translate'
import { updateSaga } from './sagas/update'

export function* adminRepairSagas() {
  return yield all([
    changeModeSaga(),
    clickImageSaga(),
    initSaga(),
    loadSaga(),
    nextSaga(),
    relatedCustomWordSaga(),
    relatedInitSaga(),
    relatedNavNextSaga(),
    relatedDefinitionSaga(),
    relatedNavPrevSaga(),
    relatedRequestSaga(),
    relatedSelectSaga(),
    relatedSelectSuggestionSaga(),
    relatedTranslateSaga(),
    resetSaga(),
    searchImageSaga(),
    toBulgarianSaga(),
    translateSaga(),
    updateSaga(),
  ])
}
