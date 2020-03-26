const {
  startLoadingBar,
  stopLoadingBar,
} = require('./exported/loadingBarCLI')
const {
  translate,
  translateToBulgarian,
  translateToGerman,
} = require('./exported/translate')
const { createBenchmark } = require('./exported/createBenchmark.js')
const { exec } = require('./exported/exec')
const { loadingBar } = require('./exported/loadingBar')
const { log } = require('./log/index')
const { runTests } = require('./exported/runTests')

exports.createBenchmark = createBenchmark
exports.runTests = runTests
exports.translate = translate
exports.translateToBulgarian = translateToBulgarian
exports.translateToGerman = translateToGerman
exports.stopLoadingBar = stopLoadingBar
exports.startLoadingBar = startLoadingBar
exports.loadingBar = loadingBar
exports.exec = exec
exports.log = log
