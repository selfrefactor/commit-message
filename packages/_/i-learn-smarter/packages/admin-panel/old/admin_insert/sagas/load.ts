import * as axios from 'axios'
import {
  DELAY,
  delay,
  filter,
  map,
  mapFastAsync,
  merge,
  omit,
  pluck,
  produce,
  take as takeMethod,
} from 'rambdax'

import { put, select, take } from 'redux-saga/effects'
import { url } from '../../_helpers/url'
import { ADMIN_INSERT_DATA_READY, ADMIN_INSERT_LOAD } from '../../constants'

import {
  getDBDraft,
  getPassword,
} from '../../_modules/selectors'

interface PouchDocument {
  doc: any
}

const LIMIT = 4
const LIMIT_EXTRA = 3
const TIMEOUT = 2000

function* allDocsFn({ db, options }) {
  let result = yield Promise.race([
    delay(TIMEOUT),
    db.allDocs(options),
  ])

  while (result === DELAY) {
    console.log('result === R.DELAY')

    result = yield Promise.race([
      delay(TIMEOUT),
      db.allDocs(options),
    ])
  }

  return result
}

const googleTranslate = async body => {
  const { data } = await (axios as any).post(
    `${url('translate2')}/translate`,
    body,
  )

  return data
}

function getPayloadRaw(rawData: any) {
  const filtered = filter(
    x => !(x as any).id.startsWith('_design'),
    rawData.rows,
  )

  const taken = takeMethod<any>(LIMIT, filtered)

  const mapped = map((x: PouchDocument) => ({
    data: omit('created,updated,_id,_rev', x.doc),
    idCollection: {
      _id: x.doc._id,
      _rev: x.doc._rev,
    },
  }), taken)

  const produced = produce({
    data: pluck('data'),
    idCollection: pluck('idCollection'),
  }, mapped)

  return produced
}

export function* loadSaga() {
  while (true) {
    try {
      yield take(ADMIN_INSERT_LOAD)
      const dbDraft = yield select(getDBDraft)
      const options = {
        descending: false,
        include_docs: true,
        limit: LIMIT + LIMIT_EXTRA,
      }
      const rawData = yield allDocsFn({
        db: dbDraft,
        options: options,
      })

      const payloadRaw = getPayloadRaw(rawData)

      const password = yield select(getPassword)

      const translated = yield mapFastAsync(
        async x => googleTranslate({
          payload: {
            text: (x as any).dePart,
            from: 'DE',
            to: 'EN',
          },
          token: password,
        }),
        (payloadRaw as any).data
      )
      
      const payload = merge(payloadRaw, { translated })

      yield put({
        payload: payload,
        type: ADMIN_INSERT_DATA_READY,
      })
    } catch (err) {
      console.log(err)
    }
  }
}
