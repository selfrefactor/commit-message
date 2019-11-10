import { getTextReady } from './../actions';
import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { MAIN_UPLOAD_READY } from '../../constants'

const url = `https://ilearnsmarter.com/legacy/uppy`
// const url = `http://localhost:3010/uppy`

export const uploadReadyEpic = (
  action$: ActionsObservable<MainUploadReadyAction>,
  store,
  {postRequest}
): Observable<Action> =>
  action$
    .ofType(MAIN_UPLOAD_READY)
    .filter(action => action.payload.successful.length > 0)
    .switchMap(action => postRequest(
      url,
      {files: action.payload.successful}
    ).map(getTextReady))
