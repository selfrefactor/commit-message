const {
  translate,
  translateToBulgarian,
  translateToGerman,
} = require('./exported/translate')
const { createBenchmark } = require('./exported/create-benchmark')
const { createComplexBenchmark } = require('./exported/create-complex-benchmark')
const { exec, execSafe, spawn } = require('./exported/exec')
const { log } = require('./log/log')
const { parseHjson } = require('./exported/parse-hjson')
const { runTests } = require('./exported/run-tests')
const { scanFolder } = require('./exported/scan-folder')

exports.parseHjson = parseHjson
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
