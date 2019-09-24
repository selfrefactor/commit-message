import { FOO_INCREMENT } from '../constants'

export function fooReducer(state, action){
  switch (action.type){
  case FOO_INCREMENT:
    return {
      ...state,
      counter : state.counter + 1,
    }
  default:
    return state
  }
}

export const initialFooStore = {
  ready   : false,
  counter : 0,
}
