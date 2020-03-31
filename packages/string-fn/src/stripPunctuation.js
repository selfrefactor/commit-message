import { replace } from 'rambdax'
import { PUNCTUATIONS } from './internals/constants'

export function stripPunctuation(str){
  return replace(PUNCTUATIONS, '', str)
}
