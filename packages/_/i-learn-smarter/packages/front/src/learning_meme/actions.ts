import { createActionAnt } from '../ants/createAction'
import {
  LEARNING_MEME_CHECK,
  LEARNING_MEME_INIT,
  LEARNING_MEME_INIT_READY,
  LEARNING_MEME_LISTEN,
  LEARNING_MEME_NEXT,
  LEARNING_MEME_NEXT_READY,
  LEARNING_MEME_SET_INPUT,
  LEARNING_MEME_STOP,
} from '../constants'

// ACTIONS
export const init = createActionAnt(LEARNING_MEME_INIT)
export const initReady = createActionAnt(LEARNING_MEME_INIT_READY)
export const check = createActionAnt(LEARNING_MEME_CHECK)
export const stop = createActionAnt(LEARNING_MEME_STOP)
export const next = createActionAnt(LEARNING_MEME_NEXT)
export const nextReady = createActionAnt(LEARNING_MEME_NEXT_READY)
export const listen = createActionAnt(LEARNING_MEME_LISTEN)
export const setInput = createActionAnt(LEARNING_MEME_SET_INPUT)
