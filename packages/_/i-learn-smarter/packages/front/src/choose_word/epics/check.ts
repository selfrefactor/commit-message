import { Observable } from 'rxjs/Observable'

import { ActionsObservable } from 'redux-observable'
import { CHOOSE_WORD_CHECK } from '../../constants'
import { incPoints, step } from '../actions'

/**
 * It returns the index of the selected word.
 */
const getIndexFromAction = (action: Action): number => {
  return action.payload === 'UP' ?
    0 :
    action.payload === 'DOWN' ?
      2 :
      1
}

/**
 * It is called upon each user selection.
 * It checks if the selection is correct or wrong.
 */
export const checkEpic = (
  action$: ActionsObservable<ChooseWordCheckAction>,
  store: ObservableStore,
): Observable<any> =>
  action$.ofType(CHOOSE_WORD_CHECK)
    .switchMap(action => {
      return new Observable(observer => {
        const answerIndex = getIndexFromAction(action)

        const {
          correctAnswer,
          index,
          question,
        } = store.getState().chooseWordStore

        const correct = correctAnswer[index]
        const answer = question[index][answerIndex]

        if (correct === answer) {
          observer.next(incPoints())
        }

        observer.next(step())
        observer.complete()
      })
    })
