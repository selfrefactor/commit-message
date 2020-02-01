import { merge } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'

import { notify } from '../../_helpers/notify'
import { getCurrentInstance, getDB } from '../../_modules/selectors'
import { returnFocusAnt } from '../ants/returnFocus'
import {
  ADMIN_REPAIR_UPDATE,
  ADMIN_REPAIR_UPDATE_READY,
} from './../../constants'

function appendData(currentInstance: any) {
  if (currentInstance.deRelated === undefined) {
    currentInstance.deRelated = []
  }
  if (currentInstance.enRelated === undefined) {
    currentInstance.enRelated = []
  }
  if (currentInstance.bgRelated === undefined) {
    currentInstance.bgRelated = []
  }
  if (currentInstance.pcFlag === undefined) {
    currentInstance.pcFlag = true
  }
  currentInstance.updated = Date.now()

  return currentInstance
}

export function* updateSaga() {
  while (true) {
    try {
      yield take(ADMIN_REPAIR_UPDATE)
      const currentInstanceRaw = yield select(getCurrentInstance)
      const currentInstance = appendData(currentInstanceRaw)
      const db = yield select(getDB)
      const updateResult = yield db.put(currentInstance)
      const updatedCurrentInstance = merge(
        currentInstance,
        { _rev: updateResult.rev },
      )

      yield put({
        payload: updatedCurrentInstance,
        type: ADMIN_REPAIR_UPDATE_READY,
      })

      yield notify('Document updated')
      returnFocusAnt()
    } catch (err) {
      console.log(err)
    }
  }
}
