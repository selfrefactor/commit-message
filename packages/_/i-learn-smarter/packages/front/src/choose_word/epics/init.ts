import {
  CHOOSE_WORD_INIT,
  INIT_READY,
} from '../../constants'

import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getCommons } from '../../_helpers/selectors'
import { initReady } from '../actions'
import { getDatabaseBee } from '../../bees/getDatabase';
import { generateFillerWordsBee } from '../bees/generateFillerWords';

function createDB(store: ObservableStore): any {
  const { fromLanguage, toLanguage } = getCommons(store)
  const { db } = store.getState().store
  const dbValue = getDatabaseBee({ db, fromLanguage, toLanguage })
  const fillerWords = generateFillerWordsBee(dbValue)

  return {
    db: dbValue,
    fillerWords: fillerWords,
  }
}

// It is called after the database is set
// and the component is mounted
///////////////////////////
export const initEpic = (
  action$: ActionsObservable<ChooseWordInitAction>,
  store: ObservableStore,
): Observable<any> => {
  const db$ = action$.ofType(INIT_READY)
  const init$ = action$.ofType(CHOOSE_WORD_INIT)

  return Observable
    .combineLatest(db$, init$)
    .map(() => initReady(createDB(store)))
}
