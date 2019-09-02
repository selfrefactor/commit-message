import {
  match,
  replace,
} from 'rambdax'
import {  ADDRESS_REGEX, ADDRESS_REMOVE_FIRST, ADDRESS_REMOVE_SECOND } from '../constants'

export function getAddress(text: string): string {
  const [result] = match( ADDRESS_REGEX, text)
  if (result === undefined) {
    throw 'ADDRESS'
  }

  const willReturnRaw = replace(
    ADDRESS_REMOVE_FIRST,
    '',
    result,
  )

  const willReturn = replace(
    ADDRESS_REMOVE_SECOND,
    '',
    willReturnRaw,
  )

  return willReturn.trim()
}
