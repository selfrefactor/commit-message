import { testSpeed } from './test-speed'
jest.setTimeout(180000)

const url = 'https://bg.helpkarma.com'

test('happy', async () => {
  const result = await testSpeed(url)
  expect(result).toMatchSnapshot()
})
 