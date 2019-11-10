import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { FOO_INIT } from './../../constants'

export const initEpic = (
  action$: ActionsObservable<FooInitAction>,
  store,
): Observable<Action> =>
  action$
    .ofType(FOO_INIT)
    .map( () => ({ type: 'REPLACE_ME' }) )