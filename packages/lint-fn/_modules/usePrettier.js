const { spawnCommand } = require('./spawnCommand')
const { glue, defaultTo } = require('rambdax')
const { resolve } = require('path')
const { existsSync } = require('fs')

const PRETTIER_PATH_BASE = 'node_modules/prettier/bin-prettier.js'

const getPrettierPath = (cwd, prettierSpecialCase) => {
  if (prettierSpecialCase === 'local') return `${ cwd }/${ PRETTIER_PATH_BASE }`

  const otherPossiblePath = resolve(__dirname,
    `../../../${ PRETTIER_PATH_BASE }`)
  if (prettierSpecialCase === 'outer') return otherPossiblePath

  if (existsSync(`${ cwd }/${ PRETTIER_PATH_BASE }`)){
    console.log('You should use \'prettierSpecialCase = local\'')

    return `${ cwd }/${ PRETTIER_PATH_BASE }`
  }

  if (existsSync(otherPossiblePath)){
    console.log('You should use \'prettierSpecialCase = outer\'')

    return otherPossiblePath
  }

  throw new Error('Prettier was not found "lint.fn"')
}

async function usePrettier({ filePath, withTypescript, prettierSpecialCase, cwdOverride }){
  const cwdDefault = resolve(__dirname, '../')
  const cwd =  defaultTo(cwdDefault, cwdOverride) 
  const prettierPath = getPrettierPath(cwdDefault, prettierSpecialCase)

  /*
    Other option is `--parser babel-ts`
  */
  const typescriptPart = withTypescript ? '' : '--parser typescript'

  const command = glue(`
  ${ prettierPath }
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
`).split(' ')
  await spawnCommand("node", command, cwd)
}

exports.usePrettier = usePrettier
exports.getPrettierPath = getPrettierPath