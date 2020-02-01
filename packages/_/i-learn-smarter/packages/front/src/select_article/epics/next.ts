import { map } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { wordsX } from 'string-fn'

import { getNextIndex } from '../../_helpers/getNextIndex'
import { sharedNextReadyBee } from '../../bees/sharedNextReady'
import { SELECT_ARTICLE_NEXT } from '../../constants'
import { sharedSpeak } from '../../root/actions'
import { nextReady } from '../actions'
import { allArticles, whichArticleSet } from '../ants/filter'

export const nextEpic = (
  action$: ActionsObservable<SelectArticleNextAction>,
  store: ObservableStore,
): Observable<Action> =>

  action$.ofType(SELECT_ARTICLE_NEXT)
  .switchMap(() =>
    new Observable(observer => {
      const {db, oldCurrentIndex, toLanguage, textToSpeechFlag} = getter(store)

      const currentIndex = getNextIndex({
        index: oldCurrentIndex,
        length: db.length,
      })

      const instance = db[currentIndex]
      sharedNextReadyBee(instance)

      const toPart = instance[`${toLanguage}Part`]
      const fromPart = instance.dePart
      const imageSrc = instance.imageSrc

      const words = wordsX(instance.dePart)
      let counter = 0

      const wordList = words.map(word => {
        if (!allArticles.includes(word.toLowerCase())){

          return word
        }
        const currentArticleSet = whichArticleSet(word.toLowerCase())

        const articleSet = map(
          _ => ({
            status: 'ACTIVE',
            value: _,
          }),
          currentArticleSet,
        )

        return  {
          solved: false,
          correct: word.toLowerCase(),
          articleSet,
          index: counter++,
        }
      })

      const currentInstance = {
        wordList,
        fromPart,
        toPart,
        imageSrc,
      }

      observer.next(nextReady({
        currentInstance,
        currentIndex,
      }))

      if (textToSpeechFlag && toLanguage === 'en') {
        observer.next(sharedSpeak('toPart'))
      }

      observer.complete()
    }),
  )

function getter(store: ObservableStore){
  const {
    currentIndex,
    db,
  } = store.getState().selectArticleStore
  const {
    toLanguage,
    textToSpeechFlag,
  } = store.getState().store

  return {
    db,
    oldCurrentIndex: currentIndex,
    toLanguage: toLanguage.toLowerCase(),
    textToSpeechFlag,
  }
}
