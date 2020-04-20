const {
  translate,
  translateToBulgarian,
  translateToGerman,
} = require('./exported/translate')
const { createBenchmark } = require('./exported/createBenchmark.js')
const { exec, execSafe, spawn } = require('./exported/exec')
const { log } = require('./log/index')
const { runTests } = require('./exported/runTests')

exports.createBenchmark = createBenchmark
exports.runTests = runTests
exports.translate = translate
exports.translateToBulgarian = translateToBulgarian
exports.translateToGerman = translateToGerman
exports.exec = exec
exports.execSafe = execSafe
exports.spawn = spawn
exports.log = log
