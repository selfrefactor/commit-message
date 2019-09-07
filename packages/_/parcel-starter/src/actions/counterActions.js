/*
 * action types
 */

export const UPDATE_COUNTER = 'UPDATE_COUNTER'
export const UPDATE_COMPLETE = 'UPDATE_COMPLETE'

/*
 * action creators
 */

export function updateCounter(counterStep) {
  return { type: UPDATE_COUNTER, payload: counterStep }
}