import { commitMessage } from './index'
import { commitAndPush } from './index'

commitAndPush(true).then((commitMessageValue: string) => {
  console.log(commitMessageValue)

  // => 'feat@style - use animation when logout'
})
  .catch(console.log)
