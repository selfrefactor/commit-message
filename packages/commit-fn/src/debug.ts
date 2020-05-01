import {commitMessage} from './'

const cwd = __dirname

// commitAndPush(cwd)
commitMessage(cwd)
  .then((commitMessageValue: string) => {
    console.log(commitMessageValue)
  })
  .catch(console.log)
