const path = require('path')
const postCssFn = require('postcss-fn')
const watchFn = require('watch-fn')
const { exec } = require('child_process')
const { log } = require('log')
const { replace } = require('rambdax')
const { resolve } = require('path')
const { writeFileSync, readFileSync } = require('fs')

const projectDirectory = path.resolve(__dirname, '../')

let flag = true
let latestPCSS

function syncBackground() {
  const source = resolve(__dirname, '../src/background.js')
  const output = resolve(__dirname, '../chrome_dist/background.js')

  const content = readFileSync(source).toString()
  writeFileSync(output, content)
}

const execCommand = (command, logFlag = true) =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd : projectDirectory })

    proc.stdout.on('data', chunk => {
      if (logFlag) {
        console.log(chunk.toString())
      }
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

const buildFn = async filePath => {
  if (filePath.endsWith('background.js')) {
    syncBackground()
  }
  if (flag === false) {
    return
  }
  flag = false
  log('Start build', 'info')
  await execCommand('yarn build', false)

  flag = true
  log('sep')
}

const convertPostCSS = async filePath => {
  log(`postCss ${ path.basename(filePath) }`, 'box')
  if (path.basename(filePath).startsWith('_')) {
    log('No need to convert internal styles', 'info')
    if (latestPCSS === undefined) {
      return
    }
    filePath = latestPCSS
    log(
      `Will convert instead the latest PCSS file - ${ path.basename(
        latestPCSS
      ) }`,
      'info'
    )
  } else {
    latestPCSS = filePath
  }

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
    js   : buildFn,
    jsx  : buildFn,
    pcss : convertPostCSS,
  },
  directory : `${ projectDirectory }/src`,
  cwd       : projectDirectory,
  logFn     : () => {},
}

watchFn.start(options)
