import { words } from './words'
import {
  compose,
  toUpper,
  join,
  map,
} from 'rambdax'
import { wordsX } from './wordsX'
  
export const constantCase = (str, extraLatin = false) => {
  const method = extraLatin ?
    wordsX :
    words

  return compose(
   join('_'),
   map(toUpper),
   method
 )(str)
}

