import {
  INIT_READY,
  WRITE_SENTENCE_INIT,
} from '../../constants'

import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { initReady } from '../actions'
import { createDatabaseBee } from '../../bees/createDatabase';

// Epic called from `componentDidMount`
// Performs database filtering(if neccessary)
// before emitting `ready` and `next` actions
// ============================================
export const initEpic = (
  action$: ActionsObservable<WriteSentenceInitAction>,
  store: ObservableStore,
): Observable<any> => {

  const init$ = action$.ofType(WRITE_SENTENCE_INIT)
  const db$ = action$.ofType(INIT_READY)

  return Observable
    .combineLatest(db$, init$)
    .map(([, initAction]) => 
      initReady(createDatabaseBee(store, initAction))
    )
}
