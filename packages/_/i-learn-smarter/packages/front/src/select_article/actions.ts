import { createActionAnt } from '../ants/createAction'
import {
  // IMPORT_CONSTANTS
  SELECT_ARTICLE_CHECK,
  SELECT_ARTICLE_CLICK,
  SELECT_ARTICLE_CLICK_READY,
  SELECT_ARTICLE_INIT,
  SELECT_ARTICLE_INIT_READY,
  SELECT_ARTICLE_NEXT,
  SELECT_ARTICLE_NEXT_READY,
  SELECT_ARTICLE_STOP,
} from '../constants'

// ACTIONS
export const check = createActionAnt(SELECT_ARTICLE_CHECK)
export const stop = createActionAnt(SELECT_ARTICLE_STOP)
export const click = createActionAnt(SELECT_ARTICLE_CLICK)
export const clickReady = createActionAnt(SELECT_ARTICLE_CLICK_READY)
export const init = createActionAnt(SELECT_ARTICLE_INIT)
export const initReady = createActionAnt(SELECT_ARTICLE_INIT_READY)
export const next = createActionAnt(SELECT_ARTICLE_NEXT)
export const nextReady = createActionAnt(SELECT_ARTICLE_NEXT_READY)
