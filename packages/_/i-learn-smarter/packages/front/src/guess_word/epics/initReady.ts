import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { GUESS_WORD_INIT_READY, GUESS_WORD_NEXT } from '../../constants'

/**
 * Only task is to emit next when init is ready
 */
export const initReadyEpic = (
  action$: ActionsObservable<GuessWordInitReadyAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(GUESS_WORD_INIT_READY)
    .map(() => ({ type: GUESS_WORD_NEXT }))
