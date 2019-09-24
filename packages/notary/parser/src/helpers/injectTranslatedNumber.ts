import { match, tail, replace } from 'rambdax'
import { translateNumber } from './translateNumber'

export function injectTranslatedNumber(input: string){
  const [matched] = match(/№\s?[0-9]{1,3}/, input)

  if(matched === undefined){
    return input
  }

  const num = Number(tail(matched))
  const translated = translateNumber(num)

  const injection = `${matched}/${translated}/`

  return replace(
    /№\s?[0-9]{1,3}/,
    injection,
    input
  )
}