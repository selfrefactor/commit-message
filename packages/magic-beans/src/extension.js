const vscode = require('vscode')
const { copyTrimmed } = require('./copyTrimmed')
const { createSpec } = require('./createSpec')
const { initBar } = require('./bar')
const { initWatcher } = require('./init')
const { orderProps } = require('./orderProps')
const { randomFile, randomFileInterval, requestRandomFile } = require('./randomFile')
const { formatJson } = require('./format-json')
const { REQUEST_RANDOM_FILE } = require('./constants')

function activate(context){
  console.log('START MAGIC BEANS')
  initBar()
  initWatcher()
  const formatJsonCommand = vscode.commands.registerCommand('magicBeans.formatJson',formatJson)
  const fEightCommand = vscode.commands.registerCommand('magicBeans.orderProps',
    orderProps)
  const altC = vscode.commands.registerCommand('magicBeans.copyTrimmed',
    copyTrimmed)
  const createSpecCommand = vscode.commands.registerCommand('magicBeans.createSpec',
    createSpec)
  const randomFileCommand = vscode.commands.registerCommand('magicBeans.randomFile', randomFile)
  const requestRandomFileCommand = vscode.commands.registerCommand(REQUEST_RANDOM_FILE, requestRandomFile)
  const randomFileIntervalCommand = vscode.commands.registerCommand('magicBeans.randomFileInterval',
    randomFileInterval)

  context.subscriptions.push(altC)
  context.subscriptions.push(createSpecCommand)
  context.subscriptions.push(fEightCommand)
  context.subscriptions.push(randomFileCommand)
  context.subscriptions.push(requestRandomFileCommand)
  context.subscriptions.push(randomFileIntervalCommand)
  context.subscriptions.push(formatJsonCommand)
}

exports.activate = activate
