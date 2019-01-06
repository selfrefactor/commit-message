import { commitAndPush } from './'

commitAndPush()
// commitMessage()
  .then((commitMessageValue: string) => {
    console.log(commitMessageValue)
  })
  .catch(console.log)
