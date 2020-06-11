const vscode = require('vscode')
const { formatJson: formatJsonModule } = require('./_modules/format-json.js')

function formatJson(){
  const { document } = vscode.window.activeTextEditor
  const content = document.getText()
  const newContent = formatJsonModule(content)
  if (!newContent) return

  return vscode.window.activeTextEditor.edit(editBuilder => {
    const range = new vscode.Range(
      0,
      0,
      document.lineCount - 1,
      document.lineAt(document.lineCount - 1).text.length
    )

    editBuilder.replace(range, newContent)
  })
}

exports.formatJson = () => formatJson()
