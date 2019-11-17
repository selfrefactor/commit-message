import {
  match,
  replace,
} from 'rambdax'
import {  OLD_ID_REGEX, OLD_ID_REMOVE } from '../constants'

export function getOldID(text: string): string {
  const [result] = match( OLD_ID_REGEX, text)
  if (result === undefined) {
    return 'няма'
  }

  const willReturn = replace(
    OLD_ID_REMOVE,
    '',
    result,
  )

  return willReturn.trim()
}
