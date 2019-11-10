import {
  match,
  replace,
} from 'rambdax'
import {  PURPOSE_REGEX, PURPOSE_REMOVE } from '../constants'

export function getPurpose(text: string): string {
  const [result] = match( PURPOSE_REGEX, text)
  if (result === undefined) {
    throw 'PURPOSE'
  }

  const willReturn = replace(
    PURPOSE_REMOVE,
    '',
    result,
  )

  return willReturn.toLowerCase().trim()
}
