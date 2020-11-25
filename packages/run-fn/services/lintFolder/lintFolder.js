const R = require('rambdax')
const { CWD } = require('../../constants')
const { lintFn } = require('lint-fn')
const { log, scanFolder } = require('helpers-fn')

const allowedFileEndings = [ '.ts', '.js' ]
const MAX_LIMIT = 700

const excludeFn = x =>
  R.anyTrue(
    x.includes('node_modules'),
    x.includes('/dist'),
    x.includes('/.git'),
    x.includes('/coverage')
  )

const filterAllowed = x =>
  R.any(fileEnding => x.endsWith(fileEnding), allowedFileEndings)

const HOW_MANY_THREADS = 10

async function lintFolder({ fastFlag }){
  const allFiles = await scanFolder({
    folder   : CWD,
    excludeFn,
    filterFn : filterAllowed,
  })
  if (allFiles.length > MAX_LIMIT){
    log(`Too many files '${ allFiles.length }' in '${ CWD }'`,
      'error')
    await R.delay(5000)
  }

  console.time('lintFolder')
  const lint = async filePath => lintFn(filePath, 'local')

  if (fastFlag){
    await R.mapAsyncLimit(
      lint, HOW_MANY_THREADS, allFiles
    )
  } else {
    await R.mapAsync(lint, allFiles)
  }

  console.timeEnd('lintFolder')
}

exports.lintFolder = lintFolder
