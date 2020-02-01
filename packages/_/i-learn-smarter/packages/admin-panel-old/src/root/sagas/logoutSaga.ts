import { take } from 'redux-saga/effects'
import { ADMIN_PASSWORD, LOGOUT } from '../../constants'

export function* logoutSaga() {
  while (true) {
    try {
      yield take(LOGOUT)
      localStorage.removeItem(ADMIN_PASSWORD)
      window.location.reload()
    } catch (err) {
      console.log(err)
    }
  }
}
