import {
  NEXT_TICK,
  SHORT_DELAY,
  urlInputsDefault,
  WRITE_SENTENCE_NEXT,
  WRITE_SENTENCE_READY,
} from '../../constants'

import { getterAnt, getter } from 'client-helpers'
import { delay, allTrue } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { maskSentence, OutputMaskSentence } from 'string-fn'

import { getNextIndex } from '../../_helpers/getNextIndex'
import { sharedNextReadyBee } from '../../bees/sharedNextReady'
import { sharedSpeakTo } from '../../root/actions'
import { setNext } from '../actions'
import { getCommons } from '../../_helpers/selectors';
import { setConvertedImageBee } from '../../bees/setConvertedImage';
import { getConvertedImageBee } from '../../bees/getConvertedImage';

export const nextEpic = (
  action$: ActionsObservable<WriteSentenceNextAction>,
  store: ObservableStore,
): Observable<any> =>

  action$.ofType(WRITE_SENTENCE_NEXT)
    .concatMap(() => {
      return new Observable(observer => {

        const {
          currentIndex: currentIndexRaw,
          db,
          ready,
        } = store.getState().writeSentenceStore

        const {
          easier,
          easiest,
          easy,
          random,
          visible,
        } = getterAnt(urlInputsDefault)
        const {textToSpeechFlag} = getCommons(store)

        const canSpeak = textToSpeechFlag && !getter('auto')
        const currentIndex = getNextIndex({
          index: currentIndexRaw,
          length: db.length,
        })

        const currentInstance = db[currentIndex]
        sharedNextReadyBee(currentInstance)
        setConvertedImageBee(currentInstance)

        const maskSentenceResult: OutputMaskSentence = maskSentence({
          sentence: currentInstance.fromPart,
          easyMode: easy,
          easierMode: easier,
          randomMode: random,
          charLimit: easiest ? 1 : 4,
        })

        const question = maskSentenceResult.visible
          .map((visibleInstance, i) => ({
            hidden: maskSentenceResult.hidden[i],
            visible: visible? maskSentenceResult.hidden[i] : visibleInstance,
          }))

        const okCorrect = Array(question.length).fill(null)

        const payload = {
          currentIndex,
          currentInstance,
          okCorrect,
          question,
        }
        observer.next(setNext(payload))

        const MS = ready ?
          NEXT_TICK :
          SHORT_DELAY

        Promise.all([
          getConvertedImageBee(currentInstance),
          delay(MS),
        ])
          .then(([convertedImage]) => {
            const payload = {
              currentIndex,
              currentInstance,
              okCorrect,
              question,
              convertedImage,
            }
            observer.next(setNext(payload))

            observer.next({ type: WRITE_SENTENCE_READY })
            if (canSpeak) observer.next(sharedSpeakTo)

            observer.complete()
          })
      })
    })
