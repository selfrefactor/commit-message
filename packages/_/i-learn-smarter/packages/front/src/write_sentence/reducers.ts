import { okCorrectBee } from '../bees/okCorrect'
import {
  WRITE_SENTENCE_INIT_READY,
  WRITE_SENTENCE_MIC_READY,
  WRITE_SENTENCE_READY,
  WRITE_SENTENCE_SET_INDEX,
  WRITE_SENTENCE_SET_INPUT,
  WRITE_SENTENCE_SET_NEXT,
  WRITE_SENTENCE_SET_OK_CORRECT,
  WRITE_SENTENCE_STOP,
  WRITE_SENTENCE_UNMOUNT,
} from '../constants'

const initialState = {
  ready: false,
}

export function writeSentenceStore(
  state: WriteSentenceStore = initialState,
  action: Action,
): WriteSentenceStore {

  switch (action.type) {
    case WRITE_SENTENCE_INIT_READY:
      return {
        ...state,
        currentIndex: -1,
        db: action.payload,
      }
    case WRITE_SENTENCE_READY:
      return {
        ...state,
        ready: true,
      }
    case WRITE_SENTENCE_SET_INPUT:
      return {
        ...state,
        inputState: action.payload.input,
        question: action.payload.question,
      }
    case WRITE_SENTENCE_SET_INDEX:
      return {
        ...state,
        index: state.index + 1,
        inputState: '',
      }
    case WRITE_SENTENCE_MIC_READY:
      return {
        ...state,
        listen: false,
      }
    case WRITE_SENTENCE_STOP:
      return {
        ...state,
        index: state.index + 1,
        inputState: '',
        listen: false,
      }
    case WRITE_SENTENCE_SET_NEXT:
      return {
        ...state,
        ...action.payload,
        index: 0,
        inputState: '',
        listen: true,
      }
    case WRITE_SENTENCE_SET_OK_CORRECT:
      return okCorrectBee(state, action.payload)
    /**
     * Clean-up the state
     */
    case WRITE_SENTENCE_UNMOUNT:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
