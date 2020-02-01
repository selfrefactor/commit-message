import { takeArguments, kebabCase } from 'string-fn'
import {path, pluck, shuffle, sort } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'

import { getDBCloud } from '../../_modules/selectors'
import {
  ADMIN_REPAIR_LOAD,
  ADMIN_REPAIR_LOAD_READY,
  RELATED_INIT,
} from './../../constants'

const getMode = path('adminRepairStore.mode')
const getRandomFlag = path('adminRepairStore.randomFlag')

function sortData(data){
  return sort<any>(
    (a, b) => {
      if (a.updated && b.updated){
        return b.updated - a.updated
      }
      if (a.updated && b.updated === undefined){
        return -1
      }
      if (b.updated && a.updated === undefined){
        return 1
      }
      return a._id > b._id ?
        1 :
        -1
    },
  )(data)
}

// If set to 'relateless' it will
// use only instances without related words
///////////////////////////
const RELATED_FUN = 'imagefull'

export function putAheadAnt(list: any, index: any){
  if (index < 1) { return list }

  const [first, target] = [list[0], list[index]]
  list[0] = target
  list[index] = first

  return list
}


function getData(dataRaw, randomFlag){
  const {id} = takeArguments(window.location.href)
  if(!id){
    return randomFlag ?
      shuffle(dataRaw) :
      sortData(dataRaw)
  }
  const found = dataRaw.findIndex(
    x => {
      if(!x.altTag) return false
      
      return kebabCase(x.altTag) === id
    }
  )

  return putAheadAnt(dataRaw, found)
}

export function* loadSaga() {
  while (true) {
      yield take(ADMIN_REPAIR_LOAD)
      const mode = yield select(getMode)
      const randomFlag = yield select(getRandomFlag)
      const isRelated = mode === 'RELATED'

      const fun = isRelated ?
        RELATED_FUN :
        mode.toLowerCase()

      const dbCloud = yield select(getDBCloud)
      const rawData = yield dbCloud.query(fun)
      const dataRaw = pluck('value',rawData.rows)
      const data = getData(dataRaw, randomFlag)

      const currentIndex = 0
      const currentInstance = dataRaw[currentIndex]
      yield put({
        payload: {
          currentIndex,
          currentInstance,
          data,
        },
        type: ADMIN_REPAIR_LOAD_READY,
      })

      if (isRelated) { yield put({type: RELATED_INIT}) }
  }
}
