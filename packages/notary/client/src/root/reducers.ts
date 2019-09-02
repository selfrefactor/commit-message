import { combineReducers } from 'redux'

// STORES
import { mainStore } from '../main/reducers'
import { notifyStore } from 'notify/reducers'
import { TOGGLE_NAVIGATION } from '../constants'

const initialState: Store = {
  navigationActive: false,
}

export function store(
  state: Store = initialState,
  action: Action,
): Store {

  switch (action.type) {
    case TOGGLE_NAVIGATION:
      return {
        ...state,
        navigationActive: !state.navigationActive,
      }
    default:
      return state
  }
}

const allReducers = {
  // CONNECT_STORES
  mainStore,
  notifyStore,
  store,
}

export const rootReducer = combineReducers(allReducers)
