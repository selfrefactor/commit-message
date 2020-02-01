import * as PouchDBLib from 'pouchdb'
import { eventChannel } from 'redux-saga'
import { call, take } from 'redux-saga/effects'
import { INIT_SYNC } from '../../constants'
const { default: PouchDB } = PouchDBLib as any

PouchDB.plugin(require('pouchdb-authentication'))

function initSync(input: InitSyncInput) {
  const { dbName, dbNameDraft } = input

  return eventChannel(emitter => {
    const url = `${process.env.COUCH_URL}/${dbName}`
    const urlDraft = `${process.env.COUCH_URL}/${dbNameDraft}`
    const opts = {
      live: true,
      retry: true,
    }

    PouchDB.sync(dbName, url, opts)
      .on('change', change => {
        console.log(change, 'change')
      })
      .on('active', () => {
        console.log('active sync')
      })
      .on('denied', err => {
        console.log(err, 'denied sync, should reload')
        alert('denied sync, should reload')
      })
      .on('complete', info => {
        console.log(info, 'complete sync')
      })
      .on('error', err => {
        confirm('Need to reload')
        window.location.reload(false)
      })

    PouchDB.sync(dbNameDraft, urlDraft, opts)
      .on('change', change => {
        console.log(change, 'changeDraft')
      })
      .on('active', () => {
        console.log('active sync')
      })
      .on('denied', err => {
        console.log(err, 'denied sync, should reload')
        alert('draft | denied sync, should reload')
      })
      .on('complete', info => {
        console.log(info, 'complete sync')
      })
      .on('error', err => {
        console.log(err, 'error sync, should reload')
        alert('draft | error sync, should reload')
      })

    return () => {
      console.log('unsubscribe request')
    }
  })
}

export function* initSyncSaga() {
  const { payload } = yield take(INIT_SYNC)
  const chan = yield call(initSync, payload)

  try {
    while (true) {
      yield take(chan)
      // window.location.reload(false)
    }
  } catch (err) {
    console.log(err)
  }
}
