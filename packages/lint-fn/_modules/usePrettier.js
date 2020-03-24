const { glue } = require('rambdax')
const { resolve } = require('path')
const { existsSync } = require('fs')
const { execCommand } = require('./execCommand')

const PRETTIER_PATH_BASE = 'node_modules/prettier/bin-prettier.js'

const getPrettierPath = (cwd) => {
  if(existsSync(
    `${cwd}/${PRETTIER_PATH_BASE}`
  )) return `${cwd}/${PRETTIER_PATH_BASE}`
  const otherPossiblePath = resolve(
    __dirname,
    `../../../${PRETTIER_PATH_BASE}`
  )

  if(existsSync(otherPossiblePath)) return otherPossiblePath

  console.log(otherPossiblePath, `${cwd}/${PRETTIER_PATH_BASE}`)
  throw new Error('Prettier was not found "lint.fn"')
}

async function usePrettier({ filePath, withTypescript }){
  const cwd = resolve(__dirname, '../')
  const prettierPath = getPrettierPath(cwd)
  
  /*
    Other option is `--parser babel-ts`
  */
  const typescriptPart = withTypescript ? '' : '--parser typescript'

  const command = glue(`
  node
  ${prettierPath}
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
