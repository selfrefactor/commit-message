const chalk = require('chalk')
const R = require('rambdax')

const CHALK_OPTIONS = [
  {
    front : '#fafafa',
    back  : '#B37C25',
  },
  {
    front : '#332222',
    back  : '#fafafa',
  },
  {
    front : '#fafafa',
    back  : '#541185',
  },
  {
    front : '#5a11aa',
    back  : '#cacaca',
  },
]

function getChalkOptions(mode){
  const modeIndex = R.switcher(mode)
    .is('back.foo', 0)
    .is('back.bar', 1)
    .is('back.baz', 2)
    .is('back.random', R.random(0, CHALK_OPTIONS.length - 1))
    .default(0)

  return CHALK_OPTIONS[ modeIndex ]
}

function colorizedBackground(mode, toLog){
  const { front, back } = getChalkOptions(mode)
  const chalkRule = chalk.hex(`#${ front }`).bgHex(`#${ back }`)

  console.log(chalkRule(`  ${ String(toLog) }  `))
}

exports.colorizedBackground = colorizedBackground
