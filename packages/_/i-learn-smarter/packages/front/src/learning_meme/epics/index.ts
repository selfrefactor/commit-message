import { combineEpics } from 'redux-observable'

import { checkEpic } from './check'
import { initEpic } from './init'
import { initReadyEpic } from './initReady'
import { listenEpic } from './listen'
import { nextEpic } from './next'

export const learningMemeEpic = combineEpics(
  // CONNECT_EPICS
  initEpic,
  initReadyEpic,
  nextEpic,
  listenEpic,
  checkEpic,
)
