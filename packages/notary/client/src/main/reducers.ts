import { MAIN_GET_TEXT_READY } from '../constants'

const initialState = {
    ready: false,
    notary: ''
  }
  
export function mainStore(
  state: MainStore = initialState,
  action: Action,
): MainStore {

  switch (action.type) {
    case MAIN_GET_TEXT_READY:
      return {
        ...state,
        notary: action.payload.notary,
      }
    default:
      return state
  }
}