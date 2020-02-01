import { getter } from 'client-helpers'
import { path } from 'rambdax'
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { kebabCase } from 'string-fn'
import { DB_URL, INIT } from './../../constants'
import { initReady } from './../actions'

function filterChildLock(database: any){
  const childLockFlag = getter('child')
  if (!childLockFlag) return database

  const newRows = database.rows.filter(
    path('doc.pcFlag'),
  )

  return {rows: newRows}
}

function rehydrate({rows}){
  const id = getter('id')
  if (!id) return {rows}

  const holder = {
    first: [],
    second: [],
  }
  let flag = 'first'
  rows.forEach(({doc}) => {
    if (!doc.altTag) return
    if (kebabCase(doc.altTag) === id) flag = 'second'

    holder[flag].push({doc})
  })
  const newRows = [
    ...holder.second,
    ...holder.first,
  ]

  return {rows: newRows}
}

// Intializing database
// a bit more complex as it holded user init process
// ============================================
export const initEpic = (
  action$: ActionsObservable<InitAction>,
  store: ObservableStore,
  { getJson },
): Observable<any> =>
  action$
    .ofType(INIT)
    .switchMap(() => new Observable(observer => {
      const stream$ = Observable.from(getJson(DB_URL))

      stream$.subscribe(received => {
        observer.next(
          initReady({
            received: rehydrate(filterChildLock(received)),
          }),
        )
        observer.complete()
      })
    }))
