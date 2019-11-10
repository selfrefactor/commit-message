import { createAction } from 'create-action'
import {
  // IMPORT_CONSTANTS
  FOO_INIT
} from '../constants'

// ACTIONS
export const init = createAction(FOO_INIT)

