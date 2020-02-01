import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { CHOOSE_WORD_CLICK } from '../../constants'
import { check } from '../actions'

export const clickEpic = (
  action$: ActionsObservable<ChooseWordClickAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(CHOOSE_WORD_CLICK)
    .filter(() => store.getState().chooseWordStore.listen)
    .map(({ payload }) => (check(payload)))
