const { commandFactory } = require('./_modules/commandFactory')
const { exec, debugFlag } = require('./_modules/execCommand')
const { getEslintPath } = require('./_modules/getEslintPath')
const { usePrettier } = require('./_modules/usePrettier')
const { lintTypescript } = require('./_modules/lintTypescript')
const { takeProjectDir } = require('./_modules/takeProjectDir')

const NO_AVAILABLE_LINTER = 'Filepath has no corresponding linter'

async function lintFn(filePath){
  try {
    if (filePath.endsWith('.ts')){
      const projectDirectory = takeProjectDir(filePath)
      if (!projectDirectory.ok){
        return console.log('This is not a Typescript project')
      }

      return lintTypescript(
        filePath, projectDirectory
      )
    }

    const eslintPath = getEslintPath(debugFlag)
    
    if (!eslintPath) return console.log('No ESLint path found')

    await usePrettier({filePath, withTypescript: false})

    const {lintDefault, lintJest} = commandFactory({
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
