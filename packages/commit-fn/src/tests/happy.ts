import {commitMessage} from '..'

const cwd = __dirname

commitMessage(cwd)
  .then((commitMessageValue: string) => {
    console.log(commitMessageValue)
  })
  .catch(console.log)
