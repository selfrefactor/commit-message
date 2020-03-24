const { existsSync, unlinkSync } = require('fs')
const { getDirBee } = require('./init')
const { glue } = require('rambdax')
const { snakeCase } = require('string-fn')

function removeBee(id, label){
  const filePath = glue(`${ getDirBee() }
    ${ snakeCase(id, true) }
    ${ snakeCase(label, true) }.json`,
  '/')

  if (!existsSync(filePath)) return false

  unlinkSync(filePath)

  return true
}

exports.removeBee = removeBee
