const { glue } = require('rambdax')
const { resolve } = require('path')

const commandFactory = ({ src, eslintPath }) => {
  const configFilePath = resolve(__dirname, '../config')
  const lintDefault = {command: eslintPath, inputs: glue(`
    ${ src }
    --fix
    --config 
    ${ configFilePath }/.eslintrcDefault.js
  `).split(' ')}
  const lintJest = {command: eslintPath, inputs: glue(`
    ${ src }
    --fix
    --config 
    ${ configFilePath }/.eslintrcJest.js
  `).split(' ')}

  return {
    lintDefault,
    lintJest,
  }
}

exports.commandFactory = commandFactory
