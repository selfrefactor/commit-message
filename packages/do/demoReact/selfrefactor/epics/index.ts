import { combineEpics } from 'redux-observable'
// MPORT_EPICS
import { initEpic } from './initEpic'
  
export const selfrefactorEpic = combineEpics(
  // ONNECT_EPICS
  initEpic,
)