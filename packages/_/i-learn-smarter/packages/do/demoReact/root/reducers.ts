import { 
  // IMPORT_CONSTANTS
  TOGGLE_NAVIGATION 
} from '../constants'

const initialState: Store = {
  navigationActive: false,
}

export function store(
  state: Store = initialState,
  action: Action,
): Store {

  switch (action.type) {
    // STORE_SWITCH
    case TOGGLE_NAVIGATION:
      return {
        ...state,
        navigationActive: !state.navigationActive,
      }
    default:
      return state
  }
}