const vscode = require('vscode')
const { configAnt } = require('./ants/config')
const { logToUser } = require('./bar')
const { readFolders } = require('./_modules/readFolders')
const { setter, getter, delay, shuffle, random, removeIndex } = require('rambdax')

const RANDOM_FILE_MAXIMAL_SIZE = configAnt('RANDOM_FILE_MAXIMAL_SIZE')
const RANDOM_FILE_MINIMAL_SIZE = configAnt('RANDOM_FILE_MINIMAL_SIZE')
const RANDOM_FILE_SKIP_PATTERNS = configAnt('RANDOM_FILE_SKIP_PATTERNS')
const RANDOM_FILE_ALLOWED_EXTENSIONS = configAnt('RANDOM_FILE_ALLOWED_EXTENSIONS')

function changeOpenedFile(filePath, callback = () => {}){
  // editor should have
  // "workbench.editor.enablePreview": true,
  const openPath = vscode.Uri.file(filePath)
  vscode.workspace.openTextDocument(openPath).then(doc => {
    vscode.window.showTextDocument(doc)
    delay(250).then(callback)
  })
}

function requestRandomFile(){
  const files = getter('files')
  if(files.length === 0) return
  const index = random(0, files.length - 1)
  changeOpenedFile(files[ index ])
  setter('files', removeIndex(files, index))
  logToUser(`${files.length - 1} files left`)
}

async function randomFile(){
  const projectFolder = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const files = shuffle(readFolders({
    folderPath        : projectFolder,
    min               : RANDOM_FILE_MINIMAL_SIZE,
    max               : RANDOM_FILE_MAXIMAL_SIZE,
    allowedExtensions : RANDOM_FILE_ALLOWED_EXTENSIONS,
    skipPatterns      : RANDOM_FILE_SKIP_PATTERNS,
  }))
  if (files.length === 0) return
  setter('files', files)
  requestRandomFile()
}

exports.randomFile = randomFile
exports.requestRandomFile = requestRandomFile
exports.changeOpenedFile = changeOpenedFile
