import { partialCurry } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getTranslation } from '../../_modules/getTranslation'
import { getPassword } from '../../_modules/selectors'

const getEnWord = state => state.singleInsertStore.enWord

const LIMIT = 3
export function* translateWordSaga() {
  while (true) {
    try {
      yield take('singleInsert@TRANSLATE_WORD')
      const enWord = yield select(getEnWord)
      if (enWord.length < LIMIT) {

        return
      }
      const password = yield select(getPassword)
      const getTranslationFn = partialCurry<Promise<string>>(
        getTranslation,
        { text: enWord, password },
      )

      const [deWord, bgWord] = yield Promise.all([
        getTranslationFn({ language: 'de' }),
        getTranslationFn({ language: 'bg' }),
      ])

      const payload = { deWord, bgWord }
      yield put({ type: 'singleInsert@TRANSLATE_READY', payload })
    } catch (err) {
      console.log(err)
    }
  }
}
