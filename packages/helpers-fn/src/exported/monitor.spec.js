import { readJson, writeJson } from 'fs-extra'
import { delay } from 'rambdax'
import { ms } from 'string-fn'
import { getMemoryUsage, getProcessUsage, monitor } from './monitor'
import { parseMonitorData } from './utils/parse-monitor-data'

jest.setTimeout(ms('30 minutes'))

const FILE_PATH = `${ __dirname }/test-data.json`
const UPDATE_TEST_DATA = false

test.skip('getMemoryUsage', async () => {
  const result = await getMemoryUsage()
  console.log({ result })
})

test.skip('getProcessUsage', async () => {
  const result = await getProcessUsage()
  console.log({ result })
})

test('happy', async () => {
  await monitor.start()
  await delay(ms('2 minutes'))
  const logData = await monitor.stopMonitor()
  if (UPDATE_TEST_DATA) await writeJson(FILE_PATH, { data : logData })
  expect(parseMonitorData(logData)).toMatchSnapshot()
})
