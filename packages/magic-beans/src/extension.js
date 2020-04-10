const vscode = require('vscode')
const { copyTrimmed } = require('./copyTrimmed')
const { createSpec } = require('./createSpec')
const { init } = require('./init')
const { initBar } = require('./bar')
const { orderProps } = require('./orderProps')
const { randomFile } = require('./randomFile')

function activate(context){
  console.log('START MAGIC BEANS')
  initBar()
  const fEightCommand = vscode.commands.registerCommand('magicBeans.orderProps', orderProps)
  const altC = vscode.commands.registerCommand('magicBeans.copyTrimmed', copyTrimmed)
  const startCommand = vscode.commands.registerCommand('magicBeans.start', init)
  const createSpecCommand = vscode.commands.registerCommand('magicBeans.createSpec', createSpec)
  const randomFileCommand = vscode.commands.registerCommand('magicBeans.randomFile', randomFile)

  context.subscriptions.push(altC)
  context.subscriptions.push(createSpecCommand)
  context.subscriptions.push(fEightCommand)
  context.subscriptions.push(randomFileCommand)
  context.subscriptions.push(startCommand)
}

exports.activate = activate
