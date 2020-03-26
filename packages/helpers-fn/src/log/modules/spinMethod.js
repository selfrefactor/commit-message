const helpers = require('./helpers')
const ora = require('ora')
const R = require('rambdax')

const spinMethod = (inputCollection, behaviourCollection) => {
  if (helpers.isMyMode('SPIN', behaviourCollection) === false) {
    return
  }
  if (
    helpers.spinnerStartFlag === true
  ) {
    helpers.spinner = ora().start()
    helpers.spinner.start()
    helpers.spinnerStartFlag = !helpers.spinnerStartFlag
  }
}

module.exports = spinMethod
