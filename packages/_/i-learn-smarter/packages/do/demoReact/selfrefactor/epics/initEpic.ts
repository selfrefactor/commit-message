import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { SELFREFACTOR_INIT } from './../../constants'

export const initEpic = (
  action$: ActionsObservable<SelfrefactorInitAction>,
  store,
): Observable<Action> =>
  action$
    .ofType(SELFREFACTOR_INIT)
    .map( () => ({ type: 'REPLACE_ME' }) )