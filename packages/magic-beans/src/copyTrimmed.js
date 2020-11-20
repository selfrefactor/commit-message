const vscode = require('vscode')
const { update, last } = require('rambdax')

function copy(x){
  vscode.env.clipboard.writeText(x)
}

function applyCopyTrimmed(
  textEditor, startLine, endLine
){
  const lines = []
  for (let i = startLine; i <= endLine; i++){
    lines.push(textEditor.document.lineAt(i).text)
  }

  if (lines.length === 1) return copy(lines[ 0 ].trim())

  const withFirst = update(
    0, lines[ 0 ].trimLeft(), lines
  )
  const withLast = update(
    lines.length - 1,
    last(lines).trimRight(),
    withFirst
  )
  copy(withLast.join('\n'))
}

function copyTrimmedFn(){
  const textEditor = vscode.window.activeTextEditor
  const { selection } = textEditor

  return applyCopyTrimmed(
    textEditor, selection.start.line, selection.end.line
  )
}

exports.copyTrimmed = () => copyTrimmedFn()
