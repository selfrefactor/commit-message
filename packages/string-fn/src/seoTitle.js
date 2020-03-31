import {
  join,
  map,
  toUpper,
  toLower,
  head,
  tail,
} from 'rambdax'
import { words } from './words'

export function seoTitle(str, limit = 3){
  const result = join(
    ' ',
    map(
      val => {
        if (val.length >= limit){
          return `${ toUpper(head(val)) }${ toLower(tail(val)) }`
        }

        return val
      },
      words(str)
    )
  )

  return `${ toUpper(head(result)) }${ tail(result) }`
}
