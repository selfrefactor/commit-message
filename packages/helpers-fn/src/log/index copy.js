const boxMethod = require('./_modules/box')
const CFonts = require('cfonts')
const chalk = require('chalk')
const dayjs = require('dayjs')
const helpers = require('./modules/helpers')
const iconMethod = require('./modules/iconMethod')
const iconSetMethod = require('./modules/iconSetMethod')
const objMethod = require('./modules/objMethod')
const patternMethod = require('./modules/patternMethod')
const patternxMethod = require('./modules/patternxMethod')
const R = require('rambdax')
const separatorMethod = require('./modules/separatorMethod')

function bigLog(msg){
  CFonts.say(msg, {
    font          : 'chrome', // define the font face
    align         : 'left', // define text alignment
    colors        : [ '#77a', '#a7a', '#77a' ], // define all colors
    background    : 'white', // define the background color, you can also use `backgroundColor` here as key
    letterSpacing : 0, // define letter spacing
    lineHeight    : 0, // define the line height
    space         : false, // define if the output text should have empty lines on top and on the bottom
    maxLength     : '0', // define how many character can be on one line
  })
}

const logMethod = (inputCollection, behaviourCollection) => {
  if (behaviourCollection[ 0 ] === 'BIG'){
    return bigLog(inputCollection[ 0 ])
  }
  const rule = x =>
    R.both(xInstance => R.type(xInstance) === 'Object',
      xInstance => R.has('chalkRule')(xInstance))(x)

  let defaultChalkRule

  const tag = helpers.getTag(behaviourCollection)
  const isBackMode = helpers.isMyMode('BACK', behaviourCollection)

  if (isBackMode === false && tag === false){
    defaultChalkRule = chalk.hex(`#${ helpers.getChalkFront() }`)
  } else if (tag === false){
    const { background, color } = helpers.getChalkBack()

    defaultChalkRule = chalk.hex(`#${ color }`).bgHex(`#${ background }`)
  } else if (helpers.patterns[ tag ] === undefined){
    helpers.patterns[ tag ] =
      isBackMode === false ? helpers.getChalkFront() : helpers.getChalkBack()

    const settings = helpers.patterns[ tag ]

    defaultChalkRule =
      isBackMode === false ?
        chalk.hex(`#${ settings }`) :
        chalk.hex(`#${ settings.color }`).bgHex(`#${ settings.background }`)
  } else {
    const settings = helpers.patterns[ tag ]

    defaultChalkRule =
      isBackMode === false ?
        chalk.hex(`#${ settings }`) :
        chalk.hex(`#${ settings.color }`).bgHex(`#${ settings.background }`)
  }

  const internals = R.compose(R.ifElse(
    x => R.length(x) === 0,
    () => ({ chalkGenericRule : defaultChalkRule }),
    x => R.head(x).chalkRule
  ),
  R.filter(rule))(inputCollection)

  const filteredInputCollection = R.filter(x => R.not(rule(x)))(inputCollection)

  if (R.type(internals) === 'Object'){
    const objectsToLog = R.compose(R.filter(x => R.type(x) === 'Object'))(filteredInputCollection)

    const inputCollectionToLog = R.compose(R.filter(x => R.type(x) !== 'Object'))(filteredInputCollection)

    console.log(internals.chalkGenericRule(...inputCollectionToLog),
      ...objectsToLog)
  } else {
    console.log(internals, ...filteredInputCollection)
  }
}

const worker = (inputCollection, behaviourCollection) => {
  try {
    R.map(method => {
      const result = method(inputCollection, behaviourCollection)

      if (result === 'EXIT'){
        throw 'EXIT'
      }

      if (R.type(result) === 'Array'){
        inputCollection = Array.from(result)
      }
    })([
      patternxMethod,
      patternMethod,
      boxMethod,
      separatorMethod,
      objMethod,
      //above are the functions that might return 'EXIT'
      iconMethod,
      iconSetMethod,
      logMethod,
    ])
  } catch (err){
    if (err !== 'EXIT'){
      console.log(err)
    }
  }
}

function log(...args){
  const inputCollection = R.ifElse(
    x => R.type(R.last(x)) === 'String',
    x => x.length === 1 ? [ '' ] : R.init(x),
    R.identity
  )(args)

  const behaviourCollection = R.compose(
    R.map(R.toUpper),
    R.split('.'),
    R.ifElse(
      x => R.type(R.last(x)) === 'String',
      R.last,
      () => ''
    )
  )(args)

  worker(inputCollection, behaviourCollection)
}
const FORMAT = 'HH:mm:ss DD-MM'

/**
 * Should be equal to end user timezone offset
 * in order server time to be translated to user's timezone
 */
const UTC_LOCATION = 3
const UTC_LOCATION_OFFSET = UTC_LOCATION * 60

function getTime(){
  const date = new Date()
  const offset = Math.round((date.getTimezoneOffset() + UTC_LOCATION_OFFSET) / 60)

  if (offset === 0){
    return dayjs().format(FORMAT)
  } else if (offset > 0){
    return dayjs().add(offset, 'hour')
      .format(FORMAT)
  }

  return dayjs()
    .subtract(offset * -1, 'hour')
    .format(FORMAT)
}

function logx(...args){
  const time = getTime()
  log(
    `[${ time }]`, ...args, 'info'
  )
}

exports.log = log
exports.logx = logx
