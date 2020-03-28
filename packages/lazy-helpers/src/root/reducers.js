import { defaultTo } from 'rambdax'
import * as _ from '../constants'

const timeComponentValue = Number(
  defaultTo(
    '20',
    localStorage.getItem(_.TIME_COMPONENT_VALUE),
  ),
)

const initialState = {
  buffer: {
    custom: '',
    description: false,
    h1: false,
    title: '',
  },
  cancel: false,
  componentFlag: 'MAIN',
  timeComponent: 'SLOW_SCROLL',
  timeComponentValue: timeComponentValue,
}

export function rootStore(
  state = initialState,
  action,
){
  switch (action.type) {
    case _.BUTTON_CLICK:
      return {
      ...state,
      componentFlag: action.payload,
    }
    case _.CLOSE:
      return {
        ...state,
        componentFlag: 'CLOSE',
      }
    case _.SET_CANCEL:
      return {
        ...state,
        cancel: !state.cancel,
      }
    case _.SET_TIME_COMPONENT:
      return {
        ...state,
        timeComponent: action.payload,
      }
    case _.SET_TIME_VALUE:
      return {
        ...state,
        timeComponentValue: action.payload,
      }
    case _.SET_BUFFER_PROPS:
      return {
        ...state,
      buffer: action.payload,
      }
    case _.RESET:  
    case _.INIT:
      return {
        ...state,
        componentFlag: 'MAIN',
      }
    default:
      return state
  }
}
