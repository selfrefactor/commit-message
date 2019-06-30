const log = require('log-fn')
const path = require('path')
const { lastUsed } = require('last-used')
const watchFn = require('watch-fn')
const { exec, spawn } = require('child_process')

const projectDirectory = path.resolve(__dirname, '../')

//As we have numerous operations, watch.timeout option is not a good fit. 
let flag = true

lastUsed('Tag fn')

const execCommand = command =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd : projectDirectory })

    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

execCommand('rm -rf dist')

const tslintFn = async filePath => {
  if (flag === false) {
    return
  }
  flag = false
  log('sep')
  await execCommand(`tslint ${ filePath } --fix`)
  log(`Tslint command over ${ filePath } is completed`, 'info')
}

const typescriptFn = async filePath => {
  await execCommand('tsc -p .')
  log('Typescript build is completed', 'info')
  log('sep')
}

const typeCheckFn = async filePath => {
  await execCommand('tslint --type-check --project tsconfig.json')
  flag = true
  log('sep')
}

const options = {
  commands : {
    ts : [
      tslintFn,
      typescriptFn,
      typeCheckFn,
    ],
  },
  directory : `${ projectDirectory }/src`,
  cwd       : projectDirectory,
  logFn     : () => {},
}

watchFn.start(options)
