import {
  ADMIN_REPAIR_TRANSLATE,
  ADMIN_REPAIR_TRANSLATE_READY,
} from '../../constants';

import { pick } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import { getTranslation } from '../../_modules/getTranslation'
import { getPassword } from '../../_modules/selectors'

const getBG = state => pick(
  'bgPart,bgWord',
  state.adminRepairStore.currentInstance,
)

const getCurrentInstance = state => state.adminRepairStore.currentInstance

const getEN = state => pick(
  'enPart,enWord',
  state.adminRepairStore.currentInstance,
)

export function* translateSaga() {
  while (true) {
    yield take(ADMIN_REPAIR_TRANSLATE)

    let currentInstance = yield select(getCurrentInstance)
    const { bgPart, bgWord } = yield select(getBG)
    const password = yield select(getPassword)
    const { enPart, enWord } = yield select(getEN)

    if (bgWord === undefined || bgWord === '') {
      const bgWordTranslated = yield getTranslation({
        language: 'bg',
        password: password,
        text: enWord,
      })
      currentInstance = { ...currentInstance, bgWord: bgWordTranslated }
    }

    if (bgPart === undefined || bgPart === '') {
      const bgPartTranslated = yield getTranslation({
        language: 'bg',
        password: password,
        text: enPart,
      })
      currentInstance = { ...currentInstance, bgPart: bgPartTranslated }
    }

    yield put({
      payload: currentInstance,
      type: ADMIN_REPAIR_TRANSLATE_READY,
    })
  }
}
