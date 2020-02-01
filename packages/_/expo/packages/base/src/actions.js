import {createAction} from 'create-action'
import {
  NEXT,
  NEXT_READY,
  SHOW_NEXT,
  ANIMATION_START,
  ANIMATION_READY,
  PRESS,
  PRESS_READY,
} from './constants'

export const animationReady = createAction(ANIMATION_READY)
export const animationStart = createAction(ANIMATION_START)
export const next = createAction(NEXT)
export const nextReady = createAction(NEXT_READY)
export const press = createAction(PRESS)
// It displays wrong border when wrong answer is pressed
// ============================================
export const pressReady = createAction(PRESS_READY)
export const showNext = createAction(SHOW_NEXT)