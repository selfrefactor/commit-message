import { dropLast, trim } from 'rambdax'
import { splitPerLine } from './splitPerLine'

const BUFFER = 3

export function fitWithinLines({
  limit,
  perLine = 30,
  text,
}){
  let counter = perLine
  const len = text.length
  let answer

  while (counter < len){
    counter++
    const maybeAnswer = splitPerLine({
      text,
      perLine : counter,
    })
    if (maybeAnswer.length <= limit){
      answer = maybeAnswer
      counter = len
    } else if (counter + BUFFER === len){

    }
  }

  if (!answer){
    const partial = trim(dropLast(BUFFER, text))
    if (partial.length < BUFFER * 2){
      throw new Error(`such text cannot fit within ${ limit } lines`)
    }

    return fitWithinLines({
      text : partial,
      perLine,
      limit,
    })
  }

  return answer
}
