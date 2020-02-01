import {
  HIDDEN,
  IN,
  NOTIFY_ERROR,
  NOTIFY_INFO,
  NOTIFY_SUCCESS,
  NOTIFY_WARNING,
  NOTIFY_LOADING,
  OUT,
  STOP,
  LOADING_START,
} from './constants'

import { delay, init } from 'rambdax'
import { Observable } from 'rxjs/Observable'
import { getAnimationTime } from './_styled/notify'

const allTypes = [
  NOTIFY_SUCCESS,
  NOTIFY_ERROR,
  NOTIFY_INFO,
  NOTIFY_WARNING,
  NOTIFY_LOADING
]

export const notifyEpic = (
  action$,
  store,
) =>
  action$
    .ofType(...allTypes)
    .filter(() => store.getState().notifyStore.status === HIDDEN)
    .switchMap(action =>
      new Observable(observer => {
        const isLoading = action.type === NOTIFY_LOADING
        const actionToEmit = isLoading ?
          LOADING_START :
          IN

        observer.next({ type: actionToEmit })

        // tslint:disable
        delay(store.getState().notifyStore.ms)
          .then(() => {

            /**
             * If it is loading, then we need to 
             * send stop and be done with it
             */
            if (isLoading) {
              observer.next({ type: STOP })
              return observer.complete()
            }

            /**
             * Otherwise we need to wait for the closing animation to end
             * which is started by sending OUT
             */

            observer.next({ type: OUT })

            const animationTime = getAnimationTime(store.getState().notifyStore)
            const ms: number = Number(init(animationTime)) * 1000

            delay(ms).then(() => {
              observer.next({ type: STOP })
              observer.complete()
            })

          })
        // tslint:enable
      })
    )
