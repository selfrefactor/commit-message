import { log } from 'log'
import { explanationOfTypes } from '../constants'

export function showExplanations(): void {
  explanationOfTypes.map(x => {
    log('sep')
    log(x, '')
  })
  log('sep')
}
