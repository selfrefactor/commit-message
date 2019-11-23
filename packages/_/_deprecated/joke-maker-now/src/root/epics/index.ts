import { combineEpics } from 'redux-observable'

// IMPORT_EPICS
import { jokeMakerEpic } from '../../joke_maker/epics/'
import { notifyEpic } from 'notify/epic'
import { clickEpic } from './clickEpic'

export const rootEpic = combineEpics(
  // CONNECT_EPICS
  jokeMakerEpic,
  clickEpic,
  notifyEpic,
)
