import { take } from 'rambdax'
import { createReducer } from '../ants/createReducer'
import { ADMIN_INSERT_LOAD_KEYS, ADMIN_INSERT_NEXT_READY } from '../constants'

const initialState = {
  loaded: false,
  allKeys: [], 
  currentInstanceKeys: [],
  currentInstance: [],
}

const reactions = {
  [ADMIN_INSERT_LOAD_KEYS]: (state, action) => ({
    ...state,
    currentInstanceKeys: take(4, action.payload.allKeys),
    allKeys: action.payload.allKeys, 
  }),
  [ADMIN_INSERT_NEXT_READY]: (state, action) => ({
    ...state,
    loaded: true,
    currentInstance: action.payload.currentInstance,
  }),
}

export const adminInsertStore = createReducer({ initialState, reactions })
