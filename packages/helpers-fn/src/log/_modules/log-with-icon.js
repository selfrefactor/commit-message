const chalk = require('chalk')
const R = require('rambdax')
const {
  SUCCESS_COLOR,
  INFO_COLOR,
  WARNING_COLOR,
  ERROR_COLOR,
} = require('../constants')

const icons = {
  info    : chalk.blue('   ℹ'),
  success : chalk.green('   ✔'),
  warning : chalk.yellow('   ⚠'),
  error   : chalk.red('   ✖'),
}

function getTextColor(mode){
  return R.switcher(mode)
    .is('success', SUCCESS_COLOR)
    .is('info', INFO_COLOR)
    .is('warning', WARNING_COLOR)
    .is('error', ERROR_COLOR)
    .default(INFO_COLOR)
}

function logWithIcon(mode, toLog){
  const chalkRule = chalk.hex(`#${ getTextColor(mode) }`)
  console.log(icons[ mode ], chalkRule(String(toLog)))
}

exports.logWithIcon = logWithIcon
