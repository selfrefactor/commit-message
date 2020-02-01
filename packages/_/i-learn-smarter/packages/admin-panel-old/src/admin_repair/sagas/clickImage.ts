import * as axios from 'axios'
import {
  always,
  DELAY,
  delay,
  identity,
  ifElse,
  merge,
  omit,
} from 'rambdax'
import { put, select, take } from 'redux-saga/effects'
import {
  getCurrentInstance,
  getDB,
  getPassword,
} from '../../_modules/selectors'
import {
  ADMIN_REPAIR_CHANGE_IMAGE,
  ADMIN_REPAIR_CLICK_IMAGE,
} from './../../constants'

const TIMEOUT = 20000

const uploadImage = async body => {
  try {
    const { data } = await (axios as any).post(
      `${process.env.SERVICE_UPLOAD_IMAGE}/`,
      body,
    )

    return data
  } catch (err) {
    console.log(err, 'upload image')
  }
}

function mergeResult(currentInstance, uploadResult){
  if (!currentInstance.altTag) { return merge(currentInstance, uploadResult) }

  return merge(
    currentInstance,
    omit('altTag', uploadResult),
  )
}

export function* clickImageSaga() {
  while (true) {
    try {
      const { payload } = yield take(ADMIN_REPAIR_CLICK_IMAGE)
      const password = yield select(getPassword)
      const db = yield select(getDB)
      const currentInstance = yield select(getCurrentInstance)

      const enPart = ifElse(
        x => x.length === 0,
        always('foo'),
        identity,
      )(currentInstance.enPart)

      yield put({
        message: 'Uploading the image',
        ms: 1000,
        type: 'NOTIFY_INFO',
      })

      const uploadResult = yield Promise.race([
        delay(TIMEOUT),
        uploadImage({
          enPart: enPart,
          imageSrc: payload.imageSrc,
          token: password,
        }),
      ])

      if (uploadResult === DELAY || uploadResult === undefined) {

        console.log(uploadResult, 'error.clickimagesaga')

        yield put({
          message: 'Timeout when uploading the image',
          ms: 1500,
          type: 'NOTIFY_ERROR',
        })
      } else {

        console.log(uploadResult, 'uploadresult.clickimagesaga')
        const toUpdate = mergeResult(currentInstance, uploadResult)
        console.log(toUpdate, currentInstance, 'toupdate.clickimagesaga')

        const updateResult = yield db.put(toUpdate)
        yield put({
          message: 'Image of document updated',
          ms: 500,
          type: 'NOTIFY_SUCCESS',
        })

        const currentInstanceValue = merge(
          toUpdate,
          { _rev: updateResult.rev },
        )
        yield put({
          payload: currentInstanceValue,
          type: ADMIN_REPAIR_CHANGE_IMAGE,
        })
      }
    } catch (err) {
      console.log(err)
    }
  }
}
