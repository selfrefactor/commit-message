import { range } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import {
  INFO,
  LANGUAGE_CHANGE_INIT,
  NAVIGATION_TOGGLE,
  SETTINGS_RANDOM,
  SETTINGS_TEXT_TO_SPEECH,
} from '../../constants'
import { notifyError } from '../actions';

function getActionFromID(id: string, name: string): false | Action {
  switch (id) {
    case 'icon_changelanguage':
      return { type: LANGUAGE_CHANGE_INIT }
    case 'toggle-navigation':
      return { type: NAVIGATION_TOGGLE }
    case 'icon_info':
      return { type: INFO, payload: name }
    case 'icon_next':
      return { type: `${name}@NEXT` }
    case 'icon_submit':
      return { type: `${name}@CHECK` }
    case 'icon_random':
      return { type: SETTINGS_RANDOM }
    case 'icon_texttospeech':
      return { type: SETTINGS_TEXT_TO_SPEECH }
    default:
      return false
  }
}

const MIN = 2

function getID(click: any) {
  let willReturn = ''
  for (const i of range(0, MIN + 1)) {
    if (click.path[i].id) {
      willReturn = click.path[i].id
    }
  }

  return willReturn
}

/**
 * It listens for any click events.
 * If there is event handler, action is emitted.
 */
export const clickEpic = (
  action$: ActionsObservable<InitAction>,
  store: ObservableStore,
): Observable<any> =>

  Observable
    .fromEvent(document, 'click')
    .switchMap((click: any) =>

      new Observable(observer => {
        const isCanvas = click.srcElement.nodeName === 'CANVAS'
        try {
          const ok = click.path.length >= MIN || isCanvas
  
          const id = ok ?
            getID(click) :
            ''
  
          const { name } = store.getState().store
          const actionToEmit = getActionFromID(id, name)
  
          if (actionToEmit === false) return observer.complete()
  
          observer.next(actionToEmit)
          observer.complete()
        } catch (e) {
          observer.next(notifyError({
            message: 'Navigation works only on Chrome!',
            ms: 5000,
          }))
          observer.complete()
        }
      }),
  )
