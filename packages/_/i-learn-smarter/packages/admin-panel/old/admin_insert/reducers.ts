import { createReducer } from '../_modules/createReducer'
import { ADMIN_INSERT_DATA_READY, ADMIN_INSERT_LOAD } from '../constants'

const initialState = {
  data: [],
  idCollection: [],
  loaded: false,
  translated: [],
}

const reactions = {
  [ADMIN_INSERT_DATA_READY]: (state, action) => ({
    ...state,
    data: action.payload.data,
    idCollection: action.payload.idCollection,
    loaded: true,
    translated: action.payload.translated,
  }),
  [ADMIN_INSERT_LOAD]: (state, action) => ({
    ...state,
    loaded: false,
  }),
}

export const adminInsertStore = createReducer({ initialState, reactions })
