import { maskWordHelper } from './internals/maskWordHelper'
import { split, join, map } from 'rambdax'

export function maskWords({ words, replacer = '_', charLimit = 3 }){
  const result = map(
    val => maskWordHelper(val, replacer, charLimit),
    split(' ', words)
  )

  return join(' ', result)
}
