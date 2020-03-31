import { words } from './words'
import {
  toLower,
  join,
} from 'rambdax'
import { wordsX } from './wordsX'

export function kebabCase(str, extraLatin = false){
  const method = extraLatin ?
    wordsX :
    words

  return toLower(join(
    '-',
    method(str)
  ))
}
