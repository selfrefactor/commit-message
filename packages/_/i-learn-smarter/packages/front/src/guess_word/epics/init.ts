import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { GUESS_WORD_INIT, INIT_READY } from '../../constants'
import { initReady } from '../actions'

export function createDB(store: ObservableStore): any {
  const state = store.getState().store
  const { fromLanguage, toLanguage, db } = state

  const filterFn = (x => {
    const fromKey = `${fromLanguage.toLowerCase()}Related`
    const toKey = `${toLanguage.toLowerCase()}Part`

    const hasFrom = x[fromKey] !== undefined && x[fromKey].length > 0
    const hasTo = x[toKey] !== undefined && x[toKey].length > 0

    return hasFrom && hasTo
  })

  const newDB = db.filter(filterFn)

  return newDB
}

export const initEpic = (
  action$: ActionsObservable<GuessWordInitAction>,
  store: ObservableStore,
): Observable<Action> => {
  const init$ = action$.ofType(GUESS_WORD_INIT)
  const root$ = action$.ofType(INIT_READY)

  return Observable
    .combineLatest(init$, root$)
    .map(() => initReady(createDB(store)))
}
