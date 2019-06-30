const log = require('log-fn')
const path = require('path')
const watchFn = require('watch-fn')
const { exec } = require('child_process')

const projectDirectory = path.resolve(__dirname, '../')

const execCommand = command =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd : projectDirectory })

    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

const tslintFn = async filePath => {
  await execCommand(`tslint ${ filePath } --fix`)
  log('Wait for Typescript build to finish!', 'info')
}

const options = {
  timeout   : 2500,
  commands  : { ts : tslintFn },
  directory : `${ projectDirectory }/__tests__`,
  cwd       : projectDirectory,
}

watchFn.start(options)
