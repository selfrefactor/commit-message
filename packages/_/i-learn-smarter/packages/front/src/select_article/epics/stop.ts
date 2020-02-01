import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { SELECT_ARTICLE_STOP } from '../../constants'
import { sharedSpeak } from '../../root/actions'

function getter(store: ObservableStore){
  const {textToSpeechFlag} = store.getState().store

  return {textToSpeechFlag}
}

/**
 * STOP is emitted when last clickable select is clicked
 * or when the user clicks Carrier's SEND icon
 */
export const stopEpic = (
  action$: ActionsObservable<SelectArticleStopAction>,
  store: ObservableStore,
): Observable<Action> =>

action$
  .ofType(SELECT_ARTICLE_STOP)
  .switchMap(() =>
    new Observable(observer => {
      const {textToSpeechFlag} = getter(store)

      if (textToSpeechFlag){
        observer.next(sharedSpeak('fromPart'))
      }
      observer.complete()
    }),
  )
