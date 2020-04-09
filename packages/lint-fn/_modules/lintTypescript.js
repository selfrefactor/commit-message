const { spawnCommand } = require('./spawnCommand')
const { glue } = require('rambdax')
const { usePrettier } = require('./usePrettier')

async function lintTypescript(
  filePath, projectDir, prettierSpecialCase, cwdOverride
){
  await usePrettier({
    filePath,
    withTypescript : true,
    prettierSpecialCase,
    cwdOverride
  })

  const eslintCommand = glue(`
  node_modules/eslint/bin/eslint.js
  --fix
  ${ filePath }
  `).split(' ')
  
  await spawnCommand('node', eslintCommand, projectDir)
}

exports.lintTypescript = lintTypescript
