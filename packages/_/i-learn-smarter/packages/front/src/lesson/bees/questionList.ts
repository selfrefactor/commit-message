import { remove, replace, shuffle } from 'rambdax'

const WAITING = 'WAITING'
const ACTIVE = 'ACTIVE'
const START_CHAR = '['
const END_CHAR = ']'

export function wordListAnt(input: string){
  const [first] = input.split(START_CHAR)

  let status = WAITING
  const collected = []
  let holder = ''
  const chars = [...input]
  chars.forEach(char => {
    if (char === START_CHAR) return status = ACTIVE
    if (char === END_CHAR){
      status = WAITING
      collected.push(holder)

      return holder = ''
    }
    if (status === WAITING) return

    holder += char
  })
  return [first, ...collected]
}

export function parseInputWhenComplex(input: string){
  const cleaner = replace(/\./g, ' ', input)

  return remove(
    ['[', ']'],
    cleaner,
  )
}

export function questionListBee(
  inputRaw: string,
  isComplexExample = false,
){
  const input = isComplexExample ?
    parseInputWhenComplex(inputRaw) :
    inputRaw

  const [correct, ...rest] = wordListAnt(input)
  if (rest.length === 1){
    const rawList = [
      {correct: true, text: correct, status: 'ACTIVE'},
      {correct: false, text: rest[0], status: 'ACTIVE'},
    ]
    const randomized = shuffle(rawList)

    return [
      {correct: false, text: '_', status: 'ACTIVE'},
      ...randomized,
    ]
  }
  const [second, third] = shuffle(rest)

  const list = [
    {correct: true, text: correct, status: 'ACTIVE'},
    {correct: false, text: second, status: 'ACTIVE'},
    {correct: false, text: third, status: 'ACTIVE'},
  ]

  return shuffle(list)
}
