const { execCommand } = require('./execCommand')
const { glue } = require('rambdax')
const { usePrettier } = require('./usePrettier')

async function lintTypescript(filePath, projectDir){
  await usePrettier({
    filePath,
    withTypescript : true,
  })

  const eslintCommand = glue(`
  node 
  node_modules/eslint/bin/eslint.js
  --fix
  ${ filePath }
  `)

  await execCommand(eslintCommand, projectDir)
}

exports.lintTypescript = lintTypescript
