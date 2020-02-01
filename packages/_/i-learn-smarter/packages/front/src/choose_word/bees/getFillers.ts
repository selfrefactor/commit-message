import {
  append,
  filter,
  shuffle,
  take,
} from 'rambdax'

// how many words, besides the correct one, to be used
const FALSE_WORDS = 2

// How many short words to be ignored
const LOW_LIMIT = 3

/**
 * It returns two filler words for a given word.
 * If the fillers collection cannot give at least
 * two words, the function will return `false`.
 */
export function getFillersBee(input: {
  word: string,
  fillers: Fillers,
}): string[] {
  const len = input.word.length

  if (
    input.fillers[len] === undefined ||
    input.fillers[len].length < LOW_LIMIT
  ) {

    return [input.word]
  }

  const filtered = filter(
    (x: string) => x !== input.word,
    input.fillers[len],
  )

  const twoWords = take(FALSE_WORDS, shuffle(filtered))

  return shuffle(append(input.word, twoWords))
}
