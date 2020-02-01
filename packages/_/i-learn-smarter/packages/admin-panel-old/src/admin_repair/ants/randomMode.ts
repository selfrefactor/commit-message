import { classnames } from 'classnames'

export function randomModeAnt(randomFlag){
  return classnames({
    fa: true,
    'fa-2x': true,
    'fa-exchange': !randomFlag,
    'fa-random': randomFlag,
  })
}
