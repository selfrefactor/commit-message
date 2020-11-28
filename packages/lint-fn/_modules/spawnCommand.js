const { spawn } = require('child_process')
const { resolve } = require('path')
const debugFlag = process.env.LINT_FN_DEBUG === 'ON'
const DIR = debugFlag ? __dirname : resolve(__dirname, '../../')

const PARSE_ERROR_MARKER = 'error  Parsing error:'

const spawnCommand = (command, inputs, cwd) =>
  new Promise((resolve, reject) => {
    const proc = spawn(command, inputs, {
      cwd,
      shell: true,
      env : process.env,
    })
    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())

      if(chunk.toString().includes(PARSE_ERROR_MARKER)){
        return reject('PARSE ERROR')
      }
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', reject)
  })

const spawnFn = (command, inputs) => spawnCommand(command, inputs, DIR)

exports.spawnCommand = spawnCommand
exports.spawn = spawnFn
exports.debugFlag = debugFlag
