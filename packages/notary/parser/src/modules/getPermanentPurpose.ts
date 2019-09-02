import {
  match,
  replace,
} from 'rambdax'
import {
  PERMANENT_PURPOSE_REGEX, 
  PERMANENT_PURPOSE_REMOVE, 
} from '../constants'

export function getPermanentPurpose(text: string): string {
  const [result] = match( PERMANENT_PURPOSE_REGEX, text)
  if (result === undefined) {
    throw 'PERMANENT_PURPOSE'
  }

  const permanentPurpose = replace(
    PERMANENT_PURPOSE_REMOVE,
    '',
    result,
  )


  return permanentPurpose.toLowerCase().trim()
}
