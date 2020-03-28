import { delay } from 'rambdax'
import { fork, take } from 'redux-saga/effects'

import { getTimeValue } from '../common'
import {
  GOOGLE_IMAGE_ARROW_SELECTOR,
  GOOGLE_IMAGE_INIT_SELECTOR,
  GOOGLE_IMAGE_SUBMIT,
} from '../constants'
import { closeSaga } from './closeSaga'

export function* googleImageSaga(){
  while (true){
    try {
      yield take(GOOGLE_IMAGE_SUBMIT)
      const ms = yield getTimeValue()

      const timePeriod = ms * 200

      const images = document.querySelectorAll(GOOGLE_IMAGE_INIT_SELECTOR)
      const [ firstImage ] = Array.from(images)
      yield fork(closeSaga)

      firstImage.click()
      yield delay(1000)

      const getArrow = () =>
        document.querySelectorAll(GOOGLE_IMAGE_ARROW_SELECTOR)[ 1 ]

      let arrow = getArrow()

      while (arrow !== null){
        yield delay(timePeriod)
        arrow.click()

        arrow = getArrow()
      }
    } catch (err){
      console.error(err)
    }
  }
}
