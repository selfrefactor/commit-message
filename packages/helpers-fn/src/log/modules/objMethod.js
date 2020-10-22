const helpers = require('./helpers')
const R = require('rambdax')
const { print } = require('q-i')

const objMethod = (inputCollection, behaviourCollection) => {
  if (
    helpers.isMyModeAnyOf([ 'OBJ', 'OBJECT' ], behaviourCollection) === false
  ){
    return
  }

  const intermediateResult = R.filter(inputInstance => R.type(inputInstance) === 'Object')(inputCollection)

  if (intermediateResult.length === 0){
    return
  }
  R.map(print)(intermediateResult)

  return 'EXIT'
}

module.exports = objMethod
