import {
  map,
  split,
  join,
  toLower,
} from 'rambdax'
import { distance } from './distance'

const normalizeGermanChar = char => {
  const arr = [ 'ä', 'ö', 'ü', 'ß' ]
  const normalizedArr = [ 'a', 'o', 'u', 'ss' ]
  const foundIndex = arr.indexOf(char)

  if (foundIndex === -1){
    return char
  }

  return normalizedArr[ foundIndex ]
}

const normalizeGermanWord = str => join(
  '',
  map(
    val => normalizeGermanChar(val),
    split('', toLower(str))
  )
)

export function distanceGerman(a, b){
  return distance(normalizeGermanWord(a), normalizeGermanWord(b))
}
