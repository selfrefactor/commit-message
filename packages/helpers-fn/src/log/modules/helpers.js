const chalk = require('chalk')
const R = require('rambdax')

const figuresSelection = require('./figuresCollection')
const helpers = {}

helpers.cache = {}
helpers.patterns = {}

helpers.chalkFrontCounter = -1
helpers.chalkBackCounter = -1

helpers.chalkFront = [ '#CC7450', '#548185', '#B37C25', '#5B9EB3' ]

helpers.chalkBack = [
  {
    color      : 'fafafa',
    background : 'B37C25',
  },
  {
    color      : 'fafafa',
    background : '548185',
  },
]

helpers.icons = {
  info    : chalk.blue('   ℹ'),
  success : chalk.green('   ✔'),
  warning : chalk.yellow('   ⚠'),
  error   : chalk.red('   ✖'),
}

helpers.isMyMode = (mode, behaviourCollection) =>
  R.filter(R.equals(mode))(behaviourCollection).length > 0

helpers.isMyModeAnyOf = (x, y) => {
  const result = R.compose(R.ifElse(
    xInstance => xInstance.length > 0,
    xInstance => R.head(xInstance),
    () => false
  ),
  R.filter(xInstance => y.includes(xInstance)))(x)

  return result
}

module.exports = helpers
