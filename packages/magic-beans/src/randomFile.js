const vscode = require('vscode')
const {
  setter,
  getter,
  delay,
  shuffle,
  random,
  removeIndex,
} = require('rambdax')
const { configAnt } = require('./ants/config')
const { logToUser } = require('./bar')
const { REQUEST_RANDOM_FILE } = require('./constants')
const { scanFolder } = require('helpers-fn')

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
  if (files.length === 0) return
  const index = random(0, files.length - 1)
  changeOpenedFile(files[ index ])
  setter('files', removeIndex(files, index))
  logToUser(`${ files.length - 1 } files left`)
}

async function randomFile(){
  if (getter(REQUEST_RANDOM_FILE)) return
  setter(REQUEST_RANDOM_FILE, true)

  const projectFolder = vscode.workspace.workspaceFolders[ 0 ].uri.path
  const files = await scanFolder({
    folder    : projectFolder,
    maxDepth  : 20,
    excludeFn : dir => RANDOM_FILE_SKIP_PATTERNS.includes(dir),
    filterFn  : filePath => {
      const [ pass ] = RANDOM_FILE_ALLOWED_EXTENSIONS.filter(singleExtension => filePath.endsWith(singleExtension))

      return Boolean(pass)
    },
  })

  if (files.length === 0) return
  setter('files', shuffle(files))
  requestRandomFile()
}

exports.randomFile = randomFile
exports.requestRandomFile = requestRandomFile
exports.changeOpenedFile = changeOpenedFile
