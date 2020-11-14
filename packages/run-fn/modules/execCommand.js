const { exec } = require('child_process')
const {CWD} = require('../constants')

const execCommand = (command, cwd = CWD, logFlag = false) =>
  new Promise((resolve, reject) => {
    if (logFlag){
      console.log(cwd, command)
    }
    const proc = exec(command, { cwd })

    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', resolve)
    proc.stdout.on('error', err => {
      reject(err)
    })
  })

exports.execCommand = execCommand
