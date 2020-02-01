import { instanceDatabase } from '../_helpers/instanceDatabase'
import { getDatabaseBee } from './getDatabase'
import { getCommons } from '../_helpers/selectors'

export function createDatabaseBee(
  store: ObservableStore,
  initAction?: any,
): any {

  const { fromLanguage, toLanguage } = getCommons(store)
  const { db } = store.getState().store
  const dbFinal = getDatabaseBee({ db, fromLanguage, toLanguage })

  return instanceDatabase(dbFinal, initAction)
}
