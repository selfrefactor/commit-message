import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { GUESS_WORD_INPUT } from '../../constants'
import { inputChange } from '../actions'

function isListen(store: ObservableStore) {

  return store.getState().guessWordStore.listen
}

export const inputEpic = (
  action$: ActionsObservable<GuessWordInputAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(GUESS_WORD_INPUT)
    .filter(() => isListen(store))
    .map(action => inputChange(action.payload))
