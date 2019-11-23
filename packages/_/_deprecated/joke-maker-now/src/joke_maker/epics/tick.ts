import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { INIT } from '../../constants'
import { fetch } from '../actions'
import { income } from '../../_helpers/income'

const {interval} = income({defaultValue: {interval: 10}})

export const tickEpic = (
  action$: ActionsObservable<InitAction>,
  store: ObservableStore,
): Observable<Action> => {

  const init$ = action$.ofType(INIT)
  const tick$ = Observable.interval(interval * 1000)

  return Observable
    .merge(init$, tick$)
    .map(() => fetch())
}
  