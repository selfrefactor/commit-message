import { createReducer } from '../ants/createReducer'

export const initialState: InitialState = {
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
}

export const store = createReducer({ initialState, reactions })
