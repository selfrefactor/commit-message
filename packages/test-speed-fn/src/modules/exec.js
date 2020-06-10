const { exec: execModule } = require('child_process')

function exec(input){
  return new Promise((resolve, reject) => {
    const willReturn = []
    const execCommand = execModule(input.command, { cwd : input.cwd })

    execCommand.stdout.on('data', chunk => {
      willReturn.push(chunk.toString('utf8'))
    })
    execCommand.stdout.on('end', () => resolve(willReturn))
    execCommand.stdout.on('error', err => reject(err))
  })
}

exports.exec = exec
