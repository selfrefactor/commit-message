import { partialCurry, path, trim } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getTranslation } from '../../_modules/getTranslation'
import { getPassword } from '../../_modules/selectors'
import { toBulgarianReady } from '../actions'
import { ADMIN_REPAIR_TO_BULGARIAN } from './../../constants'

const getCurrentInstance = path('adminRepairStore.currentInstance')

export function* toBulgarianSaga() {
  while (true) {
    yield take(ADMIN_REPAIR_TO_BULGARIAN)
    const currentInstance = yield select(getCurrentInstance)
    const password = yield select(getPassword)
    const { enWord, enPart } = currentInstance
    const [enWordHead] = enWord.split(',').map(trim)

    const getTranslationFn = partialCurry<Promise<string>>(
      getTranslation,
      { language: 'bg', password },
    )
    const [bgWord, bgPart] = yield Promise.all([
      getTranslationFn({ text: enWordHead }),
      getTranslationFn({ text: enPart }),
    ])

    yield put(toBulgarianReady({ bgWord, bgPart }))
  }
}
