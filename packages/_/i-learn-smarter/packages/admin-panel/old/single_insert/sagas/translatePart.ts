import { partialCurry } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getTranslation } from '../../_modules/getTranslation'
import { getPassword } from '../../_modules/selectors'

const getEnPart = state => state.singleInsertStore.enPart
const getEnWord = state => state.singleInsertStore.enWord

const PART_MIN_LENGTH = 20
const WORD_MIN_LENGTH = 2

export function* translatePartSaga() {
  while (true) {
    try {
      yield take('singleInsert@TRANSLATE_PART')
      const enPart = yield select(getEnPart)
      if (enPart.length < PART_MIN_LENGTH) {

        return
      }
      const password = yield select(getPassword)
      const getTranslationFn = partialCurry<Promise<string>>(
        getTranslation,
        { text: enPart, password },
      )

      const [dePart, bgPart] = yield Promise.all([
        getTranslationFn({ language: 'de' }),
        getTranslationFn({ language: 'bg' }),
      ])

      const payload = { dePart, bgPart }
      yield put({ type: 'singleInsert@TRANSLATE_READY', payload })
      const enWord = yield select(getEnWord)

      if (enWord.length > WORD_MIN_LENGTH) {
        yield put({ type: 'singleInsert@TRANSLATE_WORD' })
      }
    } catch (err) {
      console.log(err)
    }
  }
}
