import {commitMessageFast} from './commitMessageFast'

test('happy', async () => {
  const result = await commitMessageFast({
    dir: process.cwd(),
    commitMessage: 'foo message',
    commitMode: 'fea',
    commitTag: 'sma',
  })
  console.log({result})
})
