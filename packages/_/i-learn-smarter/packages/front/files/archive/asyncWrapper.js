import { Observable } from 'rxjs/Observable'

export function asyncWrapper(fn: any){
  return (...inputs) => Observable.fromPromise(
    fn(...inputs),
  )
}
