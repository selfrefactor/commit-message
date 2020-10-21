const vscode = require('vscode')
const { basename } = require('path')
const { changeOpenedFile } = require('./randomFile')
const { existsSync, readFileSync, writeFileSync, unlinkSync } = require('fs')
const { remove, replace } = require('rambdax')

function toggleProve(){
  const filePath = vscode.window.activeTextEditor.document.fileName

  const [ fileName ] = basename(filePath).split('.')

  const newFileName = fileName.endsWith('Prove') ?
    remove('Prove', fileName) :
    `${ fileName }Prove`

  const newFilePath = replace(
    fileName, newFileName, filePath
  )
  const alreadyExist = existsSync(newFilePath)
  if (alreadyExist) return

  const content = readFileSync(filePath).toString()

  writeFileSync(newFilePath, content)

  changeOpenedFile(newFilePath, () => unlinkSync(filePath))
}

exports.toggleProve = toggleProve
