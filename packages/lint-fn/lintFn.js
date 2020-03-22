const { commandFactory } = require('./_modules/commandFactory')
const { exec, debugFlag } = require('./_modules/execCommand')
const { getEslintPath } = require('./_modules/getEslintPath')
const { lintTypescript } = require('./_modules/lintTypescript')
const { takeProjectDir } = require('./_modules/takeProjectDir')
const { glue } = require('rambdax')
const { usePrettier } = require('./_modules/usePrettier')
const { execPrettier } = require('./_modules/execPrettier')

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

async function handleTypescript(filePath){
  const {ok,eslintFlag,path} = takeProjectDir(filePath)
  if (!ok){
    return console.log('This is not a Typescript project')
  }

  if (!eslintFlag){
    return console.log(
      glue(`
        TSLint is no longer
        supported! You need to switch
        to the new setup, which
        lints Typescript files
        using ESLint with 'tslint-fn' library
      `)
    )
  }

  return lintTypescript(filePath, path)
}

async function lintFn(filePath){
  try {
    if (filePath.endsWith('.ts')) return handleTypescript(filePath)

    const eslintPath = getEslintPath(debugFlag)

    if (!eslintPath) return console.log('No ESLint path found')

    await usePrettier({
      filePath,
      withTypescript : false,
    })

    const { lintDefault, lintJest } = commandFactory({
      eslintPath,
      src : filePath,
    })

    if (filePath.endsWith('.spec.js')){
      return exec(lintJest)
    }

    if (filePath.endsWith('.js')){
      return exec(lintDefault)
    }

    return console.log(NO_AVAILABLE_LINTER)
  } catch (err){
    console.log(err, 'in lint.fn')
    throw err
  }
}

exports.lintFn = lintFn
exports.execPrettier = execPrettier