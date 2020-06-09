const path = require('path')
const watchFn = require('watch-fn')
const { exec } = require('child_process')
const { resolve } = require('path')
const { writeFileSync, readFileSync } = require('fs')

const projectDirectory = path.resolve(__dirname, '../')

let flag = true

function syncBackground(){
  const source = resolve(__dirname, '../src/background.js')
  const output = resolve(__dirname, '../chrome_dist/background.js')

  const content = readFileSync(source).toString()
  writeFileSync(output, content)
}

const execCommand = (command, logFlag = true) =>
  new Promise((resolve, reject) => {
    const proc = exec(command, { cwd : projectDirectory })

    proc.stdout.on('data', chunk => {
      if (logFlag){
        console.log(chunk.toString())
      }
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

const buildFn = async filePath => {
  // if (filePath.endsWith('background.js')){
  //   syncBackground()
  // }
  if (flag === false)return
  flag = false
  await execCommand('yarn out', false)
  console.log('builded');
  
  flag = true
}

const options = {
  commands : {
    js   : buildFn,
  },
  directory : `${ projectDirectory }/src`,
  cwd       : projectDirectory,
  logFn     : () => {},
}

watchFn.start(options)
