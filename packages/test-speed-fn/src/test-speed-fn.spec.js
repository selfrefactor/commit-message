import { testSpeedFn } from './test-speed-fn'
jest.setTimeout(180000)

const url = 'https://bg.helpkarma.com'

test('happy', async () => {
  const result = await testSpeedFn(url)
  expect(result).toMatchSnapshot()
})
 