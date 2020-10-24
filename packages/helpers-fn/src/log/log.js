const R = require('rambdax')
const {
  SEPARATORS,
  POSSIBLE_MODES,
  ICON_MODES,
  TEXT_MODES,
  BACK_MODES,
} = require('./constants')
const { bigLog } = require('./_modules/big-log')
const { box } = require('./_modules/box')
const { colorizedBackground } = require('./_modules/colorized-background')
const { colorizedText } = require('./_modules/colorized-text')
const { logObject } = require('./_modules/log-object')
const { logWithIcon } = require('./_modules/log-with-icon')
const { separator } = require('./_modules/separator')

function logFn(...inputs){
  const [ toLog, mode, additional ] = inputs
  if (additional !== undefined){
    return console.log(...arguments,
      'helpers-fn.log doesn\'t support multiple inputs')
  }

  if (SEPARATORS.includes(toLog)) return separator(toLog)

  if (R.excludes(mode, POSSIBLE_MODES)){
    throw new Error('mode is not declared')
  }

  if (mode === 'big') return bigLog(toLog)
  if (mode === 'box') return box(toLog)
  if (mode === 'obj') return logObject(toLog)
  if (TEXT_MODES.includes(mode)) return colorizedText(mode, toLog)
  if (BACK_MODES.includes(mode)) return colorizedBackground(mode, toLog)
  if (ICON_MODES.includes(mode)) return logWithIcon(mode, toLog)

  throw new Error('mode is declared but its handling is missing')
}

exports.log = logFn
