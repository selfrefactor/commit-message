const vscode = require('vscode')
const { delay } = require('rambdax')
const { REQUEST_RANDOM_FILE } = require('../src/constants')

const PRIORITY = 1
const holder = {}
const WELCOME_MESSAGE = 'START MAGIC BEANS'
holder.bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Left,
  PRIORITY)
holder.bar.command = REQUEST_RANDOM_FILE

const logToUser = text => {
  holder.bar.text = String(text)
  holder.bar.tooltip = text
}

const initBar = () => {
  holder.bar.show()
  logToUser(WELCOME_MESSAGE)
  delay(3500).then(() => {
    if (holder.bar.text === WELCOME_MESSAGE) logToUser('')
  })
}

exports.logToUser = logToUser
exports.initBar = initBar
