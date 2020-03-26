const helpers = require('./helpers')
const R = require('rambdax')

const iconSetMethod = (inputCollection, behaviourCollection) => {
  const exists = helpers.isMyModeAnyOf(
    [ 'SUCCESS', 'WARNING', 'INFO', 'ERROR' ],
    behaviourCollection
  )

  if (
    exists === false
  ) {
    return
  }

  return R.prepend({ chalkRule : helpers.icons[ R.toLower(exists) ] })(inputCollection)
}

module.exports = iconSetMethod
