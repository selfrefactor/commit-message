const { execCommand } = require('./execCommand')
const { glue } = require('rambdax')
const { usePrettier } = require('./usePrettier')

async function lintTypescript(
  filePath, projectDir, prettierSpecialCase
){
  await usePrettier({
    filePath,
    withTypescript : true,
    prettierSpecialCase,
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
