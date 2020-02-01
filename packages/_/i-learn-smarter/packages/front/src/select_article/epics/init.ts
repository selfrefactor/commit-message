import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import { INIT_READY, SELECT_ARTICLE_INIT } from '../../constants'
import { initReady } from '../actions'
import { filterAnt } from '../ants/filter'
import { getCommons } from '../../_helpers/selectors';

function createDB(store: ObservableStore): any {
  const { db } = store.getState().store
  const filtered = filterAnt(db)

  return {db: filtered}
}

export const initEpic = (
  action$: ActionsObservable<SelectArticleInitAction>,
  store: ObservableStore,
): Observable<Action> => {
    const db$ = action$.ofType(INIT_READY)
    const init$ = action$.ofType(SELECT_ARTICLE_INIT)

    return Observable
      .combineLatest(db$, init$)
      .filter(() => getCommons(store).fromLanguage === 'DE')
      .map(() => initReady(createDB(store)))
}
