const { execCommand } = require('./execCommand')
const { glue } = require('rambdax')
const { resolve } = require('path')

const PRETTIER_PATH = 'node_modules/prettier/bin-prettier.js'

async function execPrettier({ filePath, injectOptions }){
  const cwd = resolve(__dirname, '../')
  const command = glue(`
    node
    ${ PRETTIER_PATH }
    ${ injectOptions }
    --write
    ${ filePath }
  `)
  await execCommand(command, cwd)
}

exports.execPrettier = execPrettier
