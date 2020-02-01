import { drop } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import {
  ADMIN_INSERT_LOAD_KEYS,
  ADMIN_INSERT_NEXT,
  ADMIN_INSERT_REMOVE,
  DRAFTS,
} from '../../constants'
import { dbRequest } from '../../bees/dbRequest'

const getStore = state => state.adminInsertStore

async function remove(keys){
  await dbRequest({
    operation:'removeSet',
    label: DRAFTS,
    data: keys
  })
}

export function* removeSaga() {
  while (true) {
      yield take(ADMIN_INSERT_REMOVE)
      const {currentInstanceKeys, allKeys} = yield select(getStore)
      yield remove(currentInstanceKeys)
      const newAllKeys = drop(4, allKeys)

      yield put({
        payload: {allKeys: newAllKeys},
        type: ADMIN_INSERT_LOAD_KEYS,
      })
      yield put({
        type: ADMIN_INSERT_NEXT,
      })
  }
}
