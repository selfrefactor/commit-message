import {
  CHOOSE_WORD_INC_INDEX,
  CHOOSE_WORD_INC_POINTS,
  CHOOSE_WORD_INIT_READY,
  CHOOSE_WORD_NEXT_READY,
  CHOOSE_WORD_STOP,
  CHOOSE_WORD_UNMOUNT,
} from '../constants'

const initialState = {
  correctAnswer: [],
  currentIndex: -1,
  index: 0,
  listen: false,
  localPoints: 0,
  question: [[]],
  ready: false,
}

export function chooseWordStore(
  state: ChooseWordStore = initialState,
  action: Action,
): ChooseWordStore {

  switch (action.type) {
    case CHOOSE_WORD_INIT_READY:
      return {
        ...state,
        db: action.payload.db,
        fillerWords: action.payload.fillerWords,
      }
    case CHOOSE_WORD_NEXT_READY:
      return {
        ...state,
        ...action.payload,
        index: 0,
        listen: true,
        localPoints: 0,
        ready: true,
      }
    // go to the next word of the question
    case CHOOSE_WORD_INC_INDEX:
      return {
        ...state,
        index: state.index + 1,
      }
    case CHOOSE_WORD_INC_POINTS:
      return {
        ...state,
        localPoints: state.localPoints + 1,
      }
    // end of question is reached
    case CHOOSE_WORD_STOP:
      return {
        ...state,
        index: state.index + 1,
        listen: false,
        question: [[]],
      }
    /**
     * Clean-up the state
     */
    case CHOOSE_WORD_UNMOUNT:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
