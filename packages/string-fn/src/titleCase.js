import {
  join,
  map,
  head,
  toUpper,
  toLower,
  tail,
} from 'rambdax'
import { words } from './words'
import { wordsX } from './wordsX'

export function titleCase(str, extraLatin = false){
  const method = extraLatin ?
    wordsX :
    words
    
  return join(
    ' ',
    map(
      val => `${ toUpper(head(val)) }${ toLower(tail(val)) }`,
      method(str)
    )
  )
}
