import { outputFileSync as outputFileSyncModule } from 'fs-extra'
import { log } from 'log'

export function outputFileSync(filePath: string, content: string) {
  if (process.env.NODE_ENV === 'test') {
    log(`LOCATION ${filePath}`, 'info')
    log('sep')

    return console.log(content)
  }
  outputFileSyncModule(filePath, content)
}
