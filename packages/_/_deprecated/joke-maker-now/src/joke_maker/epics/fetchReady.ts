import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { FETCH_READY, ANIMATION } from '../../constants'
import { ignore } from '../actions'
import { inAnimation } from '../animations/in';

export const fetchReadyEpic = (
  action$: ActionsObservable<FetchReadyAction>,
  store: ObservableStore,
): Observable<Action> =>
  
  action$
    .ofType(FETCH_READY)
    .map(ignore)
