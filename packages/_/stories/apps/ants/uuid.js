import { random, range } from 'rambdax'

const charCodes = [
  ...range(49, 57),
  ...range(65, 90),
  ...range(97, 122),
]
const len = charCodes.length - 1
const loops = range(0, 8)

export function uuidAnt(){
  return loops.map(
    x => String.fromCharCode(
      charCodes[ random(0, len) ]
    )
  ).join('')
}
