import {
  match,
  replace,
} from 'rambdax'
import { SKITSA_REGEX, SKITSA_REMOVE } from '../constants'

export function getSkitsa(text: string): string {
  const [result] = match(SKITSA_REGEX, text)
  if (result === undefined) throw 'SKITSA'

  const willReturn = replace(
    SKITSA_REMOVE,
    '',
    result,
  )

  return willReturn.trim()
}
