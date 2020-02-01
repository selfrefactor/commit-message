import { createActionAnt } from '../ants/createAction'
import { switcher } from 'rambdax'
import {
  WRITE_SENTENCE_CHECK,
  WRITE_SENTENCE_INIT,
  WRITE_SENTENCE_INIT_READY,
  WRITE_SENTENCE_LISTEN,
  WRITE_SENTENCE_MIC,
  WRITE_SENTENCE_MIC_READY,
  WRITE_SENTENCE_NEXT,
  WRITE_SENTENCE_SET_INDEX,
  WRITE_SENTENCE_SET_INPUT,
  WRITE_SENTENCE_SET_NEXT,
  WRITE_SENTENCE_SET_OK_CORRECT,
  WRITE_SENTENCE_STEP,
  WRITE_SENTENCE_STOP,
} from '../constants'

// ACTIONS
export const mic = createActionAnt(WRITE_SENTENCE_MIC)
export const micReady = createActionAnt(WRITE_SENTENCE_MIC_READY)
export const check = createActionAnt(WRITE_SENTENCE_CHECK)
export const init = createActionAnt(WRITE_SENTENCE_INIT)
export const initReady = createActionAnt(WRITE_SENTENCE_INIT_READY)
export const listen = createActionAnt(WRITE_SENTENCE_LISTEN)
export const next = createActionAnt(WRITE_SENTENCE_NEXT)
export const setIndex = createActionAnt(WRITE_SENTENCE_SET_INDEX)
export const setNext = createActionAnt(WRITE_SENTENCE_SET_NEXT)
export const setOkCorrect = createActionAnt(WRITE_SENTENCE_SET_OK_CORRECT)
export const setInput = createActionAnt(WRITE_SENTENCE_SET_INPUT)
export const step = createActionAnt(WRITE_SENTENCE_STEP)
export const stop = createActionAnt(WRITE_SENTENCE_STOP)

const greaterThen = x => y => y > x

export function notifySpoken(points: number,input: string): NotifyInput{
  const mode = switcher<NotifyType>(points)
    .is(greaterThen(9), 'notify@SUCCESS')
    .is(greaterThen(6), 'notify@INFO')
    .is(greaterThen(3), 'notify@WARNING')
    .default('notify@ERROR')

  return {
    payload: { message: input, ms: 3600 },
    type: mode,
  }
}

export function notifyAnswer(input: string): NotifyInput{
  return {
    payload: { message: input, ms: 3000 },
    type: 'notify@SUCCESS',
  }
}
