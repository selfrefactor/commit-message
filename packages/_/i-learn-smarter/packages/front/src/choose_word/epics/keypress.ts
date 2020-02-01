import { replace } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { CHOOSE_WORD_NEXT_READY } from '../../constants'
import { check } from '../actions'
import { next } from '../actions'

/**
 * It listens to arrow keypress, only when `listen` prop is `true`.
 * Followed arrow keys are `up, down, right`
 */
export const keypressEpic = (
  action$: ActionsObservable<ChooseWordNextReadyAction>,
  store: ObservableStore,
): Observable<any> => {
  const keydownEvent = Observable.fromEvent(document, 'keydown')
  const listenEvent = action$.ofType(CHOOSE_WORD_NEXT_READY)

  const willObserve = keydownEvent.withLatestFrom(listenEvent)

  return willObserve.concatMap(([keydown, action]) => {

    return new Observable(observer => {
      const listen = store.getState().chooseWordStore.listen
      const keycode = (keydown as any).code

      if (!listen) {
        /**
         * When listen mode is off_
         * keypress action triggers next instance request
         */
        observer.next(next())
      }

      const condition = keycode.startsWith('Arrow') &&
        listen

      const event = condition ?
        replace('Arrow', '', keycode).toUpperCase() :
        false

      if (event !== false) {

        observer.next(check(event))
      }

      observer.complete()
    })
  })
}
