const vscode = require('vscode')
const { configAnt } = require('./ants/config')
const { logToUser } = require('./bar')
const { readFolders } = require('./_modules/readFolders')
const { removeIndex } = require('./_modules/removeIndex')
const { scrollDownAnt, scrollUpAnt } = require('./ants/scroll')
const { setter, getter, delay, shuffle, random } = require('rambdax')

const RANDOM_FILE_SCROLL_BY = configAnt('RANDOM_FILE_SCROLL_BY')
const RANDOM_FILE_AUTO_SCROLL = configAnt('RANDOM_FILE_AUTO_SCROLL')
const RANDOM_FILE_INTERVAL = configAnt('RANDOM_FILE_INTERVAL')
const RANDOM_FILE_MAXIMAL_SIZE = configAnt('RANDOM_FILE_MAXIMAL_SIZE')
const RANDOM_FILE_MINIMAL_SIZE = configAnt('RANDOM_FILE_MINIMAL_SIZE')
const RANDOM_FILE_SKIP_PATTERNS = configAnt('RANDOM_FILE_SKIP_PATTERNS')
const RANDOM_FILE_SCROLL_INTERVAL = configAnt('RANDOM_FILE_SCROLL_INTERVAL')
const RANDOM_FILE_ALLOWED_EXTENSIONS = configAnt('RANDOM_FILE_ALLOWED_EXTENSIONS')
const sleep = () => delay(RANDOM_FILE_INTERVAL * 1000)

const RANDOM_FILE = 'RANDOM_FILE'

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

async function randomFileInterval(){
  if (getter(RANDOM_FILE) === true){
    return setter(RANDOM_FILE, false)
  }
  setter(RANDOM_FILE, true)

  const projectFolder = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const files = shuffle(readFolders({
    folderPath        : projectFolder,
    min               : RANDOM_FILE_MINIMAL_SIZE,
    max               : RANDOM_FILE_MAXIMAL_SIZE,
    allowedExtensions : RANDOM_FILE_ALLOWED_EXTENSIONS,
    skipPatterns      : RANDOM_FILE_SKIP_PATTERNS,
  }))
  if (files.length === 0) return

  let counter = -1
  while (getter(RANDOM_FILE) && counter++ < files.length - 1){
    changeOpenedFile(files[ counter ])
    logToUser(`${ Math.abs(counter - files.length) } files left`)

    if (RANDOM_FILE_AUTO_SCROLL){
      await delay(500)
      await scrollUpAnt(200)
      await delay(500)

      const interval = setInterval(() => {
        scrollDownAnt(RANDOM_FILE_SCROLL_BY)
      }, RANDOM_FILE_SCROLL_INTERVAL * 1000)
      await sleep()
      clearInterval(interval)
    } else {
      await sleep()
    }
  }
  setter(RANDOM_FILE, false)

  randomFile()
}

exports.randomFile = randomFile
exports.requestRandomFile = requestRandomFile
exports.randomFileInterval = randomFileInterval
exports.changeOpenedFile = changeOpenedFile
