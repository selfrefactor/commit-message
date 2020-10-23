import { switcher, toDecimal } from 'rambdax'

const SECONDS = 'seconds'
const MINUTES = 'minutes'
const HOURS = 'hours'
const DAYS = 'days'

function findLargestUnit(seconds){
  return switcher(seconds)
    .is(x => x < 60, {
      label : SECONDS,
      scale : 1,
    })
    .is(x => x < 3600, {
      label : MINUTES,
      scale : 60,
    })
    .is(x => x < 3600 * 24 * 7, {
      label : HOURS,
      scale : 3600,
    })
    .default({
      label : DAYS,
      scale : 3600 * 24,
    })
}

export function msToText(msInput){
  if (typeof msInput !== 'number'){
    throw new Error(`${ msInput } is not a number`)
  }

  const seconds = toDecimal(msInput / 1000, 0)
  const { label, scale } = findLargestUnit(seconds)

  return `${ toDecimal(seconds / scale, 1) } ${ label }`
}
