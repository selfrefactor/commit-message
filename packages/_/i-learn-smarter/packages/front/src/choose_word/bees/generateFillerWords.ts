import {
  filter,
  flatten,
  map,
  pluck,
  produce,
  range,
  uniq,
} from 'rambdax'

import { wordsX } from 'string-fn'

/**
 * Limits of allowed word length
 */
const LOW_LIMIT = 2
const HIGH_LIMIT = 20

interface ProduceOut {
  [key: number]: string[]
}

/**
 * It uses limits to define valid length of word will be included.
 * If a word is outside the limit, then only one choice will_
 * be presented to the user.
 *
 */
function produceFn() {
  const willReturn = {}
  range(LOW_LIMIT, HIGH_LIMIT).map(index => {
    willReturn[index] = filter((x: string) => x.length === index)
  })

  return willReturn
}

/**
 * It creates a list of words from all words in the database.
 * Each member represents all the words of specific word length.
 * Property `3` will hold all words with three characters.
 * Dash(-) is removed from `filtered` because of Bulgarian
 *
 */
export function generateFillerWordsBee(input: DataPattern[]): ProduceOut {
  const plucked = pluck<string>('fromPart', input)
  const mapped = map(wordsX, plucked)
  const afterUniq = uniq(flatten<string>(mapped))
  const filtered = filter(
    (x: string) => !x.includes(',') || !x.includes('.'),
    afterUniq,
  )
  const produced = produce<ProduceOut>(produceFn(), filtered)

  return produced
}
