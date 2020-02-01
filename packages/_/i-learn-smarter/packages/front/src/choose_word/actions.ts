import { createActionAnt } from '../ants/createAction'
import {
  // IMPORT_CONSTANTS
  CHOOSE_WORD_CHECK,
  CHOOSE_WORD_CLICK,
  CHOOSE_WORD_INC_INDEX,
  CHOOSE_WORD_INC_POINTS,
  CHOOSE_WORD_INIT,
  CHOOSE_WORD_INIT_READY,
  CHOOSE_WORD_NEXT,
  CHOOSE_WORD_NEXT_READY,
  CHOOSE_WORD_SHOW,
  CHOOSE_WORD_STEP,
  CHOOSE_WORD_STOP,
} from '../constants'

// ACTIONS
export const check = createActionAnt(CHOOSE_WORD_CHECK)
export const click = createActionAnt(CHOOSE_WORD_CLICK)
export const init = createActionAnt(CHOOSE_WORD_INIT)
export const initReady = createActionAnt(CHOOSE_WORD_INIT_READY)
export const incIndex = createActionAnt(CHOOSE_WORD_INC_INDEX)
export const incPoints = createActionAnt(CHOOSE_WORD_INC_POINTS)
export const next = createActionAnt(CHOOSE_WORD_NEXT)
export const nextReady = createActionAnt(CHOOSE_WORD_NEXT_READY)
export const show = createActionAnt(CHOOSE_WORD_SHOW)
export const step = createActionAnt(CHOOSE_WORD_STEP)
export const stop = createActionAnt(CHOOSE_WORD_STOP)
