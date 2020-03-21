const { execCommand } = require('./execCommand')
const { glue } = require('rambdax')
const { usePrettier } = require('./usePrettier')

async function lintTypescript(filePath, projectDir){
  await usePrettier({
    filePath,
    withTypescript : true,
  })

  if (!projectDir.eslintFlag){
    const tsCommand = glue(`
      node 
      node_modules/tslint/bin/tslint
      --fix
      --config tslint.json
      --project tsconfig.json
      ${ filePath }
    `)

    return execCommand(tsCommand, projectDir.path)
  }

  const eslintCommand = glue(`
  node 
  node_modules/eslint/bin/eslint.js
  --fix
  ${ filePath }
  `)

  await execCommand(eslintCommand, projectDir.path)
}

exports.lintTypescript = lintTypescript
