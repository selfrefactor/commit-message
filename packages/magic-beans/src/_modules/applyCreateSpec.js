const { readFileSync } = require('fs')
const { remove, match } = require('rambdax')
const { specTemplate } = require('./specTemplate')

function applyCreateSpec(filePath, fileName){
  const content = readFileSync(filePath).toString()
  const lines = content.split('\n')

  let found
  let toReturn
  lines.forEach(line => {
    const [ matched ] = match(/export\s(async\s)?function\s[a-zA-Z]+/, line)
    if (matched && !found){
      found = true
      const [ startExportStatement ] = match(/export\s(async\s)?function/,
        matched)
      if (!startExportStatement) return

      const methodName = remove(startExportStatement, matched)
      toReturn = specTemplate({
        asyncFlag  : startExportStatement.includes('async'),
        methodName : methodName.trim(),
        fileName,
      })
    }
  })

  return toReturn
}

exports.applyCreateSpec = applyCreateSpec
