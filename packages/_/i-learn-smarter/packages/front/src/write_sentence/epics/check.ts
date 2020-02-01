import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { distance, distanceGerman } from 'string-fn'
import { WRITE_SENTENCE_CHECK } from '../../constants'
import { sharedAddPoints } from '../../root/actions'
import { setOkCorrect, step } from '../actions'
import { getCommons } from '../../_helpers/selectors';

/**
 * Perform database filtering(in neccessary) before emitting `ready` and `next` actions
 */
export const checkEpic = (
  action$: ActionsObservable<WriteSentenceCheckAction>,
  store: ObservableStore,
): Observable<any> =>

  action$.ofType(WRITE_SENTENCE_CHECK)
    .switchMap(() => {

      return new Observable(observer => {
        const { fromLanguage } = getCommons(store)

        const {
          inputState,
          question,
          index,
        } = store.getState().writeSentenceStore
        const len = inputState.trim().length

        const distanceMethod = fromLanguage === 'DE' ?
          distanceGerman :
          distance

        const distanceValue = distanceMethod(
          inputState.trim(),
          question[index].hidden,
        )

        // shorter words shouldn't score points
        ///////////////////////////
        const okLength = len > 1
        const allowedDistance = len > 5 ? 1 : 0
        const okNext = okLength && distanceValue <= allowedDistance
        const correctFlag = question[index].hidden.length === 1 ?
          true :
          okNext

        if (okNext) { observer.next(sharedAddPoints(1)) }

        observer.next(setOkCorrect(correctFlag))
        observer.next(step())

        observer.complete()
      })
    })
