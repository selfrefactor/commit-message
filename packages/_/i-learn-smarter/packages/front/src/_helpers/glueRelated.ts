import { sort, tail } from 'rambdax'

const sorter = (a: string, b: string) => b.length - a.length
const LIMIT = 75
const SEP = '; '

function getTotalLength(words: string[]): number {
  return words.reduce(
    (prev, current) => prev + current.length,
    0,
  )
}

function getLine(word: string, list: string[]): string[] {
  let flag = true
  let counter = -1
  const answer = [word]

  while (flag) {
    counter++

    if (counter === list.length) {
      flag = false
      continue
    }
    const possibleAnswer = [...answer, list[counter]]

    const len = getTotalLength(possibleAnswer)
    const separatorLength = (possibleAnswer.length - 1) * SEP.length
    if (len + separatorLength < LIMIT) {
      answer.push(list[counter])
    }
  }

  return answer
}

/**
 * Converts list of words to two strings within LIMIT length
 */
export function glueRelated(words: string[]) {
  const filtered = words.filter(
    x => x.length < LIMIT,
  )

  const sorted = sort(sorter, filtered)

  if (sorted.length === 0) { return ['', ''] }

  if (sorted.length === 1) { return [sorted[0], ''] }

  const firstLine = getLine(sorted[0], tail(sorted))
  const remain = sorted.filter(
    x => !firstLine.includes(x),
  )

  if (remain.join(SEP).length < LIMIT) {

    return [
      firstLine.join(SEP),
      remain.join(SEP),
    ]
  }

  const secondLine = getLine(remain[0], tail(remain))

  return [
    firstLine.join(SEP),
    secondLine.join(SEP),
  ]
}
