import { path, range, shuffle } from 'rambdax'
import { put, select, take } from 'redux-saga/effects'

import { close } from '../common'
import { createAction } from '../createAction'

export function* bufferInputSaga(){
  while (true){
    try {
      const { payload } = yield take('BUFFER_INPUT')

      const buffer = yield select(path('rootStore.buffer'))

      const newProps = {
        ...buffer,
        [ payload.inputType ] : payload.newValue,
      }

      yield put(createAction('SET_BUFFER_PROPS', newProps))
    } catch (err){
      console.log(err)
    }
  }
}

export function* bufferSubmitSaga(){
  while (true){
    try {
      const { payload } = yield take('BUFFER_SUBMIT')
      const buffer = yield select(path('rootStore.buffer'))

      const currentURL = window.location.href

      const textToPublish = `${ buffer[ payload ] } - ${ currentURL }`

      const contentPart = `content=${ encodeURIComponent(textToPublish) }`

      const [ timeValue ] = shuffle(range(1, 6))
      const timePart = `timeValue=${ timeValue }h`

      const zapierPart = process.env.ZAPIER_BUFFER_URL
      const zapierUrl = `${ zapierPart }/?${ contentPart }&${ timePart }`

      yield fetch(zapierUrl)

      yield put({ type : 'CLOSE' })

      close()
    } catch (err){
      console.error(err)
    }
  }
}
