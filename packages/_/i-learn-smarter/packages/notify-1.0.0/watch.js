const { lastUsed } = require('last-used')
const { replace } = require('rambdax')
const { log } = require('log')
const path = require('path')
const postCssFn = require('postcss-fn')
const watchFn = require('watch-fn')
const { exec, spawn } = require('child_process')

const projectDirectory = __dirname

// As we have numerous operations
// watch.timeout option is not a good fit. 
lastUsed('notify')
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

const tslintFn = async filePath => {
  if (flag === false || filePath.includes('node_modules')) {
    return
  }
  flag = false
  log('sep')
  log(filePath,'')
  
  await execCommand(`tslint ${ filePath } --fix`)
  log(`Tslint fix command over ${ filePath } is completed`, 'info')
  log('sep')
}

const tsFormatFn = async filePath => {
  log("Start tsFormatFn", "info");
  await execCommand(`tsfmt -r ${filePath}`)
  log('tsFormatFn is completed', 'info')
  log('sep')
}

const typeCheckFn = async filePath => {
  log("Start typeCheck",'info')
  await execCommand('tslint --type-check --project tsconfig.json')
  flag = true
  log('sep')
}

const convertPostCSS = async filePath => {
  log(`postCss ${ filePath }`, 'box')
  const options = {
    filePath : filePath,
    output   : replace('.pcss', '.css', filePath),
    options  : { cssnano : false },
  }
  await postCssFn(options)
  log('done', 'success')
}

const options = {
  commands : {
    ts : [
      tslintFn,
      tsFormatFn,
      typeCheckFn,
    ],
    tsx : [
      tslintFn,
      tsFormatFn,
      typeCheckFn,
    ],
    pcss : convertPostCSS,
  },
  directory : projectDirectory,
  cwd       : projectDirectory,
  logFn     : () => {},
}

watchFn.start(options)
