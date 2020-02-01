import { delay } from 'rambdax'
import { filter, map, tap } from 'rxjs/operators'
import { appendPortal } from '../internals/appendPortal'

export function isLastFn(store){
  return store.value.reducer.data.length === store.value.reducer.currentIndex + 1
}

export const nextEpic = (action$, store) =>
  action$.ofType('NEXT_FROM_USER')
    .pipe(
      map(() => (
        {
          type    : 'NEXT',
          payload : { recentlyClicked : true },
        })
      ),
    )

export const nextIntervalEpic = (action$, store) =>
  action$.ofType('NEXT_FROM_INTERVAL')
    .pipe(
      map(() => (
        { type : store.value.reducer.recentlyClicked ? 'SET_FROM_INTERVAL' : 'NEXT' })
      ),
      tap(console.info),
    )

async function work(store){
  await delay(500)
  const currentInstance = store.data[ store.currentIndex ]
  console.log('work', currentInstance)

  appendPortal(currentInstance)
}

export const nextReactionEpic = (action$, store) =>
  action$.ofType('NEXT')
    .pipe(
      tap(() => work(store.value.reducer)),
      map(() => (
        { type : 'ignore' })
      ),
    )

export const initReactionEpic = (action$, store) =>
  action$.ofType('INIT_READY')
    .pipe(
      tap(() => work(store.value.reducer)),
      map(() => (
        { type : 'ignore' })
      ),
    )

