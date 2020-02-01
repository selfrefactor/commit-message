import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { LEARNING_MEME_INIT_READY, LEARNING_MEME_NEXT } from '../../constants'

// Only task is to emit next when init is ready
// ============================================
export const initReadyEpic = (
  action$: ActionsObservable<LearningMemeInitReadyAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(LEARNING_MEME_INIT_READY)
    .map(() => ({ type: LEARNING_MEME_NEXT }))
