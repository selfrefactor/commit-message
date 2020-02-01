import { createActionAnt } from '../ants/createAction'

import {
  INIT,
  INIT_READY,
  SHARED_ADD_POINTS,
  SHARED_ADD_POINTS_READY,
  SHARED_SPEAK,
} from '../constants'

export const init = createActionAnt(INIT)
export const notifyInfo = createActionAnt('notify@INFO')
export const notifyError = createActionAnt('notify@ERROR')
export const initReady = createActionAnt(INIT_READY)
export const sharedAddPoints = createActionAnt(SHARED_ADD_POINTS)
export const sharedAddPointsReady = createActionAnt(SHARED_ADD_POINTS_READY)
export const sharedSpeak = createActionAnt(SHARED_SPEAK)
export const sharedSpeakTo = sharedSpeak('toPart')
