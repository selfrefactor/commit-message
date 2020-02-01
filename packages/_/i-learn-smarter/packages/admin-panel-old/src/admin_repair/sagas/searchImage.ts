import {
  compose,
  filter,
  head,
  init,
  last,
  map,
  merge,
  split,
} from 'rambdax'

import * as axios from 'axios'
import { put, select, take } from 'redux-saga/effects'
import { url } from '../../_helpers/url'
import { getPassword } from '../../_modules/selectors'
import {
  ADMIN_REPAIR_IMAGES_READY,
  ADMIN_REPAIR_SEARCH_IMAGE,
} from '../../constants'

export function* searchImageSaga() {
  while (true) {
    const action = yield take(ADMIN_REPAIR_SEARCH_IMAGE)
    const query = createQuery(action)
    const password = yield select(getPassword)

    const notifyOptions = {
      message: `Search for images with query '${query}'`,
      ms: 500,
      type: 'NOTIFY_SUCCESS',
    }

    yield put(notifyOptions)

    const result = yield searchImage({
      password,
      query,
    })

    const filtered = compose(
      filter(x =>
        (x as any).imageSrc.endsWith('.png') || (x as any).imageSrc.endsWith('.jpg'),
      ),
      map(x => {
        const y = head(split('?', (x as any).imageSrc))

        return merge(x, { imageSrc: y })
      }),
    )(result)

    yield put({
      payload: filtered,
      type: ADMIN_REPAIR_IMAGES_READY,
    })
  }
}

const shortQuery = {
  a: 'abstract',
  m: 'meme',
  o: 'oil painting',
  p: 'painting',
  f: 'funny',
}

function createQuery(action: any) {
  const text: string = action.payload
  const argument = last(text.split(' '))

  if (shortQuery[argument] === undefined){

    return text
  }

  const base = init(text.split(' ')).join(' ')

  return `${base} ${shortQuery[argument]}`
}

async function searchImage({ query, password }){
    const body = {
      payload: query,
      token: password,
    }

    const { data } = await (axios as any).post(
      `${url('image', 'NGROK')}/search-image`,
      body,
    )

    return data
}
