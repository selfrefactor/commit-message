const { clearLintLog } = require('./_modules/clearLintLog')
const { commandFactory, getLogCommand } = require('./_modules/commandFactory')
const { execCommand } = require('./_modules/execCommand')
const { getEslintPath } = require('./_modules/getEslintPath')
const { glue, delay } = require('rambdax')
const { isJest } = require('./is/jest')
const { isReact } = require('./is/react')
const { readFileSync } = require('fs')
const { readLintLog } = require('./_modules/readLintLog')
const { resolve } = require('path')
const { takeProjectDir } = require('./_modules/takeProjectDir')

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

const debugFlag = process.env.LINT_FN_DEBUG === 'ON'
const DIR = debugFlag ? __dirname : resolve(__dirname, '../../')

const exec = command => execCommand(command, DIR)

const getLintCommandFn = (command, fixFlag) => mode => {
  const willReturn = fixFlag ? command[ `lint${ mode }` ] : command[ `lint${ mode }NoFix` ]

  return willReturn
}

async function whenPrettier(filePath, withTypescript = false){
  await delay(500)
  const typescriptPart = withTypescript ? '' : '--parser typescript'

  const command = glue(`
  prettier 
  --no-semi
  --no-bracket-spacing
  --print-width 100
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

async function whenTypescript(
  filePath, projectDir, prettierFlag
){
  if (!projectDir.eslintFlag){
    const tsCommand = glue(`
      node 
      node_modules/tslint/bin/tslint
      --fix
      --config tslint.json
      --project tsconfig.json
      ${ filePath }
    `)
    if (prettierFlag) await whenPrettier(filePath, true)

    return execCommand(tsCommand, projectDir.path)
  }
  console.log('Will lint Typescript file with ESLint')
  const eslintCommand = glue(`
  node 
  node_modules/eslint/bin/eslint.js
  --fix
  ${ filePath }
  `)

  await execCommand(eslintCommand, projectDir.path)
}

async function lintFn({ prettierFlag, filePath, fixFlag, logFlag }){
  try {
    if (filePath.endsWith('.ts')){
      const projectDirectory = takeProjectDir(filePath)
      if (!projectDirectory.ok){
        return console.log('It seems this is not a Typescript project')
      }

      return whenTypescript(
        filePath, projectDirectory, prettierFlag
      )
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

    const getLintCommand = getLintCommandFn(command, fixFlag === undefined ? true : fixFlag)

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
    console.log(err, 'in lint.fn')
    throw err
  }
}

exports.lintFn = lintFn
