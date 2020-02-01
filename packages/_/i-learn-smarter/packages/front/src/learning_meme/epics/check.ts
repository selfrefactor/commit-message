import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { distance, distanceGerman } from 'string-fn'
import { getCommons } from '../../_helpers/selectors'
import { LEARNING_MEME_CHECK, SHARED_SPEAK } from '../../constants'
import { sharedAddPoints } from '../../root/actions'
import { stop } from '../actions'

function takeInputAnt(maybeInputValue){
  if (maybeInputValue.trim().length > 0) return maybeInputValue.trim()

  const input = document.getElementsByTagName('input')
  return input[0].value.trim()
}  

export const checkEpic = (
  action$: ActionsObservable<LearningMemeCheckAction>,
  store: ObservableStore,
): Observable<any> =>

  action$.ofType(LEARNING_MEME_CHECK)
    .switchMap(action => new Observable(observer => {
      const {
        textToSpeechFlag,
        fromLanguage,
      } = getCommons(store)

      const {
        currentInstance,
        inputState,
      } = store.getState().learningMemeStore

      const input = takeInputAnt(inputState)
      const distanceMethod = fromLanguage === 'DE' ?
        distanceGerman :
        distance

      const distanceResult = distanceMethod(
        input,
        currentInstance.fromWord,
      )

      const okDistance = distanceResult <= 1
      if (okDistance) observer.next(sharedAddPoints(1))

      observer.next(stop())

      if (textToSpeechFlag) {
        observer.next({ type: SHARED_SPEAK, payload: 'fromPart' })
      }

      observer.complete()
    }),
  )
