import { combineEpics } from 'redux-observable'

import { checkEpic } from './check'
import { initEpic } from './init'
import { initReadyEpic } from './initReady'
import { listenEpic } from './listen'
import { micEpic } from './mic'
import { nextEpic } from './next'
import { stepEpic } from './step'

export const writeSentenceEpic = combineEpics(
  // CONNECT_EPICS
  checkEpic,
  micEpic,
  initEpic,
  initReadyEpic,
  listenEpic,
  nextEpic,
  stepEpic,
)
