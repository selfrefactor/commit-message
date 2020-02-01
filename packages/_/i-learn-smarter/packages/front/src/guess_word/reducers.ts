import {
  GUESS_WORD_INIT_READY,
  GUESS_WORD_INPUT_CHANGE,
  GUESS_WORD_NEXT_READY,
  GUESS_WORD_STOP,
  GUESS_WORD_UNMOUNT,
} from '../constants'

const initialState: GuessWordStore = {
  answer: '',
  currentIndex: -1,
  db: [],
  inputState: '',
  listen: false,
  question: '',
  ready: false,
  related: [],
  translated: '',
  wordAnswer: '',
  wordQuestion: '',
}

export function guessWordStore(
  state: GuessWordStore = initialState,
  action: Action,
): GuessWordStore {

  switch (action.type) {
    case GUESS_WORD_INIT_READY:
      return {
        ...state,
        db: action.payload,
      }
    case GUESS_WORD_NEXT_READY:
      return {
        ...state,
        listen: true,
        ready: true,
        ...action.payload,
      }
    case GUESS_WORD_STOP:
      return {
        ...state,
        inputState: '',
        listen: false,
      }
    case GUESS_WORD_INPUT_CHANGE:
      return {
        ...state,
        inputState: action.payload,
      }
    case GUESS_WORD_UNMOUNT:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
