import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { INIT } from '../../constants'
import { fetch } from '../actions'

export const initEpic = (
  action$: ActionsObservable<InitAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(INIT)
    .map(fetch)
    