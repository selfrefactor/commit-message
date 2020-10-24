const R = require('rambdax')
const { bigLog } = require('./_modules/big-log')
const { box } = require('./_modules/box')

const POSSIBLE_MODES = [
  'obj',
  'sep',
  'sepx',
  'big',
  'box',
  'back',
  'back.foo',
  'back.bar',
  'back.baz',
  'foo',
  'bar',
  'baz',
]

function logFn(...inputs){
  const [ toLog, mode, additional ] = inputs
  if (additional !== undefined){
    return console.log(...arguments,
      'helpers-fn.log doesn\'t support multiple inputs')
  }

  if (R.excludes(mode, POSSIBLE_MODES)){
    return console.log(...arguments, 'unrecognized helpers-fn.log mode')
  }

  if (mode === 'big') return bigLog(toLog)
  if (mode === 'box') return box(toLog)
}

exports.log = logFn
