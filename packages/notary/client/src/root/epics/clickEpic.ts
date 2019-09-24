import { delay, range } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { THROTTLE_DELAY } from '../../constants'

function getActionsFromID(id: string): false | Action {
  switch (id) {
    case 'foo':
      return { type: 'foo' }
    default:
      return false
  }
}

const LEVELS_TO_SEARCH_ID = 2

function getID(click: any) {
  let willReturn = ''
  for (const i of range(0, LEVELS_TO_SEARCH_ID + 1)) {
    if (click.path[i].id) {
      willReturn = click.path[i].id
    }
  }

  return willReturn
}

/**
 * It listens for any click events. If there is event handler,
 * then actions to emit are generated.
 * If there is second action, it is emitted after SHORT_DELAY
 * It is done so any rendering that will happen to have time to complete.
 * @param {ActionsObservable<InitAction>} action$
 * @param {any} store
 * @returns {Observable<any>} It emits actions if the event is expected
 */
export const clickEpic = (
  action$: ActionsObservable<InitAction>,
  store: ObservableStore,
): Observable<any> => {
  const click$ = Observable.fromEvent(document, 'click')

  return click$.switchMap(click => {

    return new Observable(observer => {

      const id = (click as any).path.length >= LEVELS_TO_SEARCH_ID ?
        getID(click) :
        ''
        
      const action = getActionsFromID(id)

      if (action) {

        observer.next(action)
      }
      observer.complete()
    })
  })

}
