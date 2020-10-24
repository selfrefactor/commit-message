const gradient = require('gradient-string')
const R = require('rambdax')

function separator(mode){
  const char = mode.endsWith('x') ? '🀰' : '_'

  const longLine = R.join('', R.repeat(char, 55))

  console.log(gradient.mind(longLine))
}

exports.separator = separator
