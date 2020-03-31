import { test } from 'rambdax'
import { PUNCTUATIONS } from './internals/constants'

export function isPunctuation(char){
  return test(PUNCTUATIONS, char)
}
