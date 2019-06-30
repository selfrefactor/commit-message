import { combineEpics } from 'redux-observable'

// IMPORT_EPICS
import { fooEpic } from '../../foo/epics/'
import { notifyEpic } from 'notify/epic'
import { clickEpic } from './clickEpic'
import { navigationEpic } from '../../navigation/epics/'

export const rootEpic = combineEpics(
  // CONNECT_EPICS
  fooEpic,
  clickEpic,
  navigationEpic,
  notifyEpic,
)
