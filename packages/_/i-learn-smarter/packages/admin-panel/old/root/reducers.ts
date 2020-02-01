import { createReducer } from '../_modules/createReducer'

export const initialState: InitialState = {
  db: false,
  dbCloud: false,
  dbDraft: false,
  dbDraftCloud: false,
  logged: false,
  password: false,
}

const reactions = {
  INIT_READY: (state, action) => ({
    ...state,
    logged: true,
  }),
  SET_PASSWORD: (state, action) => ({
    ...state,
    password: action.payload,
  }),
  SET_POUCH: (state, action) => ({
    ...state,
    db: action.payload.db,
    dbCloud: action.payload.dbCloud,
    dbDraft: action.payload.dbDraft,
    dbDraftCloud: action.payload.dbDraftCloud,
  }),
}

export const store = createReducer({ initialState, reactions })
