import { exec } from 'child_process'
const cwd = process.env.COMMIT_MESSAGE_CWD || process.cwd()

export const execCommand = (command) =>
  new Promise((resolve, reject) => {
    const proc = exec(
      command,
      { cwd },
    )

    proc.stdout.on('data', chunk => {
      console.log(chunk.toString())
    })
    proc.stdout.on('end', resolve)
    proc.stdout.on('error', err => {
      reject(err)
    })
  })
