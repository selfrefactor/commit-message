const vscode = require('vscode')
const { applyCreateSpec } = require('./_modules/applyCreateSpec')
const { basename, extname } = require('path')
const { existsSync, writeFileSync } = require('fs')
const { replace } = require('rambdax')

function createSpec(){
  const filePath = vscode.window.activeTextEditor.document.fileName
  const fileName = basename(filePath)
  const extension = extname(filePath)
  const specFileName = replace(
    extension, `.spec${ extension }`, fileName
  )
  const specFilePath = replace(
    fileName, specFileName, filePath
  )
  const okExist = existsSync(specFilePath)
  if (okExist) return

  const template = applyCreateSpec(filePath, fileName)
  if (!template) return

  writeFileSync(specFilePath, template)
}

exports.createSpec = createSpec
