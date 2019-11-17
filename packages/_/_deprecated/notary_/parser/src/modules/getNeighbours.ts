import {
  match,
  replace,
} from 'rambdax'
import { NEIGHBOURS_REGEX, NEIGHBOURS_REMOVE } from '../constants'

export function getNeighbours(text: string): string {
  const [result] = match( NEIGHBOURS_REGEX, text)
  if (result === undefined) {
    throw 'NEIGHBOURS'
  }

  const willReturn = replace(
    NEIGHBOURS_REMOVE,
    '',
    result,
  )

  return willReturn.trim()
}
