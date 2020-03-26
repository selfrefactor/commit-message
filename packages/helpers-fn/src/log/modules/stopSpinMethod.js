const helpers = require('./helpers')
const R = require('rambdax')

const stopSpinMethod = (inputCollection, behaviourCollection) => {
  if (helpers.isMyMode('STOPSPIN', behaviourCollection) === false) {
    return
  }

  if (
    helpers.spinnerStartFlag === false &&
    (helpers.spinner !== null || helpers.spinner !== undefined)
  ) {
    helpers.spinner.stop()
    helpers.spinner.clear()
    helpers.spinner = null
    helpers.spinnerStartFlag = !helpers.spinnerStartFlag
  }
}

module.exports = stopSpinMethod
