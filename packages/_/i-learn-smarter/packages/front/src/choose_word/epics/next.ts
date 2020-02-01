import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { wordsX } from 'string-fn'

import { getNextIndex } from '../../_helpers/getNextIndex'
import { getCommons } from '../../_helpers/selectors'
import { sharedNextReadyBee } from '../../bees/sharedNextReady'
import { CHOOSE_WORD_NEXT } from '../../constants'
import { sharedSpeak } from '../../root/actions'
import { nextReady } from '../actions'
import { getFillersBee } from '../bees/getFillers';

/**
 * Generation of the next current instance
 */
export const nextEpic = (
  action$: ActionsObservable<ChooseWordNextAction>,
  store: ObservableStore,
): Observable<Action> =>

  action$
    .ofType(CHOOSE_WORD_NEXT)
    .switchMap(action =>
      new Observable(observer => {
        const {
          currentIndex,
          db,
          fillerWords,
        } = store.getState().chooseWordStore
        const { textToSpeechFlag } = getCommons(store)

        const newCurrentIndex = getNextIndex({
          index: currentIndex,
          length: db.length,
        })

        const currentInstance = db[newCurrentIndex]
        sharedNextReadyBee(currentInstance)

        const correctAnswer = wordsX(currentInstance.fromPart)

        const question = correctAnswer.map(singleWord =>
          getFillersBee({
            fillers: fillerWords,
            word: singleWord,
          }),
        )

        const payload = {
          correctAnswer,
          currentIndex: newCurrentIndex,
          currentInstance,
          question,
        }
        observer.next(nextReady(payload))

        if (textToSpeechFlag) {
          observer.next(sharedSpeak('toPart'))
        }

        observer.complete()
      }),
  )
