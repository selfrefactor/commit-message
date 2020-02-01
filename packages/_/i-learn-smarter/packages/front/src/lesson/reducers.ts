import { getNextIndex } from '../_helpers/getNextIndex'
import {
  LESSON_INIT_READY,
  LESSON_NEXT,
  LESSON_QUESTION_READY,
  LESSON_SELECT,
} from '../constants'

const initialState = {
  currentIndex: 0,
  currentStep: {},
  isExample: false,
  ready: false,
  showQuestion: false,
  steps: [],
}

export function lessonStore(
  state: LessonStore = initialState,
  action: Action,
): LessonStore {

  const holder = {
    index: 0,
  }
  switch (action.type) {
    // STORE_SWITCH
    case LESSON_SELECT:

      return {
        ...state,
        question: action.payload,
      }
    case LESSON_QUESTION_READY:

      return {
        ...state,
        showQuestion: true,
        question: action.payload,
      }
    case LESSON_NEXT:
      holder.index = getNextIndex({
        length: state.steps.length,
        index: state.currentIndex,
      })

      return {
        ...state,
        showQuestion: false,
        currentIndex: holder.index,
        currentStep: state.steps[holder.index],
      }
    case LESSON_INIT_READY:
      return {
        ...state,
        ready: true,
        currentStep: action.payload[0],
        steps: action.payload,
      }
    default:
      return state
  }
}
