import { shuffle, range, sortBy } from 'rambdax'

export function nextBee(currentInstance){
  const wordsList = currentInstance.from.split(' ')
  const randomizedIndexes = shuffle(
    range(0, wordsList.length)
  )
  const wordsRaw = wordsList.map((x, i) => ({
    originalIndex : i,
    showIndex     : randomizedIndexes[ i ],
    word          : x,
    wrong         : false,
    hide          : false,
  }))

  const words = sortBy(
    x => x.showIndex,
    wordsRaw
  )

  return {
    answer      : wordsList,
    translation : currentInstance.to,
    words,
  }
}
