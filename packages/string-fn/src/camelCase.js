import {
  join,
  map,
  toUpper,
  head,
  toLower,
  tail,
} from 'rambdax'

import { words } from './words'
import { wordsX } from './wordsX'

export function camelCase(str, extraLatin = false){
  const method = extraLatin ?
    wordsX :
    words

  const result = join(
    '',
    map(
      val => `${ toUpper(head(val)) }${ toLower(tail(val)) }`,
      method(str)
    )
  )

  return `${ toLower(head(result)) }${ tail(result) }`
}
