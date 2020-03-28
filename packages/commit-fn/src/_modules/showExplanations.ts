import {log} from 'helpers-fn'
import {explanationOfTypes} from '../constants'

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

  explanationOfTypes.forEach(explanation => {
    const tag = counter % 2 === 0 ? 'tag=foo' : 'tag=bar'

    log(normalize(explanation), tag)
    counter++
  })
}
