import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { INIT } from '../../constants'

export const initEpic = (
  action$: ActionsObservable<InitAction>,
  store
): Observable<Action> =>
  action$
    .ofType(INIT)
    .map(() => ({ type: 'navigation/epics/initEpic' }))
