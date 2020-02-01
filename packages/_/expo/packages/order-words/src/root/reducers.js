import { Constants } from 'expo'
import { NEXT_READY, PRESS_READY } from '../constants'
import * as db from '../../db.json'
import { nextBee } from '../bees/next'
import { random } from 'rambdax'

const currentIndex = random(0, Constants.manifest.extra.len - 1)
const currentInstance = db[ currentIndex ]
const initialNext = nextBee(currentInstance)

const initialState = {
  answer      : initialNext.answer,
  translation : initialNext.translation,
  currentIndex,
  currentInstance,
  db,
  index       : 0,
  showNext    : false,
  words       : initialNext.words,
}

export function store(state = initialState, action){
  switch (action.type){
  // New current instance is ready for display
  // ============================================
  case NEXT_READY:
    return {
      ...state,
      ...action.payload,
      index    : 0,
      showNext : false,
    }
    // User press an answer
    // ============================================
  case PRESS_READY:
    return {
      ...state,
      ...action.payload,
    }
  default:
    return state
  }
}
