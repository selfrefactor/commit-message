const { execCommand } = require('../../modules/execCommand')
const { last, remove } = require('rambdax')
const { moveSync } = require('fs-extra')

function getFolderName(repo, folder){
  if (folder) return folder

  return remove('.git', last(repo.split('/')))
}

async function commit(message){
  await execCommand('git add . --all')
  await execCommand(`git commit -m "${ message }"`)
  await execCommand('git push')
}

async function readDone(source){
  if (!source) return

  moveSync(`${ process.cwd() }/${ source }`, `${ process.cwd() }/_DONE/${ source }`)

  const commitMessage = `chore: move ${ source }`
  await commit(commitMessage)
}

async function read(repo, folder){
  if (repo === 'done') return readDone(folder)
  const folderName = getFolderName(repo, folder)
  await execCommand(`git clone --depth 1 ${ repo } ${ folder ? folder : '' }`)
  await execCommand('rm -rf .git', `${ process.cwd() }/${ folderName }`)
  await execCommand('rm -rf dist', `${ process.cwd() }/${ folderName }`)

  if (process.cwd().includes('to-read')){
    await commit('feat: add new repo')
  } else {
    console.log(`process cwd ${ process.cwd() }`)
  }
}

exports.read = read
