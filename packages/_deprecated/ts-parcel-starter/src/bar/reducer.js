import { BAR_INCREMENT } from '../constants'

export function barReducer(state, action){
  switch (action.type){
  case BAR_INCREMENT:
    return {
      ...state,
      counter : state.counter + 11,
    }
  default:
    return state
  }
}

export const initialBarStore = {
  ready   : false,
  counter : 10,
}
