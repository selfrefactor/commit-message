const { glue } = require('rambdax')
const { execCommand } = require('./execCommand')
const { usePrettier } = require('./usePrettier')

async function lintTypescript(
  filePath, projectDir
){
  await usePrettier({filePath, withTypescript: true})

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

  console.log('New feature - lint Typescript file with ESLint')
  const eslintCommand = glue(`
  node 
  node_modules/eslint/bin/eslint.js
  --fix
  ${ filePath }
  `)

  await execCommand(eslintCommand, projectDir.path)
}

exports.lintTypescript = lintTypescript