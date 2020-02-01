import { createAction } from 'create-action'
import {
  RELATED_CUSTOM_WORD,
  RELATED_DEFINITION,
  RELATED_INIT,
  RELATED_NAV_NEXT,
  RELATED_NAV_PREV,
  RELATED_READY,
  RELATED_REQUEST,
  RELATED_SELECT,
  RELATED_SUGGEST,
  RELATED_TRANSLATE,
  RELATED_TRANSLATE_READY,
} from '../constants'

export const customWord = createAction(RELATED_CUSTOM_WORD)
export const translate = createAction(RELATED_TRANSLATE)
export const translateReady = createAction(RELATED_TRANSLATE_READY)
export const definition = createAction(RELATED_DEFINITION)
export const init = createAction(RELATED_INIT)
export const navNext = createAction(RELATED_NAV_NEXT)
export const navPrev = createAction(RELATED_NAV_PREV)
export const ready = createAction(RELATED_READY)
export const request = createAction(RELATED_REQUEST)
export const select = createAction(RELATED_SELECT)
export const suggest = createAction(RELATED_SUGGEST)
