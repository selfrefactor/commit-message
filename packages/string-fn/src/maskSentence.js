import { trim } from './trim'
import { maskWordHelper, maskWordHelperX } from './internals/maskWordHelper'
import { PUNCTUATIONSX } from './internals/constants'

import {
  partialCurry,
  map,
  split,
} from 'rambdax'

const addSpaceAroundPunctuation = sentence =>
  sentence.replace(PUNCTUATIONSX, x => ` ${ x } `)

/**
 * Use shorter version of PUNCTUATIONS so_
 * cases `didn't` and `по-добри` be handled
 */
export function maskSentence({
  charLimit = 4,
  easyMode = false,
  easierMode = false,
  randomMode = false,
  replacer = '_',
  sentence,
  words = [],
}){
  const parsed = trim(addSpaceAroundPunctuation(sentence))
  const hidden = []
  const visible = []
  const input = {
    replacer,
    easyMode,
    randomMode,
    easierMode,
    charLimit,
  }
  const easyFn = partialCurry(maskWordHelperX, input)
  const ant = easierMode || easyMode ?
    word => easyFn({ word }) :
    word => maskWordHelper(word, replacer, charLimit)

  map(
    word => {
      const ok =
        words.length === 0 ||
        words.includes(word)

      const visiblePart = ok ?
        ant(word) :
        word

      hidden.push(word)
      visible.push(visiblePart)
    },
    split(' ', parsed)
  )

  return {
    hidden,
    visible,
  }
}
