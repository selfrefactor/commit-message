import { combineEpics } from 'redux-observable'
// IMPORT_EPICS
import { checkEpic } from './check'
import { initEpic } from './init'
import { initReadyEpic } from './initReady'
import { inputEpic } from './input'
import { nextEpic } from './next'

export const guessWordEpic = combineEpics(
  // CONNECT_EPICS
  checkEpic,
  inputEpic,
  initReadyEpic,
  nextEpic,
  initEpic,
)
