import { 
  FETCH_READY, 
  IN, 
  OUT,
  ON,
  OFF, 
} from '../constants'

import { getInitialState } from '../_helpers/getInitialState'
import { randomSeed } from '../_helpers/randomSeed'

export function store(
  state: Store = getInitialState(),
  action: Action,
): Store {

  switch (action.type) {
    case IN:
      return {
        ...state,
        status: IN,
        seeds: [randomSeed(), randomSeed()],        
      }
    case OUT:
      return {
        ...state,
        status: OUT
      }
    case ON:
      return {
        ...state,
        status: ON,
      }
    case FETCH_READY:
      return {
        ...state,
        status: OFF,
        words: action.payload
      }
    default:
      return state
  }
}

