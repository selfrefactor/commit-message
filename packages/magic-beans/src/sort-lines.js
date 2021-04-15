const vscode = require('vscode')
const { sort } = require('rambdax')

const simpleSort = (a, b) => a === b ? 0 : a > b ? 1 : -1

function sortLines(
  textEditor, startLine, endLine
){
  const lines = []
  for (let i = startLine; i <= endLine; i++){
    lines.push(textEditor.document.lineAt(i).text)
  }
  const sorted = sort(simpleSort, lines)

  return textEditor.edit(editBuilder => {
    const range = new vscode.Range(
      startLine, 0, endLine, textEditor.document.lineAt(endLine).text.length
    )
    editBuilder.replace(range, sorted.join('\n'))
  })
}

function sortLinesFn(){
  const textEditor = vscode.window.activeTextEditor
  const { selection } = textEditor

  if (selection.isEmpty) return
  if (selection.isSingleLine) return

  return sortLines(
    textEditor, selection.start.line, selection.end.line
  )
}

exports.sortLines = sortLinesFn
