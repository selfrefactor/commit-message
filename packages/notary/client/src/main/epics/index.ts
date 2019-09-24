import { combineEpics } from 'redux-observable'
// IMPORT_EPICS
import { uploadReadyEpic } from './uploadReadyEpic'

export const mainEpic = combineEpics(
  // CONNECT_EPICS
  uploadReadyEpic,
)
