const {readFile} = require('fs')

exports.readLintLog = logFilePath => new Promise(resolve => {
  readFile(logFilePath, 'utf8', (__, data) => {
    resolve(data)
  })
})
