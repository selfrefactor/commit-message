import {UPDATE_COUNTER, UPDATE_COMPLETE} from '../actions/counterActions'
import { delay, map } from 'rxjs/operators';

export const counterEpic = action$ =>
  action$.ofType(UPDATE_COUNTER)
    .pipe(
     delay(1000), // Asynchronously wait 1000ms then continue
     map((action) => (
      {
       type: UPDATE_COMPLETE,
       payload: action.payload
      })
    ))