const {
  translate,
  translateToBulgarian,
  translateToGerman,
} = require('./exported/translate')
const { createBenchmark } = require('./exported/create-benchmark')
const { createComplexBenchmark } = require('./exported/create-complex-benchmark')
const { exec, execSafe, spawn } = require('./exported/exec')
const { log } = require('./log/index')
const { runTests } = require('./exported/run-tests')
const { scanFolder } = require('./exported/scan-folder')

exports.scanFolder = scanFolder
exports.createBenchmark = createBenchmark
exports.createComplexBenchmark = createComplexBenchmark
exports.runTests = runTests
exports.translate = translate
exports.translateToBulgarian = translateToBulgarian
exports.translateToGerman = translateToGerman
exports.exec = exec
exports.execSafe = execSafe
exports.spawn = spawn
exports.log = log
