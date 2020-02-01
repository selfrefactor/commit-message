import {
  INIT_READY,
  LEARNING_MEME_INIT,
} from '../../constants'

import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { initReady } from '../actions'
import { createDatabaseBee } from '../../bees/createDatabase';

export const initEpic = (
  action$: ActionsObservable<LearningMemeInitAction>,
  store,
): Observable<any> => {
  const db$ = action$.ofType(INIT_READY)
  const init$ = action$.ofType(LEARNING_MEME_INIT)

  return Observable
    .combineLatest(db$, init$)
    .map(() => initReady(createDatabaseBee(store)))
}
