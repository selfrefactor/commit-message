const { colorLog, PADDING, colorLogModes } = require('./colorLog')
const { defaultTo, random, isType, map, remove } = require('rambdax')

// If object, it logs with `console.group`
// otherwise fallback to `colorLog`
// ============================================
function log(label, input, logIndex){
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

exports.log = log
