import { split } from 'rambdax'
import { trim } from './trim'
import { PUNCTUATIONS } from './internals/constants'

const addSpaceAroundPunctuation = sentence =>
  sentence.replace(
    PUNCTUATIONS,
    match => ` ${ match } `
  )

export function splitSentence(sentence){
  return split(
    ' ',
    trim(
      addSpaceAroundPunctuation(sentence)
    )
  )
}
