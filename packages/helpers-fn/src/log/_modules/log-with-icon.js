const chalk = require('chalk')
const R = require('rambdax')
const { chalkFront } = require('../constants')

function getChalkFront(mode){
  const modeIndex = R.switcher(mode)
    .is('foo', 0)
    .is('bar', 1)
    .is('baz', 2)
    .is('random', R.random(0, chalkFront.length - 1))
    .default(0)

  return chalkFront[ modeIndex ]
}

function colorizedText(mode, toLog){
  const chalkRule = chalk.hex(`#${ getChalkFront(mode) }`)
  console.log(chalkRule(toLog))
}

exports.colorizedText = colorizedText
