import {
  match,
  replace,
} from 'rambdax'
import { LOCATION_REGISTER_REGEX, LOCATION_REGISTER_REMOVE } from '../constants'
import { titleCase } from '../helpers/titleCase'

export function getLocationRegister(text: string): string {
  const [result] = match(LOCATION_REGISTER_REGEX, text)

  if (result === undefined) {

    throw 'LOCATION_REGISTER'
  }

  const willReturn = replace(
    LOCATION_REGISTER_REMOVE,
    '',
    result,
  )

  return titleCase(willReturn.trim())
}
