const vscode = require('vscode')
const { sortLines } = require('./_modules/sortLines')

function orderPropsFn(){

  const textEditor = vscode.window.activeTextEditor
  const { selection } = textEditor

  return sortLines(
    textEditor,
    selection.start.line,
    selection.end.line
  )
}

exports.orderProps = () => orderPropsFn()
