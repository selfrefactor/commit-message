import { combineEpics } from 'redux-observable'
// IMPORT_EPICS
import { fetchReadyEpic } from './fetchReady'
import { tickEpic } from './tick'
import { fetchEpic } from './fetch'
import { initEpic } from './init'
  
export const jokeMakerEpic = combineEpics(
  // CONNECT_EPICS
  fetchReadyEpic,
  tickEpic,
  fetchEpic,
  initEpic,
)