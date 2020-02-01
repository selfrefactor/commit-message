import { put, take, select } from 'redux-saga/effects'
import {DRAFTS, ADMIN_INSERT_NEXT, ADMIN_INSERT_NEXT_READY } from '../../constants'
import { loadDataSet } from '../../bees/loadDataSet'
import { googleTranslate } from '../../ants/googleTranslate'
import { mapAsync } from 'rambdax'

async function attachTranslation(germanQuotes){
  const toReturn = []
  await mapAsync(async x => {
    const translated = await googleTranslate(x.dePart)
    toReturn.push({
      ...x,
      enPart: translated
    })
  })(germanQuotes)
  return toReturn
}

export const getKeys = ({adminInsertStore: x}) => x.currentInstanceKeys

export function* nextSaga() {
  while (true) {
    try {
      yield take(ADMIN_INSERT_NEXT)
      const keys = yield select(getKeys)
      const germanQuotes = yield loadDataSet(DRAFTS, keys)
      const currentInstance = yield attachTranslation(germanQuotes)

      yield put({
        payload: {currentInstance},
        type: ADMIN_INSERT_NEXT_READY,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
