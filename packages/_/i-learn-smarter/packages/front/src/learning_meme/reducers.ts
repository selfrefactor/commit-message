import { LEARNING_MEME_NEXT_READY } from '../constants'
import {
  LEARNING_MEME_INIT_READY,
  LEARNING_MEME_READY,
  LEARNING_MEME_SET_INPUT,
  LEARNING_MEME_STOP,
  LEARNING_MEME_UNMOUNT,
} from '../constants'

const initialState: LearningMemeStore = {
  convertedImage: false,
  currentIndex: -1,
  inputState: '',
  listen: false,
  question: '',
  ready: false,
  sentence: {
    hidden: '',
    visible: '',
  },
}

export function learningMemeStore(
  state: LearningMemeStore = initialState,
  action: Action,
): LearningMemeStore {

  switch (action.type) {
    case LEARNING_MEME_INIT_READY:
      return {
        ...state,
        currentIndex: -1,
        db: action.payload,
      }
    case LEARNING_MEME_READY:
      return {
        ...state,
        ready: true,
      }
    case LEARNING_MEME_STOP:
      return {
        ...state,
        listen: false,
      }
    case LEARNING_MEME_SET_INPUT:
      return {
        ...state,
        inputState: action.payload,
      }
    case LEARNING_MEME_NEXT_READY:
      return {
        ...state,
        inputState: '',
        listen: true,
        ready: true,
        ...action.payload,
      }
    case LEARNING_MEME_UNMOUNT:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
