import { commitMessage } from './index'

commitMessage().then((commitMessageValue: string) => {
  console.log(commitMessageValue)
  // => 'feat@style - use animation when logout'
})
