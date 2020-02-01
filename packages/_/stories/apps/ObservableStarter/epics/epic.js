import { delay, map } from 'rxjs/operators'
import { ofType } from 'redux-observable';

export const epic = action$ =>
action$.pipe( 
  ofType('INCREMENT_INIT'),
      delay(1000), // Asynchronously wait 1000ms then continue
      map(action => (
        {
          type    : 'INCREMENT',
          payload : action.payload,
        })
      ))
