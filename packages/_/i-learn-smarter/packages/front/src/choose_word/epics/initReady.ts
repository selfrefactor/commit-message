import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { CHOOSE_WORD_INIT_READY, CHOOSE_WORD_NEXT } from '../../constants'

/**
 * Only task is to emit next when init is ready
 */
export const initReadyEpic = (
  action$: ActionsObservable<ChooseWordInitReadyAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(CHOOSE_WORD_INIT_READY)
    .map(() => ({ type: CHOOSE_WORD_NEXT }))
