import { createAction } from 'create-action'
import {
  // IMPORT_CONSTANTS
  FETCH_READY,
  FETCH,
  ON,
  OUT,
  OFF,
} from '../constants'

// ACTIONS
export const fetchReady = createAction(FETCH_READY)
export const fetch = createAction(FETCH)
export const on = createAction(ON)
export const out = createAction(OUT)
export const ignore = createAction('_')
export const off = createAction(OFF)
