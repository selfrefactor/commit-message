const vscode = require('vscode')
const { applyCreateSpec } = require('./_modules/applyCreateSpec')
const { basename, extname } = require('path')
const { existsSync, writeFileSync } = require('fs')
const { replace } = require('rambdax')

function createSpec(){
  try {
    const filePath = vscode.window.activeTextEditor.document.fileName
    console.log({filePath, label:'CREATE SPEC'})
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
  } catch (e){
    console.log(e, 'MAGIC BEANS CREATE SPEC')
  }
}

exports.createSpec = createSpec
