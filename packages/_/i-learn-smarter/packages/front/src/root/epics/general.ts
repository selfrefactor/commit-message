import {
  CHOOSE_WORD_INIT,
  GUESS_WORD_INIT,
  LANGUAGE_CHANGE_CLICK,
  LEARNING_MEME_INIT,
  ROUTER_CHANGE,
  SHARED_INIT,
  WRITE_SENTENCE_INIT,
} from '../../constants'

import { replace } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { camelCase } from 'string-fn'
import { LESSON_INIT, SELECT_ARTICLE_INIT } from '../../constants'

const removeInit = replace('@INIT', '')

function getAction(action: Action, store: ObservableStore): Action {
  switch (action.type) {
    case LANGUAGE_CHANGE_CLICK:
      window.location.reload(false)
    case ROUTER_CHANGE:
      return { type: `${camelCase(store.getState().store.name)}@UNMOUNT` }
    /**
     * Default catches all init-like actions
     */
    default:
      return { type: SHARED_INIT, payload: removeInit(action.type) }
  }
}

const allTypes: GeneralTypes[] = [
  LANGUAGE_CHANGE_CLICK,
  ROUTER_CHANGE,
  LEARNING_MEME_INIT,
  LESSON_INIT,
  WRITE_SENTENCE_INIT,
  SELECT_ARTICLE_INIT,
  GUESS_WORD_INIT,
  CHOOSE_WORD_INIT,
]

/**
 * The goal is to reduce the number of epics
 * which only task is to wait for an action and emit a response
 */
export const generalEpic = (
  action$: ActionsObservable<GeneralAction>,
  store: ObservableStore,
) =>
  action$
    .ofType(...allTypes)
    .map(action => getAction(action, store))
