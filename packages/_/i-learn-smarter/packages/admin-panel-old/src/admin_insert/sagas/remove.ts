import { put, select, take } from 'redux-saga/effects'
import { getDBDraft } from '../../_modules/selectors'
import { ADMIN_INSERT_LOAD, ADMIN_INSERT_REMOVE } from '../../constants'

const getIDCollection = state => state.adminInsertStore.idCollection

export function* removeSaga() {
  while (true) {
      yield take(ADMIN_INSERT_REMOVE)

      const idCollection = yield select(getIDCollection)
      const dbDraft = yield select(getDBDraft)

      for (const doc of idCollection) {
        const removeIs = yield dbDraft.remove(doc._id, doc._rev)
        console.log(removeIs, 'remove')
      }
      yield put({
        message: 'ok',
        ms: 700,
        type: 'NOTIFY_INFO',
      })
      yield put({ type: ADMIN_INSERT_LOAD })
  }
}
