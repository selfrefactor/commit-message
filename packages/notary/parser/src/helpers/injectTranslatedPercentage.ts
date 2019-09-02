import { match, tail, replace } from 'rambdax'
import { translateWithDecimal } from './translateWithDecimal'
import {between} from 'string-fn'

export function injectTranslatedPercentage(input: string){
  const [matched] = match(/[0-9,]{1,7}%\s*ид\.ч\./, input)

  if(matched === undefined){
    return input
  }

  const num = replace(/%\s*ид\.ч\./,'',matched)
  const translatedRaw = translateWithDecimal(num)
  const translated = between(translatedRaw, '/','/')
  const injection = `${matched}/${translated} процента/`

  return replace(
    /[0-9,]{1,7}%\s*ид\.ч\./,
    injection,
    input
  )
}