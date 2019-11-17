import { match, tail, replace } from 'rambdax'
import { translateNumber } from './translateNumber'

export function injectTranslatedAcreage(input: string){
  const [matched] = match(/[0-9]{1,4}\s*кв\.м\./, input)

  if(matched === undefined){
    return input
  }

  const num = Number(replace('кв.м.','',matched))
  const translated = translateNumber(num)

  const injection = `${matched}/${translated}/`

  return replace(
    /[0-9]{1,4}\s*кв\.м\./,
    injection,
    input
  )
}