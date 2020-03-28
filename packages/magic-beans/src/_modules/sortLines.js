const vscode = require('vscode')
const { sort } = require('./sort')

function sortLines(
  textEditor, startLine, endLine
){
  const lines = []
  for (let i = startLine; i <= endLine; i++){
    lines.push(textEditor.document.lineAt(i).text)
  }

  const sorted = sort(lines)

  return textEditor.edit(editBuilder => {
    const range = new vscode.Range(
      startLine,
      0,
      endLine,
      textEditor.document.lineAt(endLine).text.length
    )

    editBuilder.replace(range, sorted.join('\n'))
  })
}

exports.sortLines = sortLines
