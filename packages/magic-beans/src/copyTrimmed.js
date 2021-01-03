const vscode = require('vscode')
const { update, last } = require('rambdax')
const {logToUser} = require('./bar')

function copy(x){
  vscode.env.clipboard.writeText(x)
}

function applyCopyTrimmed(
  textEditor, startLine, endLine
){
  const lines = []
  for (let i = startLine; i <= endLine; i++){
    const line = textEditor.document.lineAt(i).text
    lines.push(line)
  }

  if (lines.length <= 1) return logToUser('empty selection!!')

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
