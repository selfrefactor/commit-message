import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { WRITE_SENTENCE_INIT_READY, WRITE_SENTENCE_NEXT } from '../../constants'

/**
 * Only task is to emit next when init is ready
 */
export const initReadyEpic = (
  action$: ActionsObservable<WriteSentenceInitReadyAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(WRITE_SENTENCE_INIT_READY)
    .map(() => ({ type: WRITE_SENTENCE_NEXT }))
