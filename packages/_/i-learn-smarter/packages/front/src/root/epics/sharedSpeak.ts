import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { camelCase } from 'string-fn'
import { getCommons } from '../../_helpers/selectors'
import { speakBee } from '../../bees/speak'
import { SHARED_SPEAK } from '../../constants'

let busy = false

export const sharedSpeakEpic = (
  action$: ActionsObservable<SharedSpeakAction>,
  store: ObservableStore,
): Observable<any> =>

  action$.ofType(SHARED_SPEAK)
    .filter(() => !busy)
    .switchMap(action =>
      new Observable(observer => {
        busy = true

        const { fromLanguage, toLanguage } = getCommons(store)
        const { name } = store.getState().store

        const nameAsProperty = `${camelCase(name)}Store`
        const currentInstance = (store.getState())[nameAsProperty].currentInstance
        const textToSpeak = currentInstance[action.payload]

        const languageToSpeak = action.payload === 'fromPart' ?
          fromLanguage :
          toLanguage

        const speakInput = {
          language: languageToSpeak,
          text: textToSpeak,
        }
        speakBee(speakInput)
          .then(() => {
            busy = false
            observer.complete()
          })
      }),
    )
