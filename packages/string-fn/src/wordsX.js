import { match } from 'rambdax'
import { WORDS_EXTENDED } from './internals/constants'

export function wordsX(str){
  return match(WORDS_EXTENDED, str)
}
