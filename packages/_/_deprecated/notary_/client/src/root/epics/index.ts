import { combineEpics } from 'redux-observable'

// EPICS
import { mainEpic } from '../../main/epics/'
import { notifyEpic } from 'notify/epic'
import { clickEpic } from './clickEpic'
import { navigationEpic } from '../../navigation/epics/'

export const rootEpic = combineEpics(
  // CONNECT_EPICS
  mainEpic,
  clickEpic,
  navigationEpic,
  notifyEpic,
)
