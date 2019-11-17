import {
  match,
  replace,
} from 'rambdax'
import {  PREVIOUS_NUMBER_REGEX, PREVIOUS_NUMBER_REMOVE } from '../constants'

/**
 * Номер по предходен план
 * 
 * @export
 * @param {string} text 
 * @returns {string} 
 */
export function getPreviousNumber(text: string): string {
  const [result] = match( PREVIOUS_NUMBER_REGEX, text)
  if (result === undefined) {
    throw 'PREVIOUS_NUMBER'
  }

  const willReturn = replace(
    PREVIOUS_NUMBER_REMOVE,
    '',
    result,
  )

  return willReturn.trim()
}
