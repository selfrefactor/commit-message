import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { LEARNING_MEME_LISTEN } from '../../constants'
import { check, next, setInput } from '../actions'

export const listenEpic = (
  action$: ActionsObservable<LearningMemeListenAction>,
  store: ObservableStore,
): Observable<any> =>

  action$.ofType(LEARNING_MEME_LISTEN)
    .switchMap(action => {

      return new Observable(observer => {

        const {
          listen,
          inputState,
        } = store.getState().learningMemeStore

        if (action.payload === 'ENTER' && listen) {

          observer.next(check(inputState.trim()))
        } else if (listen) {

          observer.next(setInput(action.payload))
        } else {

          observer.next(next())
        }

        observer.complete()
      })
    })
