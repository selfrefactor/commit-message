import {
  match,
  replace,
} from 'rambdax'
import { IDENTIFIKATOR_REGEX, IDENTIFIKATOR_REMOVE } from '../constants'

export function getIdentifikator(text: string): string {
  const [result] = match(IDENTIFIKATOR_REGEX, text)
  if (result === undefined) {
    throw 'IDENTIFIKATOR'
  }

  const willReturn = replace(
    IDENTIFIKATOR_REMOVE,
    '',
    result,
  )

  return willReturn.trim()
}
