import { commitAndPush } from './'

commitAndPush().then((commitMessageValue: string) => {
  console.log(commitMessageValue)
  // => 'feat@style - use animation when logout'
})
  .catch(console.log)
