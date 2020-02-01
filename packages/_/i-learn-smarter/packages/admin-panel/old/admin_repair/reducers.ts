import {
  ADMIN_REPAIR_CHANGE_IMAGE,
  ADMIN_REPAIR_CHANGE_MODE,
  ADMIN_REPAIR_CHANGE_RANDOM,
  ADMIN_REPAIR_IMAGES_READY,
  ADMIN_REPAIR_INPUT_CHANGE,
  ADMIN_REPAIR_LOAD_READY,
  ADMIN_REPAIR_NEXT_READY,
  ADMIN_REPAIR_SEARCH_IMAGE,
  ADMIN_REPAIR_TO_BULGARIAN_READY,
  ADMIN_REPAIR_TOGGLE_PC,
  ADMIN_REPAIR_TRANSLATE_READY,
  ADMIN_REPAIR_UPDATE_INSTANCE,
  ADMIN_REPAIR_UPDATE_READY,
  ADMIN_REPAIR_UPDATE_RELATED,
  RELATED_INIT,
  RELATED_READY,
  RELATED_SUGGEST,
} from './../constants'

import { initialGet } from 'client-helpers'
import { merge, switcher } from 'rambdax'
import { createReducer } from '../_modules/createReducer'
import { RELATED, SHOW, SUGGESTIONS } from '../constants'

export const initialRelated = {
  bg: [],
  bgIndex: 0,
  de: [],
  deIndex: 0,
  en: [],
  enIndex: 0,
}

const INIT_CURRENT_INDEX = 0

const randomFlag = initialGet({
  defaultValue: false,
  key: 'randomFlag',
})

const mode = initialGet<Mode>({
  defaultValue: RELATED,
  key: 'mode',
})

const initialState: AdminRepairStore = {
  currentIndex: INIT_CURRENT_INDEX,
  currentInstance: {},
  hoverTranslation: 'more',
  data: [],
  images: [],
  loaded: false,
  mode,
  randomFlag,
  related: initialRelated,
  relatedMode: SHOW,
  showImages: false,
}

const reactions: any = {}

reactions[ADMIN_REPAIR_UPDATE_READY] = (state, action) => ({
  ...state,
  currentInstance: action.payload,
  related: {
    ...state.related,
    bgIndex: 0,
    deIndex: 0,
    enIndex: 0,
  },
  relatedMode: SHOW,
})

reactions[ADMIN_REPAIR_SEARCH_IMAGE] = (state, action) => ({
  ...state,
  images: [],
})

/**
 * new image is set, document updated and then stop showing images
 */
reactions[ADMIN_REPAIR_CHANGE_IMAGE] = (state, action) => ({
  ...state,
  currentInstance: action.payload,
  showImages: false,
})

/**
 * image search query is ready
 */
reactions[ADMIN_REPAIR_IMAGES_READY] = (state, action) => ({
  ...state,
  images: action.payload,
  showImages: true,
})

/**
 * Translation to Bulgarian word and part
 */
reactions[ADMIN_REPAIR_TO_BULGARIAN_READY] = (state, action) => ({
  ...state,
  currentInstance: {
    ...state.currentInstance,
    ...action.payload,
  },
})

function getMode(currentMode: Mode): Mode {

  return switcher<Mode>(currentMode)
    .is('IMAGELESS', 'IMAGEFULL')
    .is('IMAGEFULL', 'RELATED')
    .default('IMAGELESS')
}

reactions[ADMIN_REPAIR_CHANGE_MODE] = (state: AdminRepairStore, action) => {
  const localMode = getMode(state.mode)
  localStorage.setItem('mode', localMode)

  return {
    ...state,
    mode: localMode,
  }
}

reactions[RELATED_INIT] = (state, action) => {
  return {
    ...state,
    related: initialRelated,
    relatedMode: SHOW,
  }
}

reactions[RELATED_READY] = (state, action) => {
  return {
    ...state,
    related: action.payload,
    relatedMode: SUGGESTIONS,
  }
}

reactions[RELATED_SUGGEST] = (state, action) => {
  return {
    ...state,
    currentInstance: action.payload.currentInstance,
    related: action.payload.related,
  }
}

/**
 * Translated related words are ready
 */
reactions[ADMIN_REPAIR_UPDATE_RELATED] = (state, action) => {

  return {
    ...state,
    related: action.payload,
  }
}

/**
 * Translated related words are ready
 */
reactions[ADMIN_REPAIR_UPDATE_INSTANCE] = (state, action) => {

  return {
    ...state,
    currentInstance: action.payload,
  }
}

/**
 * toggle random mode which will emit also reinitialization action
 */
reactions[ADMIN_REPAIR_CHANGE_RANDOM] = (state, action) => {
  localStorage.setItem('randomFlag', `${!state.randomFlag}`)

  return {
    ...state,
    randomFlag: !state.randomFlag,
  }
}

reactions[ADMIN_REPAIR_INPUT_CHANGE] = (state, action) => ({
  ...state,
  currentInstance: merge(state.currentInstance, action.payload),
})

reactions[ADMIN_REPAIR_NEXT_READY] = (state, action) => ({
  ...state,
  currentIndex: action.payload.currentIndex,
  currentInstance: action.payload.currentInstance,
  showImages: false,
})

reactions[ADMIN_REPAIR_LOAD_READY] = (state, action) => ({
  ...state,
  currentIndex: action.payload.currentIndex,
  currentInstance: action.payload.currentInstance,
  data: action.payload.data,
  loaded: true,
})

reactions[ADMIN_REPAIR_TRANSLATE_READY] = (state, action) => ({
  ...state,
  currentInstance: action.payload,
})

/**
 * PC
 */
reactions[ADMIN_REPAIR_TOGGLE_PC] = (state, action) => ({
  ...state,
  currentInstance: {
    ...state.currentInstance,
    pcFlag: action.payload,
  },
})

export const adminRepairStore = createReducer({
  initialState,
  reactions,
})
