const boxen = require('boxen')
const helpers = require('./helpers')
const R = require('rambdax')

const boxMethod = (inputCollection, behaviourCollection) => {
  if (!helpers.isMyMode('BOX', behaviourCollection)) return

  if (R.type(R.head(inputCollection)) !== 'String') return 'EXIT'

  console.log(boxen(R.head(inputCollection), {
    padding     : 1,
    margin      : 0,
    borderStyle : 'round',
  }))

  return 'EXIT'
}

module.exports = boxMethod
