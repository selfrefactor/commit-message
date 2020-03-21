const { exec } = require('child_process')
const { resolve } = require('path')
const debugFlag = process.env.LINT_FN_DEBUG === 'ON'
const DIR = debugFlag ? __dirname : resolve(__dirname, '../../')

const execCommand = (command, cwd) =>
  new Promise((resolve, reject) => {
    const proc = exec(
      command,
      {
        cwd,
        env : process.env,
      }
    )
    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

const execFn = command => execCommand(command, DIR)

exports.execCommand = execCommand
exports.exec = execFn
exports.debugFlag = debugFlag