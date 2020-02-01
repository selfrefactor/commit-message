import { colorLog, PADDING, colorLogModes } from './colorLog'
import { defaultTo, random, isType, map, remove, getter } from 'rambdax'

// If object, it logs with `console.group`
// otherwise fallback to `colorLog`
// ============================================
export function log(label, input, logIndex){
  const options = getter('REDUXED_OPTIONS')
  if (options && options.logFlag === false) return

  if (!isType('Object', input)){
    return colorLog(
      defaultTo(random(7, 10), logIndex),
      label,
      input
    )
  }
  const logStyle = remove(
    PADDING,
    colorLogModes[
      defaultTo(random(4, 6), logIndex)
    ]
  )

  console.group(
    `%c ${ label.toLowerCase() }`,
    logStyle,
  )
  map(
    (x, prop) => console.log(`${ prop }: `, x),
    input
  )
  console.groupEnd()
}
