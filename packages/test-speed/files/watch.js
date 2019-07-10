const path = require('path')
const watchFn = require('watch-fn')
const { exec } = require('child_process')
const { log } = require('log')
const { lastUsed } = require('last-used')

lastUsed('test-speed')

const projectDirectory = path.resolve(__dirname, '../')

//As we have numerous operations
//watch.timeout option is not a good fit.

let flag = true

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
  log(filePath, '')

  await execCommand(`tslint ${ filePath } --fix`)
  log(`Tslint fix command over ${ filePath } is completed`, 'info')
  log('sep')
}

const tsFormatFn = async filePath => {
  log('Start tsFormatFn', 'info')
  await execCommand(`tsfmt -r ${ filePath }`)
  log('tsFormatFn is completed', 'info')
  log('sep')
}

const tsBuildFn = async () => {
  log('Start tsBuildFn', 'info')
  await execCommand('tsc -p .')
  log('Typescript build is completed', 'info')
  log('sep')
}

const typeCheckFn = async () => {
  log('Start typeCheck', 'info')
  await execCommand('tslint --type-check --project tsconfig.json')
  flag = true
  log('sep')
}

const options = {
  commands : {
    ts : [
      tslintFn,
      tsFormatFn,
      tsBuildFn,
      typeCheckFn,
    ],
  },
  directory : `${ projectDirectory }/src`,
  cwd       : projectDirectory,
  logFn     : () => {},
}

watchFn.start(options)
