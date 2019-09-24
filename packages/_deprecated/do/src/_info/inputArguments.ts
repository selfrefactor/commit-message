import { log } from 'helpers'

export function inputArgumentsInfo() {
  const info = `Leave empty if no input
If arguments are at least three, input will be an object`

  log(info, 'icon.tag=foo')
}
