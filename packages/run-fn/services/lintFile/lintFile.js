const { CWD } = require('../../constants')
const { lintFn } = require('lint-fn')

async function lintFile(filePathRaw){
  const filePath = `${ CWD }/${ filePathRaw }`

  await lintFn(filePath, 'local')
}

exports.lintFile = lintFile
