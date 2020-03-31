import { test } from 'rambdax'
import { WORDS_EXTENDED } from './internals/constants'

export function isLetter(char){
  return test(WORDS_EXTENDED, char)
}
