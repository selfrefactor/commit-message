const { lintFn } = require('lint-fn')

async function lintFile(filePathRaw){
  const cwd =
    process.env.RUN_FN_CWD === undefined ?
      process.cwd() :
      process.env.RUN_FN_CWD

  const filePath = `${ cwd }/${ filePathRaw }`

  await lintFn(filePath, 'local')
}

exports.lintFile = lintFile
