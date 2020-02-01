import { createAction } from 'create-action'
import {
  ADMIN_REPAIR_CHANGE_MODE,
  ADMIN_REPAIR_CHANGE_RANDOM,
  ADMIN_REPAIR_CLICK_IMAGE,
  ADMIN_REPAIR_NEXT,
  ADMIN_REPAIR_SEARCH_IMAGE,
  ADMIN_REPAIR_TO_BULGARIAN,
  ADMIN_REPAIR_TO_BULGARIAN_READY,
  ADMIN_REPAIR_TOGGLE_PC,
  ADMIN_REPAIR_TRANSLATE,
  ADMIN_REPAIR_UPDATE,
  ADMIN_REPAIR_UPDATE_RELATED,
} from '../constants'

export const changeMode = createAction(ADMIN_REPAIR_CHANGE_MODE)
export const changeRandom = createAction(ADMIN_REPAIR_CHANGE_RANDOM)
export const clickImage = createAction(ADMIN_REPAIR_CLICK_IMAGE)
export const next = createAction(ADMIN_REPAIR_NEXT)
export const togglePC = createAction(ADMIN_REPAIR_TOGGLE_PC)
export const toBulgarian = createAction(ADMIN_REPAIR_TO_BULGARIAN)
export const toBulgarianReady = createAction(ADMIN_REPAIR_TO_BULGARIAN_READY)
export const searchImage = createAction(ADMIN_REPAIR_SEARCH_IMAGE)
export const translate = createAction(ADMIN_REPAIR_TRANSLATE)
export const update = createAction(ADMIN_REPAIR_UPDATE)
export const updateRelated = createAction(ADMIN_REPAIR_UPDATE_RELATED)
