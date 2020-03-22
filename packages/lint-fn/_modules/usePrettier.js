const { glue } = require('rambdax')
const { resolve } = require('path')
const { execCommand } = require('./execCommand')

const PRETTIER_PATH = 'node_modules/prettier/bin-prettier.js'

async function usePrettier({ filePath, withTypescript }){
  const cwd = resolve(__dirname, '../')
  /*
    Other option is `--parser babel-ts`
  */
  const typescriptPart = withTypescript ? '' : '--parser typescript'

  const command = glue(`
  node
  ${PRETTIER_PATH}
  --no-semi
  --no-bracket-spacing
  --print-width 77
  --single-quote
  --no-bracket-spacing
  --trailing-comma es5
  --arrow-parens avoid
  --write
  ${ typescriptPart }
  ${ filePath }
`)
  await execCommand(command, cwd)
}

exports.usePrettier = usePrettier
