const { glue } = require('rambdax')
const { resolve } = require('path')

const commandFactory = ({ src, eslintPath }) => {
  const configFilePath = resolve(__dirname, '../config')
  const lintDefault = glue(`
    ${ eslintPath }
    ${ src }
    --fix
    --config 
    ${ configFilePath }/.eslintrcDefault.js
  `)
  const lintJest = glue(`
    ${ eslintPath }
    ${ src }
    --fix
    --config 
    ${ configFilePath }/.eslintrcJest.js
  `)

  return {
    lintDefault,
    lintJest,
  }
}

exports.commandFactory = commandFactory
