const gradient = require('gradient-string')
const helpers = require('./helpers')
const R = require('rambdax')

const extendModes = [ 'SEPX', 'SEPARATORX' ]

const separatorMethod = (inputCollection, behaviourCollection) => {
  if (
    helpers.isMyModeAnyOf([ 'SEPX', 'SEPARATORX', 'SEP', 'SEPARATOR' ],
      behaviourCollection) === false
  ){
    return
  }
  const char = helpers.isMyModeAnyOf(extendModes, behaviourCollection) ?
    '🀰' :
    '_'

  const longLine = R.join('', R.repeat(char, 55))

  console.log(gradient.mind(longLine))

  return 'EXIT'
}

module.exports = separatorMethod
