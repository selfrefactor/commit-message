const path = require('path')
const watchFn = require('watch-fn')
const { exec } = require('child_process')
const { log } = require('log')

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

const tsBuildFn = async () => {
  log('1. Start tsBuildFn', 'info')
  await execCommand('yarn build')
  log('2. Typescript build ready', 'info')
}

const tslintFn = async filePath => {
  await execCommand(`yarn lint ${ filePath } --fix`)
  log(`3. Tslint ${ filePath } ready`, 'info')
}


const tsFormatFn = async filePath => {
  await execCommand(`yarn format -r ${ filePath }`)
  log('4.1 tsFormatFn completed', 'info')
}

const typeCheckFn = async () => {
  await execCommand('yarn lint --type-check --project tsconfig.json')
  log('4.2 Typecheck ready','success')
}

async function tsCommand(filePath){
  if(flag === false){
    
    return
  }
  flag = false
  await tsBuildFn(filePath)
  await tslintFn(filePath)
  await Promise.all([
    tsFormatFn(filePath),
    typeCheckFn(filePath)
  ])
  flag = true
  log('','sepx')
}


const options = {
  commands : {
    ts : tsCommand,
  },
  directory : `${ projectDirectory }/src`,
  cwd       : projectDirectory,
  logFn     : () => {},
}

watchFn.start(options)
