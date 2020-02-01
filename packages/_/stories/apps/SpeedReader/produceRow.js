import { take, switcher } from 'rambdax'
import { indent } from 'string-fn'

const LIMIT = 26
const HALF_LIMIT = 13
export function produceRow(wordRaw){
  const word = wordRaw.length > LIMIT ?
    take(LIMIT, wordRaw) :
    wordRaw

  if (word.length <= 12){
    return switcher(word.length)
      .is(x => x === 1, indent(word, HALF_LIMIT - 2))
      .is(x => x === 2, indent(word, HALF_LIMIT - 3))
      .is(x => x === 3, indent(word, HALF_LIMIT - 3))
      .is(4, indent(word, HALF_LIMIT - 4))
      .is(5, indent(word, HALF_LIMIT - 4))
      .is(6, indent(word, HALF_LIMIT - 5))
      .is(7, indent(word, HALF_LIMIT - 5))
      .is(8, indent(word, HALF_LIMIT - 6))
      .is(9, indent(word, HALF_LIMIT - 6))
      .default(indent(word, HALF_LIMIT - 7))
  }
  if (word.length <= 17){
    return switcher(word.length)
      .is(13, indent(word, HALF_LIMIT - 8))
      .is(14, indent(word, HALF_LIMIT - 8))
      .default(indent(word, HALF_LIMIT - 9))
  }

  return indent(
    word,
    LIMIT - word.length
  )
}
