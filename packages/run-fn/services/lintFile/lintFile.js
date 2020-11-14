const { lintFn } = require('lint-fn')
const { CWD } = require('../../constants')

async function lintFile(filePathRaw){
  const filePath = `${ CWD }/${ filePathRaw }`

  await lintFn(filePath, 'local')
}

exports.lintFile = lintFile
