import {
  join,
  split,
} from 'rambdax'

const shuffleArr = arr => {
  let counter = arr.length
  while (counter > 0){
    const index = Math.floor(Math.random() * counter)
    counter--
    const temp = arr[ counter ]
    arr[ counter ] = arr[ index ]
    arr[ index ] = temp
  }

  return arr
}

export function shuffle(str){
  return join(
    '',
    shuffleArr(
      split('', str)
    )
  )
}
