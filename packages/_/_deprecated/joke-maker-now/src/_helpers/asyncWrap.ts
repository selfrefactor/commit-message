import { Observable } from 'rxjs/Observable'

export function asyncWrap<T, U>(fn: (input: T, secondInput?: T) => Promise<U>) {
  return (x: T) => Observable.fromPromise(fn(x))
}
