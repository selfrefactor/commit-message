import { range, head, shuffle} from 'rambdax'

const charCodes = [
  ...range(49,57),
  ...range(65,90),
  ...range(97,122),
]

const loops = range(0,8)

export function uuidAnt(){
  return loops.map(
    x => String.fromCharCode(head(shuffle(charCodes)))
  ).join('')
}