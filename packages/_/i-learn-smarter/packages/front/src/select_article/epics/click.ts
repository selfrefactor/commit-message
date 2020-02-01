import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'

import { SELECT_ARTICLE_CLICK } from '../../constants'
import { sharedAddPoints } from '../../root/actions'
import { clickReady, stop } from '../actions'

export const clickEpic = (
  action$: ActionsObservable<SelectArticleClickAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$.ofType(SELECT_ARTICLE_CLICK)
  .filter((action: any) => !action.payload.article.solved)
  .switchMap((action: any) =>

    /**
     * Keep the long form because of textToSpeech
     */
    new Observable(observer => {
      const { wordList } = store.getState().selectArticleStore.currentInstance
      const { word, article } = action.payload
      const isCorrect = word === article.correct

      if (isCorrect){
        observer.next(sharedAddPoints(1))
      }

      const newWordList = wordList.map(_ => {

        const ok = typeof _ === 'object' && _.index !== article.index

        if (typeof _ === 'string' || ok){

          return _
        }

        const newArticleSet = _.articleSet.map(x => {
          const status = x.value === article.correct ?
            'CORRECT' :
            x.value === word ?
              'WRONG' :
              'INACTIVE'

          return {
            ...x,
            status,
          }
        })

        return {
          ..._,
          solved: true,
          articleSet: newArticleSet,
        }
      })

      observer.next(clickReady(newWordList))

      if (isLastSelectable(newWordList)){

        observer.next(stop())
      }

      observer.complete()
    }),
  )

function isLastSelectable(newArticleSet: any): boolean{

    return newArticleSet.filter(
      _ => typeof _ === 'object' && !_.solved,
    ).length === 0
  }
