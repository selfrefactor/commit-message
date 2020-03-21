const { writeFileSync } = require('fs')

exports.clearLintLog = logFilePath => writeFileSync(logFilePath, '')

