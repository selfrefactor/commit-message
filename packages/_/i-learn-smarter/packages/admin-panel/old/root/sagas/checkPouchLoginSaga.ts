import {
  put,
  select,
  take,
} from 'redux-saga/effects'

import ms from 'ms'
import { delay } from 'rambdax'
import { getLogged, getPassword } from '../../_modules/selectors'
import { CHECK_POUCH_LOGIN } from '../../constants'

import PouchDB from 'pouchdb'
import PouchAuth from 'pouchdb-authentication'

PouchDB.plugin(PouchAuth)
const ADMIN = 'admin'

export function* checkPouchLoginSagaFn() {
  yield take(CHECK_POUCH_LOGIN)
  const logged = yield select(getLogged)

  if (logged === true) {
    return
  }
  const DB = 'db'
  const DRAFT = 'draft'
  const url = `${process.env.COUCH_URL}/${DB}`
  const urlDraft = `${process.env.COUCH_URL}/${DRAFT}`

  // we need to wait as taking password may require user interaction
  let password = yield select(getPassword)

  while (password === false) {
    yield delay(ms('1second'))
    password = yield select(getPassword)
  }
  // const password = 'moreisless'
  const dbDraftLocal = new PouchDB(DRAFT, { skip_setup: true })
  const dbDraftCloud: any = new PouchDB(urlDraft, { skip_setup: true })

  const dbLocal = new PouchDB(DB, { skip_setup: true })
  const dbCloud: any = new PouchDB(url, { skip_setup: true })

  const loginResponseDraft = yield dbDraftCloud.login(ADMIN, password)
  const loginResponse = yield dbCloud.login(ADMIN, password)

  if (loginResponseDraft.ok !== true || loginResponse.ok !== true) {
    throw 'LOGIN_RESPONSE_ERROR'
  }

  yield put({
    payload: {
      dbName: DB,
      dbNameDraft: DRAFT,
    },
    type: 'INIT_SYNC',
  })
  yield put({
    payload:
      {
        db: dbLocal,
        dbCloud: dbCloud,
        dbDraft: dbDraftLocal,
        dbDraftCloud: dbDraftCloud,
      },
    type: 'SET_POUCH',
  })

  yield put({ type: 'INIT_READY' })
}

export function* checkPouchLoginSaga() {
  while (true) {
    try {
      yield checkPouchLoginSagaFn()
    } catch (err) {
      console.log(err)
    }
  }
}
