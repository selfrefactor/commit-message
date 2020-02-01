import { merge, path } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getTranslation } from '../../_modules/getTranslation'
import { getDB, getPassword } from '../../_modules/selectors'
import { ADMIN_INSERT_CREATE } from './../../constants'

const getTranslated = path('adminInsertStore.translated')

export function* createDocumentSaga() {
  while (true) {
    try {
      const { payload: { doc, index } } = yield take(ADMIN_INSERT_CREATE)

      const db = yield select(getDB)
      const password = yield select(getPassword)
      const translated = yield select(getTranslated)
      const bgTranslation = yield getTranslation({
        language: 'bg',
        password: password,
        text: translated[index],
      })

      const docToSave = merge(doc, {
        bgPart: bgTranslation,
        bgWord: '',
        enPart: translated[index],
      })

      const createIs = yield db.post(docToSave)

      console.log(createIs.id, 'create')
      yield put({
        message: createIs.id,
        ms: 500,
        type: 'NOTIFY_SUCCESS',
      })
    } catch (err) {
      console.log(err)
    }
  }
}
