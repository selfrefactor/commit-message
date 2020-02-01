import { createReducer } from '../_modules/createReducer'
import {
  SINGLE_INSERT_INPUT_CHANGE,
  SINGLE_INSERT_RESET,
  SINGLE_INSERT_TRANSLATE_READY,
} from '../constants'
const initialState: SingleInsertStore = {
  bgPart: '',
  bgWord: '',
  dePart: '',
  deWord: '',
  enPart: '',
  enWord: '',
}

const reactions = {
  [SINGLE_INSERT_INPUT_CHANGE]: (state, action) => ({
    ...state,
    [action.payload.mode]: action.payload.newValue,
  }),
  [SINGLE_INSERT_RESET]: (state, action) => ({
    ...state,
    ...initialState,
  }),
  [SINGLE_INSERT_TRANSLATE_READY]: (state, action) => ({
    ...state,
    ...action.payload,
  }),
}

export const singleInsertStore = createReducer({ initialState, reactions })
