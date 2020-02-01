import {
  LONG_DELAY,
  SETTINGS_RANDOM,
  SETTINGS_TEXT_TO_SPEECH,
} from '../../constants'

import { ActionsObservable } from 'redux-observable'
import { Observable } from 'rxjs/Observable'
import { camelCase } from 'string-fn'
import { getCommons } from '../../_helpers/selectors'

export const sharedChangeSettingsEpic = (
  action$: ActionsObservable<SharedChangeSettingsAction>,
  store: ObservableStore,
): Observable<any> =>

  action$.ofType(SETTINGS_RANDOM, SETTINGS_TEXT_TO_SPEECH)
    .switchMap(action => {

      return new Observable(observer => {
        const { name } = getCommons(store)
        const resetAction = {
          type: `${camelCase(name)}@INIT`,
        }

        observer.next(resetAction)
        observer.complete()
      })
    })
    .debounceTime(LONG_DELAY)
