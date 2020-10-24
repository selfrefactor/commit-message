const R = require('rambdax')
const { print } = require('q-i')

function logObject(input){
  if (R.type(input) !== 'Object') return console.log(input)

  print(input)
}

exports.logObject = logObject
