import { log } from 'log'
import { explanationOfTypes } from '../constants'

const MIN_LENGTH = 12
const SEPARATOR = ' - '

export function normalize(x: string): any {
  const [first, last] = x.split(SEPARATOR)
  const charToAdd = MIN_LENGTH - first.length
  const padding = Array(charToAdd).fill(' ').join('')

  return `${first}${padding}${SEPARATOR}${last}`
}

export function showExplanations(): void {
  let counter = 0
  // empty log to assosiate blue with tag=foo
  // as blue is too bright
  // ============================================
  log('', 'tag=foo')
  explanationOfTypes.map(explanation => {
    const tag = counter % 2 === 0 ?
      'tag=baz' :
      'tag=bar'

    log(
      normalize(explanation),
      tag,
    )
    counter++
  })
}
