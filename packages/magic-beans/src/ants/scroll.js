const vscode = require('vscode')
const { delay } = require('rambdax')

async function scrollDownAnt(scrollDownBy){
  await delay(200)
  await vscode.commands.executeCommand('cursorMove', {
    to    : 'down',
    by    : 'line',
    value : scrollDownBy,
  })

  return delay(200)
}
async function scrollUpAnt(scrollDownBy){
  await delay(200)
  await vscode.commands.executeCommand('cursorMove', {
    to    : 'up',
    by    : 'line',
    value : scrollDownBy,
  })

  return delay(200)
}

async function cursorMoveToTop(){
  await delay(200)
  await vscode.commands.executeCommand('cursorMove', { to : 'viewPortTop' })

  return delay(200)
}

exports.scrollDownAnt = scrollDownAnt
exports.scrollUpAnt = scrollUpAnt
exports.cursorMoveToTop = cursorMoveToTop
