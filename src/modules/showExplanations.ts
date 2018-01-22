import { log } from 'log'
import { explanationOfTypes } from '../constants'

const MIN_LENGTH = 12
const SEPARATOR = ' - '

export function normalize(x: string) {
  const [first, last] = x.split(SEPARATOR)
  const charToAdd = MIN_LENGTH - first.length
  const padding = Array(charToAdd).fill(' ').join('')

  return `${first}${padding}${SEPARATOR}${last}`
}

export function showExplanations(): void {
  explanationOfTypes.map(explanation => {
    log('sep')
    log(normalize(explanation), '')
  })
  log('sep')
  log('sep')
}
