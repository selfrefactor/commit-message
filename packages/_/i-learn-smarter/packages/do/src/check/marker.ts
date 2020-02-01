import { existsSync, readFileSync } from 'fs'
import { log } from 'log'
import { takeLast } from 'rambdax'

function shortenPath(filePath: string): string {

  // tslint:disable-next-line
  return takeLast(3, filePath.split('/')).join('/')
}

export function markerCheck(input: CheckFile): boolean {
  if (!existsSync(input.location)) {
    const message = `Missing file '${input.location}'`

    log(message, 'error')

    return false
  }

  let flag = true
  const content = readFileSync(input.location)
  const filePath = shortenPath(input.location)

  input.markers.forEach(singleMarker => {
    if (!content.includes(singleMarker)) {
      flag = false
      const message = `Missing marker '${singleMarker}' in ${filePath}`

      log(message, 'error')
    }
  })

  if (flag) {
    log(`Initial check '${filePath}'`, 'success')
  }

  return true
}
