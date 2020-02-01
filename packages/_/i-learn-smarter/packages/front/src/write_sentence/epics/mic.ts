import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { distanceGerman } from 'string-fn'
import { WRITE_SENTENCE_MIC } from '../../constants'

import { delay, path, switcher, init } from 'rambdax'
import { getter } from 'client-helpers'
import { sharedAddPoints } from '../../root/actions'
import { micReady, notifySpoken, notifyAnswer, next } from '../actions'

const greaterThen = x => y => y > x

function stripCommas(input: string){
  return input.split(' ').map(
    x => x.endsWith(',') ? init(x) : x
  ).join(' ')
}

function calculatePointsAnt(spoken, sentenceRaw): number{
  const sentence = stripCommas(sentenceRaw)
  
  const distance = distanceGerman(
    spoken,
    sentence,
  )
  const rate = switcher<number>(sentence.length)
    .is(greaterThen(60), 1.4)
    .is(greaterThen(45), 1.3)
    .default(1.15)

  const better = Math.floor(distance / rate)

  return switcher<number>(better)
    .is(greaterThen(20), 0)
    .is(greaterThen(16), 1)
    .is(greaterThen(12), 2)
    .is(greaterThen(9), 3)
    .default(13 - better)
}

const listenFilter = store =>
  store.getState().writeSentenceStore.listen

export const micEpic = (
  action$: ActionsObservable<WriteSentenceMicAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(WRITE_SENTENCE_MIC)
    .switchMap(action =>
      new Observable(observer => {
        const ok = listenFilter(store)
        if(!ok){
          observer.next(next())
          observer.complete()
        }

        const spoken = action.payload
        const sentence = path<string>(
          'writeSentenceStore.currentInstance.fromPart',
          store.getState(),
        )
        const points = calculatePointsAnt(
          spoken,
          sentence,
        )
        if (points > 0) {
          observer.next(sharedAddPoints(points))
        }

        observer.next(micReady())
        observer.next(notifySpoken(points,spoken))
        
        if(getter('visible')) return observer.complete()
        
        delay(4500).then(() => {
          observer.next(notifyAnswer(sentence))
          observer.complete()
        })
      }),
    )
