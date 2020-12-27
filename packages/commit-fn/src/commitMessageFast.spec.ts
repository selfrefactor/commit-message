import {commitMessageFast} from './commitMessageFast'

test('happy', async () => {
  const result = await commitMessageFast({
    dir: process.cwd(),
    commitMessage: 'foo message',
    commitMode: 'f',
    commitTag: 'sma',
  })
  expect(result).toMatchInlineSnapshot(`"fix@small foo message"`)
})

test('without tag', async () => {
  const result = await commitMessageFast({
    dir: process.cwd(),
    commitMessage: 'foo message',
    commitMode: 'f',
    commitTag: '',
  })
  expect(result).toMatchInlineSnapshot(`"fix: foo message"`)
})
