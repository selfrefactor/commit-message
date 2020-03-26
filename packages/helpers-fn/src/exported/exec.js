const { exec } = require('child_process')

const execCommand = ({cwd, command, onLog}) =>
new Promise((resolve, reject) => {
    const logs = []
    const proc = exec(command, { cwd })

    proc.stdout.on('data', chunk => {
      const sk = chunk.toString()
      console.log(sk)
      if(onLog) onLog(sk)
      logs.push(sk)
    })
    proc.stdout.on('end', () => resolve(logs))
    proc.stdout.on('error', err => reject(err))
  })

exports.exec = execCommand