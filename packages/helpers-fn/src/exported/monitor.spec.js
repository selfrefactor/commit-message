import {monitor, getProcessUsage, getMemoryUsage} from './monitor'
import { delay } from 'rambdax'
import { ms } from 'string-fn'
import { readJson,writeJson } from 'fs-extra'

jest.setTimeout(ms('30 minutes'))

const FILE_PATH = `${__dirname}/test-data.json`

test.skip('getMemoryUsage', async () => {
  const result = await getMemoryUsage()
  console.log({result})
})

test.skip('getProcessUsage', async () => {
  const result = await getProcessUsage()
  console.log({result})
})

test('happy', async () => {
  await monitor.start()
  await delay(ms('2 minutes'))
  const logData = await monitor.stop()
  await writeJson(FILE_PATH, {data:logData})
  expect(
    logData
  ).toMatchSnapshot()
})