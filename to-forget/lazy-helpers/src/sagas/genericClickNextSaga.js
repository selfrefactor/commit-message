import { always, switcher } from 'rambdax'
import { delay } from 'rambdax'
import { fork, take } from 'redux-saga/effects'
import { getTimeValue } from '../common'
import {
  GENERIC_CLICK_NEXT_SUBMIT,
  IMGUR_SELECTOR,
} from '../constants'
import { closeSaga } from './closeSaga'

function getInstagramElement() {
  const elsRaw = document.querySelectorAll('a[role="button"]')
  const els = Array.from(elsRaw)

  const [found] = els.filter(el => el.textContent === 'Next')

  return found !== undefined ? found : null
}

function getImgurElement() {
  return document.querySelector(IMGUR_SELECTOR)
}

function getILSElement() {
  return document.querySelector('#next')
}

function* afterClickILS() {
  yield delay(3000)
  const el = document.querySelector('#submit')

  el.click()

  return
}

function getElementFunctionFromURL() {

  const key = switcher(window.location.href)
    .is(url => url.includes('instagram.com'), 'getInstagramElement')
    .is(url => url.includes('imgur.com'), 'getImgurElement')
    .is(url => url.includes('ilearnsmarter.com/'), 'getILSElement')
    .default('empty')
    
  const functions = {
    getImgurElement,
    getILSElement,
    getInstagramElement,
    // Return `null` so it evaluates to element not found
    empty: always(null),
  }

  return functions[key]
}

function* prepareInstagram() {
  const el = document.querySelectorAll('div div a')[0]
  el.click()
  yield delay(1000)

  return
}

function getPrepareFunctionFromURL() {

  const key = switcher(window.location.href)
    .is(url => url.includes('instagram.com'), 'prepareInstagram')
    .default('empty')

  const functions = {
    prepareInstagram,
    empty: always(() => { }),
  }

  return functions[key]
}

function getAfterClickFunction() {

  const key = switcher(window.location.href)
    .is(url => url.includes('ilearnsmarter.com/'), 'afterClickILS')
    .default('empty')

  function* empty() {
    return
  }

  const functions = {
    afterClickILS,
    empty,
  }

  return functions[key]
}

export function* genericClickNextSaga() {
  while (true) {
    try {
      yield take(GENERIC_CLICK_NEXT_SUBMIT)
      const ms = yield getTimeValue()
      const timePeriod = ms * 300

      yield fork(closeSaga)
      const prepareFunction = getPrepareFunctionFromURL()
      yield prepareFunction()

      const getElementFunction = getElementFunctionFromURL()
      const afterClickFunction = getAfterClickFunction()

      let elementToClick = getElementFunction()

      while (elementToClick !== null) {
        yield delay(timePeriod)
        elementToClick.click()

        elementToClick = getElementFunction()
        yield afterClickFunction()
      }
    } catch (err) {
      console.error(err)
    }
  }
}
