const { translate, translateToBulgarian } = require('./translate')
const { delay } = require('rambdax')

test('happy', async () => {
  const result = await translateToBulgarian('do you need something')
  await delay(1000)
  console.log({ result })
})
