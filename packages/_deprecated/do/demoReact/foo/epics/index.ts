import { combineEpics } from 'redux-observable'
// IMPORT_EPICS
import { initEpic } from './initEpic'
  
export const fooEpic = combineEpics(
  // CONNECT_EPICS
  initEpic,
)