const vscode = require('vscode')
const {delay} = require('rambdax')

const PRIORITY = 201
const holder = {}

holder.bar = vscode.window.createStatusBarItem(vscode.StatusBarAlignment.Right,
  PRIORITY)

const logToUser = text => {
  holder.bar.text = String(text)
  holder.bar.tooltip = text
}

const initBar = () => {
  holder.bar.show()
  logToUser('START MAGIC BEANS')
  delay(3500).then(() => {
    logToUser('')
  })
}

exports.logToUser = logToUser
exports.initBar = initBar
