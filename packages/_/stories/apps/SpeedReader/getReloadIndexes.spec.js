import { getReloadIndexes } from './getReloadIndexes.js'
import { getData } from './getData.js'

test('happy', async () => {
  const bookContent = await getData(1)
  const reloadIndexes = await getReloadIndexes(bookContent.length)
  expect(reloadIndexes.length).toBe(98)
})
