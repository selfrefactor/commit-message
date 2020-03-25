const { spawnCommand } = require('./spawnCommand')
const { glue, defaultTo } = require('rambdax')
const { resolve } = require('path')
const { getPrettierPath } = require('./usePrettier')

async function execPrettier({ filePath, injectOptions, prettierSpecialCase }){
  const cwd = resolve(__dirname, '../')
  const prettierPath = getPrettierPath(cwd, defaultTo('skip', prettierSpecialCase))
  
  const command = glue(`
    ${ prettierPath }
    ${ injectOptions }
    --write
    ${ filePath }
  `).split(' ')
  await spawnCommand('node', command, cwd)
}

exports.execPrettier = execPrettier
