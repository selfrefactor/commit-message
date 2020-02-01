import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { SELECT_ARTICLE_INIT_READY } from '../../constants'
import { next } from '../actions'

export const initReadyEpic = (
  action$: ActionsObservable<SelectArticleInitReadyAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(SELECT_ARTICLE_INIT_READY)
    .filter(() => store.getState().store.fromLanguage === 'DE')
    .map(next)
