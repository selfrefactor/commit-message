const { exec, spawn } = require('child_process')

const spawnCommand = ({ command, inputs, cwd, onLog }) =>
  new Promise((resolve, reject) => {
    const proc = spawn(
      command, inputs, {
        cwd,
        shell : true,
        env   : process.env,
      }
    )

    proc.stdout.on('data', chunk => {
      if (onLog){
        onLog(chunk.toString())
      } else {
        console.log(chunk.toString())
      }
    })
    proc.stdout.on('end', () => resolve())
    proc.stdout.on('error', err => reject(err))
  })

const execCommandSafe = ({ command, cwd }) =>
  new Promise((resolve, reject) => {
    const callback = (
      error, stdout, stderr
    ) => {
      if (error) return reject(error)
      if (stderr){
        console.warn(stderr)
      }

      resolve(stdout)
    }
    exec(
      command,
      {
        cwd,
        shell : '/bin/sh',
        env   : process.env,
      },
      callback
    )
  })

const execCommand = ({ cwd, command, onLog = undefined }) =>
  new Promise((resolve, reject) => {
    const logs = []
    const proc = exec(command, { cwd })

    proc.stdout.on('data', chunk => {
      const sk = chunk.toString()
      if (onLog){
        onLog(sk)
      } else {
        console.log(sk)
      }

      logs.push(sk)
    })
    proc.stdout.on('end', () => resolve(logs))
    proc.stdout.on('error', err => reject(err))
  })

exports.exec = execCommand
exports.execSafe = execCommandSafe
exports.spawn = spawnCommand
