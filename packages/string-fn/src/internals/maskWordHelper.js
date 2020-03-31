import {
  test,
  head,
  last,
} from 'rambdax'
import { PUNCTUATIONSX } from './constants'

const humanLengths = {
  5 : 'Five',
  6 : 'Six',
  7 : 'Seven',
  8 : 'Eight',
}

const globs = {
  easyFive     : '*123*',
  easySix      : '*123**',
  easySixR     : '**234*',
  easierSix    : '*123**',
  easierSixR   : '**234*',
  easySeven    : '*1234**',
  easySevenR   : '**2345*',
  easierSeven  : '**234**',
  easyEight    : '**2345**',
  easierEight  : '**234***',
  easierEightR : '***345**',
  easyAny      : len => `**${ '-'.repeat(len - 5) }***`,
  easierAny    : len => `***${ '-'.repeat(len - 6) }***`,
}

function chance(){
  return Math.random() > 0.49
}

function getGlob(len, mode, random){
  if (len > 8) return globs[ `${ mode }Any` ](len)
  if (len === 5) return globs.easyFive
  const base = `${ mode }${ humanLengths[ len ] }`
  const maybeKey = globs[ base ]

  if (!random){
    return maybeKey === undefined ?
      globs[ `easy${ humanLengths[ len ] }` ] :
      maybeKey
  }

  return globs[ `${ base }R` ] === undefined ?
    maybeKey :
    chance() ?
      globs[ `${ base }R` ] :
      maybeKey
}

export function ant(word, glob, replacer){
  const chars = [ ...word ]

  return chars.map((char, i) => glob[ i ] === '*' ?
    char :
    replacer
  ).join('')
}

export function maskWordHelper(word, replacer, charLimit = 4){
  if (
    test(PUNCTUATIONSX, word) ||
    word.length <= 1
  ){
    return word
  }

  if (word.length < charLimit){
    return `${ head(word) }${ replacer.repeat(word.length - 1) }`
  }

  return `${ head(word) }${ replacer.repeat(word.length - 2) }${ last(word) }`
}

export function maskWordHelperX({
  word,
  replacer = '_',
  easyMode = false,
  randomMode = false,
  easierMode = false,
  charLimit = 4,
}){
  const len = word.length
  if (
    !easyMode && !easierMode ||
    len <= 4
  ) return maskWordHelper(word, replacer, charLimit)

  const glob = getGlob(
    len,
    easyMode ? 'easy' : 'easier',
    randomMode
  )

  return ant(word, glob, replacer)
}
