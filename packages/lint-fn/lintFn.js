const { commandFactory } = require('./_modules/commandFactory')
const { spawn, debugFlag } = require('./_modules/spawnCommand')
const { execPrettier } = require('./_modules/execPrettier')
const { getEslintPath } = require('./_modules/getEslintPath')
const { glue } = require('rambdax')
const { lintTypescript } = require('./_modules/lintTypescript')
const { takeProjectDir } = require('./_modules/takeProjectDir')
const { usePrettier } = require('./_modules/usePrettier')

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

async function handleTypescript(filePath, prettierSpecialCase, cwdOverride){
  const { ok, eslintFlag, path } = takeProjectDir(filePath, cwdOverride)

  if (!ok){
    return console.log('This is not a Typescript project')
  }

  if (!eslintFlag){
    return console.log(glue(`
        TSLint is no longer
        supported! You need to switch
        to the new setup, which
        lints Typescript files
        using ESLint with 'tslint-fn' library
      `))
  }

  return lintTypescript(
    filePath, path, prettierSpecialCase, cwdOverride
  )
}

async function lintFn(filePath, prettierSpecialCase = 'local', cwdOverride = false){
  try {
    if (filePath.endsWith('.ts'))
      return handleTypescript(filePath, prettierSpecialCase, cwdOverride)

    const eslintPath = getEslintPath(debugFlag)

    if (!eslintPath) return console.log('No ESLint path found')

    await usePrettier({
      filePath,
      withTypescript : false,
      prettierSpecialCase,
    })

    const { lintDefault, lintJest } = commandFactory({
      eslintPath,
      src : filePath,
    })

    if (filePath.endsWith('.spec.js')){
      return spawn(lintJest.command, lintJest.inputs)
    }

    if (filePath.endsWith('.js')){
      return spawn(lintDefault.command, lintDefault.inputs)
    }

    return console.log(NO_AVAILABLE_LINTER)
  } catch (err){
    console.log(err, 'in lint.fn')
    return false
  }
}

exports.lintFn = lintFn
exports.execPrettier = execPrettier
