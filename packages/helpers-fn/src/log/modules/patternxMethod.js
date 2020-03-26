const helpers = require('./helpers')
const R = require('rambdax')

const patternxMethod = (inputCollection, behaviourCollection) => {
  if (helpers.isMyMode('PATTERNX', behaviourCollection) === false) {
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
    R.map(prop => [ `${ R.type(logData[ prop ]) } :: ${ prop }`, logData[ prop ] ])
  )(Object.keys(logData))

  console.log(...y)

  return 'EXIT'
}

module.exports = patternxMethod
