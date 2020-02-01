import { combineEpics } from 'redux-observable'

// IMPORT_EPICS
import { checkEpic } from './check'
import { clickEpic } from './click'
import { initEpic } from './init'
import { initReadyEpic } from './initReady'
import { keypressEpic } from './keypress'
import { nextEpic } from './next'
import { stepEpic } from './step'

export const chooseWordEpic = combineEpics(
  // CONNECT_EPICS
  checkEpic,
  clickEpic,
  initEpic,
  initReadyEpic,
  keypressEpic,
  nextEpic,
  stepEpic,
)
