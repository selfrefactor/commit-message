const vscode = require('vscode')
const { copyTrimmed } = require('./copyTrimmed')
const { createSpec } = require('./createSpec')
const { formatJson } = require('./format-json')
const { initBar } = require('./bar')
const { sortLines } = require('./sort-lines')
const { randomFile, requestRandomFile } = require('./randomFile')
const { REQUEST_RANDOM_FILE, SORT_LINES } = require('./constants')
TabNine::config
function activate(context){
  initBar()
  const formatJsonCommand = vscode.commands.registerCommand('magicBeans.formatJson',
    formatJson)
  const copyTrimmedCommand = vscode.commands.registerCommand('magicBeans.copyTrimmed',
    copyTrimmed)
  const createSpecCommand = vscode.commands.registerCommand('magicBeans.createSpec',
    createSpec)
  const randomFileCommand = vscode.commands.registerCommand('magicBeans.randomFile',
    randomFile)
  const requestRandomFileCommand = vscode.commands.registerCommand(REQUEST_RANDOM_FILE,
    requestRandomFile)
  const sortLinesCommand = vscode.commands.registerCommand(SORT_LINES,
    sortLines)

  context.subscriptions.push(copyTrimmedCommand)
  context.subscriptions.push(createSpecCommand)
  context.subscriptions.push(randomFileCommand)
  context.subscriptions.push(requestRandomFileCommand)
  context.subscriptions.push(formatJsonCommand)
  context.subscriptions.push(sortLinesCommand)
}

exports.activate = activate
