const R = require('rambdax')
const { bigLog } = require('./_modules/big-log')
const { box } = require('./_modules/box')
const { logObject } = require('./_modules/log-object')
const { separator } = require('./_modules/separator')
const { SEPARATORS, POSSIBLE_MODES } = require('./constants')

function logFn(...inputs){
  const [ toLog, mode, additional ] = inputs
  if (additional !== undefined){
    return console.log(...arguments,
      'helpers-fn.log doesn\'t support multiple inputs')
  }

  if (SEPARATORS.includes(toLog)) return separator(toLog)

  if (R.excludes(mode, POSSIBLE_MODES)){
    return console.log(...arguments, 'unrecognized helpers-fn.log mode')
  }

  if (mode === 'big') return bigLog(toLog)
  if (mode === 'box') return box(toLog)
  if (mode === 'obj') return logObject(toLog)
}

exports.log = logFn
