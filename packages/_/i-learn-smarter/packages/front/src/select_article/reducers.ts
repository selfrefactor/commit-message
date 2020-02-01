import {
  SELECT_ARTICLE_CLICK_READY,
  SELECT_ARTICLE_INIT_READY,
  SELECT_ARTICLE_NEXT_READY,
  SELECT_ARTICLE_STOP,
  SELECT_ARTICLE_UNMOUNT,
} from '../constants'

const initialState = {
  currentIndex: -1,
  currentInstance: {
    fromPart: '',
    imageSrc: '',
    toPart: '',
    wordList: [],
  },
  db: [],
  listen: false,
  ready: false,
}

export function selectArticleStore(
  state: SelectArticleStore = initialState,
  action: Action,
): SelectArticleStore {

  switch (action.type) {
    case SELECT_ARTICLE_INIT_READY:
      return {
        ...state,
        currentIndex: -1,
        ...action.payload,
      }
    case SELECT_ARTICLE_NEXT_READY:
      return {
        ...state,
        ready: true,
        listen: true,
        ...action.payload,
      }
    case SELECT_ARTICLE_STOP:
      return {
        ...state,
        listen: false,
      }
    case SELECT_ARTICLE_CLICK_READY:
      return {
        ...state,
        currentInstance: {
          ...state.currentInstance,
          wordList: action.payload,
        },
      }
    case SELECT_ARTICLE_UNMOUNT:
      return {
        ...state,
        ...initialState,
      }
    default:
      return state
  }
}
