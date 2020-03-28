const klawSync = require('klaw-sync')
const path = require('path')
const { pluck, none } = require('rambdax')

function readFolders({
  allowedExtensions,
  folderPath,
  max,
  min,
  skipPatterns,
}){
  const filterFn = item => {
    const passSkipPattern = none(x => item.path.includes(x))(skipPatterns)

    if (!passSkipPattern) return false

    const extension = path.extname(item.path)
    const okExtension = allowedExtensions.includes(extension)
    if (!okExtension) return false

    return item.stats.size > min && item.stats.size < max
  }

  const files = klawSync(folderPath, {
    filter      : filterFn,
    traverseAll : true,
  })

  return pluck('path', files)
}

exports.readFolders = readFolders
