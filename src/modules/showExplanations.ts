import { log } from 'log'
import { explanationOfTypes } from '../constants'

export function showExplanations(): void {
  explanationOfTypes.map(explanation => {
    log('sep')
    log(explanation, '')
  })
  log('sep')
  log('sep')
}
