import { createActionAnt } from '../ants/createAction'
import {
  // IMPORT_CONSTANTS
  LESSON_CLICK,
  LESSON_INIT,
  LESSON_INIT_READY,
  LESSON_NEXT,
  LESSON_QUESTION_READY,
} from '../constants'

// ACTIONS
export const next = createActionAnt(LESSON_NEXT)
export const questionReady = createActionAnt(LESSON_QUESTION_READY)
export const click = createActionAnt(LESSON_CLICK)
export const initReady = createActionAnt(LESSON_INIT_READY)
export const init = createActionAnt(LESSON_INIT)
