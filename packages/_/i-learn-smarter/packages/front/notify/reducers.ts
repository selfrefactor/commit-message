import { replace } from 'rambdax'
import {
  HIDDEN,
  IN,
  NOTIFY,
  NOTIFY_ERROR,
  NOTIFY_INFO,
  NOTIFY_SUCCESS,
  NOTIFY_WARNING,
  NOTIFY_LOADING,
  LOADING_VISIBLE,
  LOADING_START,
  STOP,
  OUT,
} from './constants'

const initialState = {
  message: '',
  mode: '',
  ms: 1000,
  status: HIDDEN,
}

function getModeFromAction(action) {
  return action === NOTIFY_LOADING ?
    LOADING_START :
    replace(NOTIFY, '', action.type)
}

export function notifyStore(
  state = initialState,
  action,
) {

  switch (action.type) {
    case NOTIFY_SUCCESS:
    case NOTIFY_ERROR:
    case NOTIFY_INFO:
    case NOTIFY_WARNING:
    case NOTIFY_LOADING:
      return {
        ...state,
        ...action.payload,
        mode: getModeFromAction(action),
        status: HIDDEN,
      }
    case LOADING_START:
      return {
        ...state,
        status: LOADING_VISIBLE,
      }
    case IN:
      return {
        ...state,
        status: IN,
      }
    case OUT:
      return {
        ...state,
        status: OUT,
      }
    case STOP:
      return {
        ...state,
        ...initialState,
        status: HIDDEN,
      }
    default:
      return state
  }
}
