const {execFile} = require('child_process')
const R = require("rambda")

const execFileCommand = (command,cwd) =>
  new Promise((resolve, reject) => {
    const commandAsArr = R.split(" ",command)
    const commandArguments = commandAsArr.length === 1 ?
      [] :
      R.tail(commandAsArr)
    
    execFile(R.head(commandAsArr), commandArguments, {cwd}, (err, stdout, stderr) => {
      if (err) {
        throw new Error(err)
      }
      resolve(stdout)
    })
  })

exports.execFileCommand = execFileCommand