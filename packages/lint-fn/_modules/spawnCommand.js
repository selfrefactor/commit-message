const { spawn } = require('child_process')
const { resolve } = require('path')
const debugFlag = process.env.LINT_FN_DEBUG === 'ON'
const DIR = debugFlag ? __dirname : resolve(__dirname, '../../')

const spawnCommand = (command, inputs, cwd) =>
  new Promise((resolve, reject) => {
    const proc = spawn(command, inputs, {
      cwd,
      shell: true,
      env : process.env,
    })
    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

// const execCommand = (command, cwd) =>
//   new Promise((resolve, reject) => {
//     const callback = (error, stdout, stderr) => {
//       if(error) return reject(error)
//       if(stderr){
//         console.warn(stderr)
//       }
//       if(stdout){
//         console.log(stderr)
//       }
//       resolve()
//     }
//     exec(command, {
//         cwd,
//         shell:'/bin/sh',
//         env : process.env,
//       }, callback)
//   })

const spawnFn = (command, inputs) => spawnCommand(command, inputs, DIR)

exports.spawnCommand = spawnCommand
exports.spawn = spawnFn
exports.debugFlag = debugFlag
