import { combineEpics } from 'redux-observable'
import { initEpic } from './init'
import { nextEpic, nextIntervalEpic, nextReactionEpic, initReactionEpic } from './next'

export const rootEpic = combineEpics(
  initEpic,
  initReactionEpic,
  nextIntervalEpic,
  nextReactionEpic,
  nextEpic,
)
