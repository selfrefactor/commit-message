import {
  match,
  replace,
} from 'rambdax'
import { ZAPOVED_REGEX, ZAPOVED_REMOVE } from '../constants'

export function getZapoved(text: string): string {
  const [result] = match(ZAPOVED_REGEX, text)
  if (result === undefined) {
    throw 'ZAPOVED'
  }

  const willReturn = replace(
    ZAPOVED_REMOVE,
    '',
    result,
  )

  return willReturn.trim()
}
