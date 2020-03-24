const { execCommand } = require('./execCommand')
const { glue, defaultTo } = require('rambdax')
const { resolve } = require('path')
const { getPrettierPath } = require('./usePrettier')

async function execPrettier({ filePath, injectOptions, prettierSpecialCase }){
  const cwd = resolve(__dirname, '../')
  const prettierPath = getPrettierPath(cwd, defaultTo('skip', prettierSpecialCase))
  
  const command = glue(`
    node
    ${ prettierPath }
    ${ injectOptions }
    --write
    ${ filePath }
  `)
  await execCommand(command, cwd)
}

exports.execPrettier = execPrettier
