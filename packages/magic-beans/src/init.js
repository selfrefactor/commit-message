const vscode = require('vscode')
const {
  test: testMethod,
  match,
  remove,
  replace,
  maybe,
  range: rangeMethod,
  delay,
} = require('rambdax')
const { configAnt } = require('./ants/config')
const { count } = require('string-fn')

function shouldImport(text){
  const okImport = testMethod(/#\.[A-Za-z\.\-]{1,34}/, text)

  return okImport
}

function extractLibrary(found){
  const [ , , library ] = found.split('.')

  return library
}

function fixLine(text){
  const [ found ] = match(/#\.[A-Za-z\.\-]{1,34}/, text)
  const foundLibrary = maybe(
    count(found, '.') === 2,
    extractLibrary(found),
    false
  )

  const importMethod = foundLibrary ?
    remove([ '#.', `.${ foundLibrary }` ], found) :
    remove('#.', found)

  const fixedLine = foundLibrary ?
    replace(
      `#.${ importMethod }.${ foundLibrary }`, importMethod, text
    ) :
    replace(
      `#.${ importMethod }`, importMethod, text
    )

  return {
    foundLibrary,
    importMethod,
    fixedLine,
  }
}

function setCursor(){
  const editor = vscode.window.activeTextEditor
  const position = editor.selection.active

  const newPosition = position.with(position.line, 120)
  const newSelection = new vscode.Selection(newPosition, newPosition)
  editor.selection = newSelection
}

function whenImport({ line, text }){
  const { fixedLine, importMethod, foundLibrary } = fixLine(text)
  const target = foundLibrary ? foundLibrary : configAnt('IMPORT_TARGET')

  const { lineCount } = vscode.window.activeTextEditor.document

  let foundImportAt = -1
  let foundImportLine
  let foundMethod = false
  let multiline = false

  for (const i of rangeMethod(0, lineCount)){
    if (foundImportAt === -1){
      const currentLine = vscode.window.activeTextEditor.document.lineAt(i)
      const hasMethod = currentLine.text.includes(importMethod)
      const hasLibrary =
        currentLine.text.includes(`"${ target }"`) ||
        currentLine.text.includes(`'${ target }'`)

      if (hasLibrary){
        multiline = !currentLine.text.includes('import')
        foundImportAt = i
        foundImportLine = currentLine.text
      }

      if (hasMethod) foundMethod = true
    }
  }

  vscode.window.activeTextEditor.edit(editBuilder => {
    if (foundImportAt === -1){
      const importStartPosition = new vscode.Position(0, 0)
      editBuilder.insert(importStartPosition,
        `import { ${ importMethod } } from '${ target }'\n`)
    } else {
      if (foundMethod) return
      if (!multiline && foundImportLine.includes(` ${ importMethod }`)) return

      if (multiline){
        const importStartPosition = new vscode.Position(foundImportAt - 1, 0)

        editBuilder.insert(importStartPosition, `  ${ importMethod },\n`)
      } else {
        const importStartPosition = new vscode.Position(foundImportAt, 0)
        const importEndPosition = new vscode.Position(foundImportAt,
          foundImportLine.length)
        const importRange = new vscode.Range(importStartPosition,
          importEndPosition)

        const [ before, after ] = foundImportLine.split('}')
        const newImportLine = `${ before }, ${ importMethod } }${ after }`

        editBuilder.replace(importRange, newImportLine)
      }
    }
  })

  delay(150).then(() => {
    const actualLine = maybe(
      foundImportAt === -1,
      line + 1,
      multiline ? line + 1 : line
    )

    const startPosition = new vscode.Position(actualLine, 0)
    const endPosition = new vscode.Position(actualLine, text.length)
    const range = new vscode.Range(startPosition, endPosition)

    vscode.window.activeTextEditor.edit(editBuilder =>
      editBuilder.replace(range, fixedLine))

    delay(150).then(() => {
      setCursor()
    })
  })
}

function initWatcher(){
  vscode.workspace.onDidSaveTextDocument(e => {
    const { line } = vscode.window.activeTextEditor.selection.active
    const { text } = e.lineAt(line)

    if (shouldImport(text)){
      whenImport({
        text,
        line,
      })
    }
  })
}

exports.initWatcher = initWatcher
