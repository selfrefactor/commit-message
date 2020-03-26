const chalk = require('chalk')
const R = require('rambdax')

const figuresSelection = require('./figuresCollection')
const helpers = {}

helpers.cache = {}
helpers.patterns = {}

helpers.chalkFrontCounter = -1
helpers.chalkBackCounter = -1

helpers.chalkFront = [
  '#CC7450',
  '#548185',
  '#B37C25',
  '#5B9EB3',
]

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

helpers.getChalkFront = () => {
  const counterState = helpers.chalkFrontCounter + 1 === helpers.chalkFront.length ?
    0 :
    helpers.chalkFrontCounter + 1

  helpers.chalkFrontCounter = counterState

  return helpers.chalkFront[ counterState ]
}

helpers.getChalkBack = () => {
  const counterState = helpers.chalkBackCounter + 1 === helpers.chalkBack.length ?
    0 :
    helpers.chalkBackCounter + 1

  helpers.chalkBackCounter = counterState

  return helpers.chalkBack[ counterState ]
}

helpers.getTag = R.compose(
  R.ifElse(
    x => x.length === 1,
    x => R.compose(
      R.toUpper,
      R.replace('TAG=', ''),
      R.head
    )(x),
    R.F
  ),
  R.filter(R.startsWith('TAG='))
)

helpers.getIcon = () => R.compose(
  R.head,
  R.shuffle
)(figuresSelection)

helpers.icons = {
  info    : chalk.blue('   ℹ'),
  success : chalk.green('   ✔'),
  warning : chalk.yellow('   ⚠'),
  error   : chalk.red('   ✖'),
}

helpers.isMyMode = (mode, behaviourCollection) => R.filter(R.equals(mode))(behaviourCollection).length > 0

helpers.spinnerStartFlag = true

helpers.isMyModeAnyOf = (x, y) => {
  const result = R.compose(
    R.ifElse(
      xInstance => xInstance.length > 0,
      xInstance => R.head(xInstance),
      () => false
    ),
    R.filter(xInstance => y.includes(xInstance))
  )(x)

  return result
}

module.exports = helpers
