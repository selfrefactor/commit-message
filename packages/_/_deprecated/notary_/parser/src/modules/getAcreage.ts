import {
  match,
  replace,
} from 'rambdax'
import {  ACREAGE_REGEX, ACREAGE_REMOVE_FIRST, ACREAGE_REMOVE_SECOND } from '../constants'
import { translateNumber } from '../helpers/translateNumber'

export function getAcreage(text: string): string {
  const [result] = match( ACREAGE_REGEX, text)
  if (result === undefined) {
    throw 'ACREAGE'
  }

  const acrageStringRaw = replace(
    ACREAGE_REMOVE_FIRST,
    '',
    result,
  )

  const acrageString = replace(
    ACREAGE_REMOVE_SECOND,
    '',
    acrageStringRaw,
  )
  const [acrageNumber] = match(/[0-9]*/g, acrageString.trim())

  const withWords = translateNumber(Number(acrageNumber))
  
  return replace(
    acrageNumber,
    `${acrageNumber}/${withWords}/`,
    acrageString.trim()
  )
}
