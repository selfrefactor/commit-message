import { put, take } from 'redux-saga/effects'
import {
  ADMIN_PASSWORD,
  CHECK_POUCH_LOGIN,
  ONCE,
  PASSWORD_PROMPT,
  SET_PASSWORD,
} from '../../constants'

export function* onceSaga() {
  while (true) {
    try {
      yield take(ONCE)

      const key = ADMIN_PASSWORD

      // when localStorage item is deleted its value is string 'null'
      ///////////////////////////
      if (`${localStorage.getItem(key)}` === 'null') {
        const password = window.prompt(PASSWORD_PROMPT)

        localStorage.setItem(key, password)
      }

      yield put({
        payload: localStorage.getItem(key),
        type: SET_PASSWORD,
      })

      yield put({ type: CHECK_POUCH_LOGIN })
    } catch (err) {
      console.log(err)
    }
  }
}
