import {
  FETCH,
  ANIMATION,
  DELAY_ANIMATION,
  URL,
  GUEST_URL,
  IN,
} from '../../constants'
import axios from 'axios'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { delay } from 'rambdax'
import { fetchReady, out, on } from '../actions'

export const fetchEpic = (
  action$: ActionsObservable<FetchAction>,
  store: ObservableStore,
): Observable<Action> =>
  action$
    .ofType(FETCH)
    .switchMap(() => new Observable(observer => {
      const password = store.getState().store.password
      const url = password === '' ?
        GUEST_URL :
        URL

      const post = axios.post(
        url,
        { token: password}
      )
      observer.next(out())

      Promise.all([
        delay(ANIMATION + DELAY_ANIMATION + 50),
        post
      ])
        .then(([, response]) => {
          /**
           * Update words and start IN animation
           */
          observer.next(fetchReady(response.data))
          
          delay(100).then(() => {
            observer.next({type: IN})
            delay(1000).then(() => {
              observer.next(on())
              observer.complete()
            })
          })
          
        })
        .catch(console.log)
      
    }))