import { any } from 'rambdax'
import { put, take } from 'redux-saga/effects'

import { isGoogleImageURL } from '../common'
import {
  GENERIC_CLICK_NEXT,
  GOOGLE_IMAGE,
  INIT,
  SET_TIME_COMPONENT,
} from '../constants'
import { createAction } from '../createAction'

const genericClickNextURLs = [
  'instagram.com',
  'imgur.com',
  'ilearnsmarter.com',
]

function isGenericClickNext(){
  const url = window.location.href

  return any(supportedURL => url.includes(supportedURL))(genericClickNextURLs)
}

export function* initSaga(){
  while (true){
    try {
      yield take(INIT)

      if (isGoogleImageURL()){
        yield put(createAction(SET_TIME_COMPONENT, GOOGLE_IMAGE))
      } else if (isGenericClickNext()){
        yield put(createAction(SET_TIME_COMPONENT, GENERIC_CLICK_NEXT))
      }
    } catch (err){
      console.error(err)
    }
  }
}
