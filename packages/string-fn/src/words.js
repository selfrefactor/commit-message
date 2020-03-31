import { match } from 'rambdax'
import { WORDS } from './internals/constants'

export function words(str){
  return match(WORDS, str)
}
