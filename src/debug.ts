import { commitMessage } from './index'

async function debug() {
  const result = await commitMessage()
}

commitMessage().then(console.log)
