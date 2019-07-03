const { clearLintLog } = require('./_modules/clearLint'helpers')
const { commandFactory } = require('./_modules/commandFactory')
const { execCommand } = require('./_modules/execCommand')
const { getEslintPath } = require('./_modules/getEslintPath')
const { glue, test, delay, log } = require('rambdax')
const { isJest } = require('./is/jest')
const { isReact } = require('./is/react')
const { readFileSync } = require('fs')
const { readLintLog } = require('./_modules/readLint'helpers')
const { resolve } = require('path')
const { takeProjectDir } = require('./_modules/takeProjectDir')

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

// const debugFlag = process.env.NODE_ENV === 'DEBUG'
const debugFlag = false
const DIR = debugFlag ? __dirname : resolve(__dirname, '../../')

const exec = command => execCommand(command, DIR)

const getLintCommandFn = (command, fixFlag) => mode => {
  const willReturn = fixFlag ?
    command[ `lint${ mode }` ] :
    command[ `lint${ mode }NoFix` ]
  console.log({ mode })

  return willReturn
}

async function whenPrettier(filePath){
  await delay(500)
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

      log({
        tsCommand,
        dir,
      })

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

    if (logFlag !== false) console.log(logData)

    clearLintLog(command.logFilePath)

    return logData
  } catch (err){
    throw err
  }
}

exports.lintFn = lintFn
