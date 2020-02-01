import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { distance, distanceGerman } from 'string-fn'
import { getCommons } from '../../_helpers/selectors'
import { GUESS_WORD_CHECK, SHARED_SPEAK } from '../../constants'
import { sharedAddPoints } from '../../root/actions'
import { next, stop } from '../actions'

export const checkEpic = (
  action$: ActionsObservable<GuessWordCheckAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(GUESS_WORD_CHECK)
    .switchMap(action => new Observable(observer => {
      const {
        textToSpeechFlag,
        fromLanguage,
      } = getCommons(store)

      const {
        wordAnswer,
        listen,
        inputState,
      } = store.getState().guessWordStore

      if (!listen) {
        /**
         * check is emitted from hitting Enter_
         * so in this case it acts as next request
         */
        observer.next(next())

        return observer.complete()
      }

      const distanceMethod = fromLanguage === 'DE' ?
        distanceGerman :
        distance

      const distanceResult = distanceMethod(
        inputState.toLowerCase().trim(),
        wordAnswer.toLowerCase(),
      )

      if (distanceResult <= 2) {
        observer.next(sharedAddPoints(1))
      }

      observer.next(stop())

      if (textToSpeechFlag) {
        observer.next({ type: SHARED_SPEAK, payload: 'fromPart' })
      }

      observer.complete()
    }))
