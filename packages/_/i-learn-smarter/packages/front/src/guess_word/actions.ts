import { createActionAnt } from '../ants/createAction'
import {
  // IMPORT_CONSTANTS
  GUESS_WORD_CHECK,
  GUESS_WORD_INIT,
  GUESS_WORD_INIT_READY,
  GUESS_WORD_INPUT,
  GUESS_WORD_INPUT_CHANGE,
  GUESS_WORD_NEXT,
  GUESS_WORD_NEXT_READY,
  GUESS_WORD_STOP,
  GUESS_WORD_UNMOUNT,
} from '../constants'

// ACTIONS
export const check = createActionAnt(GUESS_WORD_CHECK)
export const init = createActionAnt(GUESS_WORD_INIT)
export const initReady = createActionAnt(GUESS_WORD_INIT_READY)
export const input = createActionAnt(GUESS_WORD_INPUT)
export const inputChange = createActionAnt(GUESS_WORD_INPUT_CHANGE)
export const next = createActionAnt(GUESS_WORD_NEXT)
export const nextReady = createActionAnt(GUESS_WORD_NEXT_READY)
export const nextTick = createActionAnt(GUESS_WORD_NEXT)
export const stop = createActionAnt(GUESS_WORD_STOP)
export const unmount = createActionAnt(GUESS_WORD_UNMOUNT)
