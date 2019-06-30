const { exec } = require('child_process')

exports.execCommand = (command, cwd) =>

new Promise((resolve, reject) => {
    const proc = exec(
      command,
      { cwd }
    )
    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })