import { combineEpics } from 'redux-observable'
// IMPORT_EPICS
import { checkEpic } from './check'
import { clickEpic } from './click'
import { initEpic } from './init'
import { initReadyEpic } from './initReady'
import { nextEpic } from './next'
import { stopEpic } from './stop'

export const selectArticleEpic = combineEpics(
  // CONNECT_EPICS
  checkEpic,
  stopEpic,
  clickEpic,
  nextEpic,
  initReadyEpic,
  initEpic,
)
