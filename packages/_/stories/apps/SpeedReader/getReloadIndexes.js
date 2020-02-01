import { rangeBy } from '../../libs/rangeBy.js'

export function getReloadIndexes(len){
  const step = Math.floor(len / 100)

  return rangeBy(step, len - step - step, step)
}
