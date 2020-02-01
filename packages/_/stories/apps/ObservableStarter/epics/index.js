import { combineEpics } from 'redux-observable'
import { epic } from './epic'

export const rootEpic = combineEpics(
  epic,
)
