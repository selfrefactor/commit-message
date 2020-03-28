import { delay } from 'rambdax'
import { fork, take } from 'redux-saga/effects'
import { getTimeValue } from '../common'
import { SLOW_SCROLL_SUBMIT } from '../constants'
import { closeSaga } from './closeSaga'

function getDirection(direction){
  if(direction === 'DOWN'){

    return window.innerHeight + window.scrollY >= document.body.offsetHeight ? 
      'UP' :
      'DOWN'
  }

  return window.scrollY === 0 ?
    'DOWN' :
    'UP'
}

function applyDirection(direction){
  if(direction === 'DOWN'){
    window.scrollTo(0, window.scrollY + 2)
  }else{
    window.scrollTo(0, window.scrollY - 2)
  }
}

export function* slowScrollSaga(){
  while (true){
    try {
      yield take(SLOW_SCROLL_SUBMIT)
      yield fork(closeSaga)
      
      const ms = yield getTimeValue()
      const timePeriod = 101 - ms
      let direction = 'DOWN'
      let counter = 0
      while (true){
        counter++
        if(counter%30 === 0) direction = getDirection(direction)

        yield delay(timePeriod)
        applyDirection(direction)        
      }
    } catch (err){
      console.error(err)
    }
  }
}
