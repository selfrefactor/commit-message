import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { getCommons } from '../../_helpers/selectors'
import { CHOOSE_WORD_STEP } from '../../constants'
import { sharedAddPoints, sharedSpeak } from '../../root/actions'
import { incIndex, stop } from '../actions'

/**
 * It increments the local counter so
 * we can proceed to the next set of choices.
 */
export const stepEpic = (
  action$: ActionsObservable<ChooseWordStepAction>,
  store: ObservableStore,
): Observable<any> =>

  action$
    .ofType(CHOOSE_WORD_STEP)
    .switchMap(action =>
      new Observable(observer => {
        const {
          index,
          correctAnswer,
          localPoints,
        } = store.getState().chooseWordStore

        const isLastAnswer = index + 1 === correctAnswer.length
        const isCorrectEnough = correctAnswer.length - localPoints <= 2

        if (isLastAnswer) {
          const { textToSpeechFlag } = getCommons(store)

          if (isCorrectEnough) {
            observer.next(sharedAddPoints(1))
          }

          if (textToSpeechFlag) {
            observer.next(sharedSpeak('fromPart'))
          }

          observer.next(stop())

        } else {
          observer.next(incIndex())
        }

        observer.complete()
      }),
  )
