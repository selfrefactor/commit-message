const helpers = require('./helpers')
const R = require('rambdax')

const patternMethod = (inputCollection, behaviourCollection) => {
  if (helpers.isMyMode('PATTERN', behaviourCollection) === false) {
    return
  }
  const logData = R.head(inputCollection)

  if (R.type(logData) !== 'Object') {
    return
  }

  const y = R.compose(
    R.init,
    R.flatten,
    R.map(([ initPart, x ]) => {
      if (R.type(x) === 'Object') {
        return [ initPart, ' :: ', x, ' | ' ]
      }

      return [ `${ initPart } :: ${ x }`, ' | ' ]
    }),
    R.map(prop => [ prop, logData[ prop ] ])
  )(Object.keys(logData))

  console.log(...y)

  return 'EXIT'
}

module.exports = patternMethod
