import {monitor, getProcessUsage} from './monitor'
import { delay } from 'rambdax'
import { ms } from 'string-fn'

jest.setTimeout(ms('30 minutes'))

test.skip('getProcessUsage', async () => {
  const result = await getProcessUsage()
  console.log({result})
})

test('happy', async () => {
  monitor.start()
  await delay(30000)
  const logData = await monitor.stop()
  expect(
    logData
  ).toMatchSnapshot()
})