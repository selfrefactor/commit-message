const { clearLintLog } = require('./_modules/clearLintLog')
const { commandFactory } = require('./_modules/commandFactory')
const { execCommand } = require('./_modules/execCommand')
const { getEslintPath } = require('./_modules/getEslintPath')
const { glue, test, delay } = require('rambdax')
const { isJest } = require('./is/jest')
const { isReact } = require('./is/react')
const { readFileSync } = require('fs')
const { readLintLog } = require('./_modules/readLintLog')
const { resolve } = require('path')
const { takeProjectDir } = require('./_modules/takeProjectDir')

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

const debugFlag = false
const DIR = debugFlag ? __dirname : resolve(__dirname, '../../')

const exec = command => execCommand(command, DIR)

const getLintCommandFn = (command, fixFlag) => mode => {
  const willReturn = fixFlag ?
    command[ `lint${ mode }` ] :
    command[ `lint${ mode }NoFix` ]

  return willReturn
}

async function whenPrettier(filePath, withTypescript = false){
  await delay(500)
  const typescriptPart = withTypescript ? '' : '--parser typescript'

  const command = glue(`
  prettier 
  --no-semi
  --no-bracket-spacing
  --print-width 75
  --single-quote
  --no-bracket-spacing
  --jsx-single-quote
  --trailing-comma es5
  --write
  ${ typescriptPart }
  ${ filePath }
`)
  await exec(command)
}

async function lintFn({ prettierFlag, filePath, fixFlag, logFlag }){
  try {
    if (test(/\.tsx?$/, filePath)){
      const dir = takeProjectDir(filePath)
      const tsCommand = glue(`
        node 
        node_modules/tslint/bin/tslint
        --fix
        --config tslint.json
        --project tsconfig.json
        ${ filePath }
      `)
      if (prettierFlag){
        await whenPrettier(filePath, true)
      }

      return await execCommand(tsCommand, dir)
    }

    if (prettierFlag && fixFlag){
      await whenPrettier(filePath)
    }

    const eslintPath = getEslintPath(debugFlag)

    if (!eslintPath) return console.log('No ESLint path')

    const content = readFileSync(filePath)
    const command = commandFactory({
      eslintPath,
      src : filePath,
    })

    const getLintCommand = getLintCommandFn(
      command,
      fixFlag === undefined ? true : fixFlag
    )

    if (isJest(filePath)){
      const jestCommand = getLintCommand('Jest')
      await exec(jestCommand)
    } else if (isReact(filePath, content)){
      const reactCommand = getLintCommand('React')
      await exec(reactCommand)
    } else if (filePath.endsWith('.js')){
      const defaultCommand = getLintCommand('Default')

      await exec(defaultCommand)
    } else {
      return console.log(NO_AVAILABLE_LINTER)
    }

    const logData = await readLintLog(command.logFilePath)
    if (logFlag !== false && logData) console.log(logData)
    clearLintLog(command.logFilePath)

    return logData
  } catch (err){
    throw err
  }
}

exports.lintFn = lintFn
