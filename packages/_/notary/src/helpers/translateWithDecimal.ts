import { translateNumber } from './translateNumber'
import { replace } from 'rambdax'

export function translateWithDecimal(inputRaw: string){
  const input = replace('.',',', inputRaw)
  const [integer, afterDecimal] = input.split(',').map(Number)

  const translatedInteger = translateNumber(integer)
  const translatedAfterDecimal = afterDecimal === undefined ? 
    false :
    translateNumber(afterDecimal)
  
  const translated = translatedAfterDecimal === false ?
    translatedInteger :
    `${translatedInteger} цяло и ${translatedAfterDecimal}`

  return `${input}/${translated}/`   
}